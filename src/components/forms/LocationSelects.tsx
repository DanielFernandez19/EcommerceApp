"use client";

import { useLocationData } from "@/hooks/useLocationData";
import { Select } from "@/components/ui/Select";
import { useRef, useEffect } from "react";
import type { Country, Province, City } from "@/types/location";

interface LocationSelectsProps {
  initialCountryId?: number;
  initialProvinceId?: number;
  initialCityId?: number;
  onCountryChange: (countryId: number) => void;
  onProvinceChange: (provinceId: number) => void;
  onCityChange: (cityId: number) => void;
  disabled?: boolean;
  loading?: boolean;
  required?: boolean;
  showLabels?: boolean;
  className?: string;
}

export function LocationSelects({
  initialCountryId = 0,
  initialProvinceId = 0,
  initialCityId = 0,
  onCountryChange,
  onProvinceChange,
  onCityChange,
  disabled = false,
  loading = false,
  required = false,
  showLabels = true,
  className = "",
}: LocationSelectsProps) {
  // 🎯 Usar refs para evitar bucles de actualización
  const countryIdRef = useRef(initialCountryId);
  const provinceIdRef = useRef(initialProvinceId);
  
  const {
    countries,
    provinces,
    cities,
    loadingCountries,
    loadingProvinces,
    loadingCities,
    error: locationError,
    preloadLocation,
  } = useLocationData(countryIdRef.current, provinceIdRef.current);

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const countryId = Number(e.target.value);
    countryIdRef.current = countryId; // 🎯 Actualizar ref para evitar bucles
    onCountryChange(countryId);
  };

  const handleProvinceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const provinceId = Number(e.target.value);
    provinceIdRef.current = provinceId; // 🎯 Actualizar ref para evitar bucles
    onProvinceChange(provinceId);
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const cityId = Number(e.target.value);
    onCityChange(cityId);
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Error de ubicación */}
      {locationError && (
        <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-4">
          <p className="text-red-400 text-sm">{locationError}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Select
          label={showLabels ? "País" : undefined}
          name="country"
          value={countryIdRef.current}
          options={countries.map(c => ({ id: c.id, name: c.name }))}
          onChange={handleCountryChange}
          loading={loadingCountries}
          required={required}
          disabled={disabled || loading}
        />

        <Select
          label={showLabels ? "Provincia" : undefined}
          name="province"
          value={provinceIdRef.current}
          options={provinces.map(p => ({ id: p.id, name: p.name }))}
          onChange={handleProvinceChange}
          loading={loadingProvinces}
          required={required}
          disabled={disabled || loading || !countryIdRef.current}
        />

        <Select
          label={showLabels ? "Ciudad" : undefined}
          name="city"
          value={initialCityId}
          options={cities.map(c => ({ id: c.id, name: c.name }))}
          onChange={handleCityChange}
          loading={loadingCities}
          required={required}
          disabled={disabled || loading || !provinceIdRef.current}
        />
      </div>
    </div>
  );
}