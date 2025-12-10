import { useEffect, useState } from "react";
import { apiGet } from "@/lib/api";
import type { Country, Province, City } from "@/types/location";

interface UseLocationDataReturn {
  countries: Country[];
  provinces: Province[];
  cities: City[];
  loadingCountries: boolean;
  loadingProvinces: boolean;
  loadingCities: boolean;
  error: string | null;
  resetProvinces: () => void;
  resetCities: () => void;
  preloadLocation: (countryId?: number, provinceId?: number, cityId?: number) => Promise<void>;
}

export function useLocationData(
  initialCountryId: number,
  initialProvinceId: number,
): UseLocationDataReturn {
  const [countries, setCountries] = useState<Country[]>([]);
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [cities, setCities] = useState<City[]>([]);

  const [loadingCountries, setLoadingCountries] = useState(false);
  const [loadingProvinces, setLoadingProvinces] = useState(false);
  const [loadingCities, setLoadingCities] = useState(false);

  const [error, setError] = useState<string | null>(null);

  // Load countries on mount
  useEffect(() => {
    let mounted = true;

    async function loadCountries() {
      setLoadingCountries(true);
      try {
        const data = await apiGet<Country[]>(`Country/GetAll`);
        if (!mounted) return;
        setCountries(data);
      } catch (err) {
        if (!mounted) return;
        setCountries([]);
        setError("No se pudieron cargar los países");
      } finally {
        if (mounted) setLoadingCountries(false);
      }
    }

    loadCountries();
    return () => {
      mounted = false;
    };
  }, []);

  // Load provinces when country changes
  useEffect(() => {
    if (!initialCountryId) {
      setProvinces([]);
      setCities([]);
      return;
    }

    let mounted = true;

    async function loadProvinces() {
      setLoadingProvinces(true);
      const endpoint = `province/GetAllByCountry/${initialCountryId}`;
      
      try {
        const data = await apiGet<Province[]>(endpoint);
        if (!mounted) return;

        if (Array.isArray(data)) {
          setProvinces(data);
        } else {
          console.error(
            "Invalid provinces data format - expected array, got:",
            typeof data,
            data,
          );
          setProvinces([]);
        }
      } catch (err: unknown) {
        if (!mounted) return;
        setProvinces([]);

        if (err && typeof err === "object" && "status" in err) {
          const apiError = err as {
            status: number;
            message?: string;
            body?: unknown;
          };
          console.error("Error loading provinces:", {
            status: apiError.status,
            message: apiError.message || "No message",
            body: apiError.body,
            endpoint: endpoint,
          });
        } else {
          console.error("Unexpected error loading provinces:", err);
        }
      } finally {
        if (mounted) setLoadingProvinces(false);
      }
    }

    loadProvinces();
    return () => {
      mounted = false;
    };
  }, [initialCountryId]);

  // Load cities when province changes
  useEffect(() => {
    if (!initialProvinceId) {
      setCities([]);
      return;
    }

    let mounted = true;

    async function loadCities() {
      setLoadingCities(true);
      try {
        const data = await apiGet<City[]>(
          `City/GetAllByProvince/${initialProvinceId}`,
        );
        if (!mounted) return;

        if (Array.isArray(data)) {
          setCities(data);
        } else {
          console.error("Invalid cities data format:", data);
          setCities([]);
        }
      } catch (err: unknown) {
        if (!mounted) return;
        setCities([]);

        if (err && typeof err === "object" && "status" in err) {
          const apiError = err as {
            status: number;
            message?: string;
            body?: unknown;
          };
          console.error(
            `Error loading cities (${apiError.status}):`,
            apiError.message || "Unknown error",
            apiError.body,
          );
        } else {
          console.error("Error loading cities:", err);
        }
      } finally {
        if (mounted) setLoadingCities(false);
      }
    }

    loadCities();
    return () => {
      mounted = false;
    };
  }, [initialProvinceId]);

  const resetProvinces = () => {
    setProvinces([]);
  };

  const resetCities = () => {
    setCities([]);
  };

  // Función para precargar datos de ubicación en secuencia
  const preloadLocation = async (
    countryId?: number, 
    provinceId?: number, 
    cityId?: number
  ): Promise<void> => {
    console.log("preloadLocation iniciado:", { countryId, provinceId, cityId });
    
    try {
      // Paso 1: Esperar a que carguen los países
      if (countries.length === 0) {
        console.log("Esperando carga de países...");
        // Esperar un máximo de 5 segundos a que carguen los países
        let attempts = 0;
        while (countries.length === 0 && attempts < 50) {
          await new Promise(resolve => setTimeout(resolve, 100));
          attempts++;
        }
      }

      // Paso 2: Si hay país, esperar a que se carguen sus provincias
      if (countryId && countries.length > 0) {
        console.log("Esperando provincias del país:", countryId);
        
        // Simular el cambio de país para que el hook cargue las provincias
        // Esto se hace actualizando el estado del componente padre
        // Por ahora, esperamos a que el hook detecte el cambio
        
        // Esperar a que carguen las provincias
        let attempts = 0;
        while (provinces.length === 0 && attempts < 50) {
          await new Promise(resolve => setTimeout(resolve, 100));
          attempts++;
        }
        console.log("Provincias cargadas:", provinces.length);
      }

      // Paso 3: Si hay provincia, esperar a que se carguen sus ciudades
      if (provinceId && provinces.length > 0) {
        console.log("Esperando ciudades de la provincia:", provinceId);
        
        // Esperar a que carguen las ciudades
        let attempts = 0;
        while (cities.length === 0 && attempts < 50) {
          await new Promise(resolve => setTimeout(resolve, 100));
          attempts++;
        }
        console.log("Ciudades cargadas:", cities.length);
      }

      console.log("preloadLocation completado");
    } catch (error) {
      console.error("Error en preloadLocation:", error);
    }
  };

  return {
    countries,
    provinces,
    cities,
    loadingCountries,
    loadingProvinces,
    loadingCities,
    error,
    resetProvinces,
    resetCities,
    preloadLocation,
  };
}

