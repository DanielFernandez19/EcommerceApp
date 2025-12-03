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
}

export function useLocationData(
  selectedCountryId: number,
  selectedProvinceId: number,
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
    if (!selectedCountryId) {
      setProvinces([]);
      setCities([]);
      return;
    }

    let mounted = true;

    async function loadProvinces() {
      setLoadingProvinces(true);
      const endpoint = `province/GetAllByCountry/${selectedCountryId}`;
      
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
  }, [selectedCountryId]);

  // Load cities when province changes
  useEffect(() => {
    if (!selectedProvinceId) {
      setCities([]);
      return;
    }

    let mounted = true;

    async function loadCities() {
      setLoadingCities(true);
      try {
        const data = await apiGet<City[]>(
          `City/GetAllByProvince/${selectedProvinceId}`,
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
  }, [selectedProvinceId]);

  const resetProvinces = () => {
    setProvinces([]);
  };

  const resetCities = () => {
    setCities([]);
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
  };
}

