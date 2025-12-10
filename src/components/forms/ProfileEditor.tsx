// src/components/forms/ProfileEditor.tsx
"use client";

import { useState, useEffect } from "react";
import { useForm } from "@/hooks/useForm";
import { profileSchema, type ProfileFormData } from "@/schemas/profile";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui";
import { useRouter } from "next/navigation";
import { apiClient } from "@/lib/api";
import { useAuthContext } from "@/components/providers/AuthProvider";
import { useLocationData } from "@/hooks/useLocationData";
import type { User } from "@/types/user";
import type {
  RoleDto,
  CityDto,
  ProvinceDto,
  CountryDto,
} from "@/types/profile";

interface ProfileEditorProps {
  userId?: string; // Si no se proporciona, es para el perfil del usuario actual
  title?: string;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function ProfileEditor({
  userId,
  title = "Editar Perfil",
  onSuccess,
  onCancel,
}: ProfileEditorProps) {
  const router = useRouter();
  const { user: currentUser } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [roles, setRoles] = useState<RoleDto[]>([]);
  const [countries, setCountries] = useState<CountryDto[]>([]);
  const [provinces, setProvinces] = useState<ProvinceDto[]>([]);
  const [cities, setCities] = useState<CityDto[]>([]);
  const [loadingCountries, setLoadingCountries] = useState(false);
  const [loadingProvinces, setLoadingProvinces] = useState(false);
  const [loadingCities, setLoadingCities] = useState(false);

  const form = useForm<ProfileFormData>({
    initialValues: {
      Name: "",
      LastName: "",
      Email: "",
      PhoneNumber: "",
      BillingAddress: "",
      BillingAddress2: "",
      PostalCode: "",
      Role: { id: 1, name: "" },
      CityDto: null,
      ProvinceDto: null,
      CountryDto: null,
    },
    schema: profileSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const userDto: User = {
          id: userId || "",
          name: values.Name,
          lastName: values.LastName || "",
          email: values.Email,
          phoneNumber: values.PhoneNumber,
          billingAddress: values.BillingAddress,
          billingAddress2: values.BillingAddress2 || "",
          postalCode: values.PostalCode || "",
          idCountry: values.CountryDto?.id || 0,
          idProvince: values.ProvinceDto?.id || 0,
          idCity: values.CityDto?.id || 0,
          idRole: values.Role?.id || 0,
          role: values.Role || { id: 0, name: "" },
          country: {
            id: values.CountryDto?.id || 0,
            name: values.CountryDto?.name || "",
          },
          province: {
            id: values.ProvinceDto?.id || 0,
            name: values.ProvinceDto?.name || "",
          },
          city: {
            id: values.CityDto?.id || 0,
            name: values.CityDto?.name || "",
          },
        };

        const endpoint = `user/UpdateUser`;

        const response = await apiClient.post<boolean, User>(endpoint, userDto);

        if (response) {
          onSuccess?.();
          if (!userId) {
            router.push("/dashboard");
          }
        } else {
          throw new Error("No se pudo actualizar el usuario");
        }
      } catch (error) {
        console.error("Error updating user:", error);
        throw error;
      } finally {
        setLoading(false);
      }
    },
  });

  // Funciones para cargar datos de ubicación
  const loadProvinces = async (countryId: number) => {
    try {
      setLoadingProvinces(true);
      setProvinces([{ id: 1, name: "Buenos Aires" }]); // TODO: Implementar endpoint real
    } catch (error) {
      console.error("Error loading provinces:", error);
    } finally {
      setLoadingProvinces(false);
    }
  };

  const loadCities = async (provinceId: number) => {
    try {
      setLoadingCities(true);
      setCities([
        { id: 1, name: "La Matanza" },
        { id: 2, name: "CABA" },
      ]); // TODO: Implementar endpoint real
    } catch (error) {
      console.error("Error loading cities:", error);
    } finally {
      setLoadingCities(false);
    }
  };

  // Cargar datos iniciales y opciones
  useEffect(() => {
    const loadData = async () => {
      try {
        setFetchLoading(true);
        // Determinar qué usuario cargar
        const targetUserId = userId || currentUser?.id;

        if (targetUserId) {
          const userData = await apiClient.get<User>(
            `user/GetUserById/${targetUserId}`,
          );

          const formValues = {
            Name: userData.name,
            LastName: userData.lastName || "",
            Email: userData.email,
            PhoneNumber: userData.phoneNumber || "",
            BillingAddress: userData.billingAddress || "",
            BillingAddress2: userData.billingAddress2 || "",
            PostalCode: userData.postalCode || "",
            Role: userData.role || { id: 0, name: "" },
            CityDto: userData.city || null,
            ProvinceDto: userData.province || null,
            CountryDto: userData.country || null,
          };

          form.setValues(formValues);

          // Cargar provincias y ciudades si hay datos de ubicación
          if (formValues.CountryDto?.id) {
            await loadProvinces(formValues.CountryDto.id);

            if (formValues.ProvinceDto?.id) {
              setTimeout(() => {
                loadCities(formValues.ProvinceDto!.id);
              }, 300);
            }
          }
        }

        setRoles([
          { id: 1, name: "Admin" },
          { id: 2, name: "Super Admin" },
          { id: 3, name: "Usuario" },
        ]);

        setCountries([{ id: 1, name: "Argentina" }]);
        setProvinces([{ id: 1, name: "Buenos Aires" }]);
        setCities([
          { id: 1, name: "La Matanza" },
          { id: 2, name: "CABA" },
        ]);
      } catch (error) {
        console.error("❌ Error loading data:", error);
        // Mostrar error al usuario
        alert(
          "Error al cargar los datos del usuario. Por favor, intenta nuevamente.",
        );
      } finally {
        setFetchLoading(false);
      }
    };

    if (userId || currentUser?.id) {
      loadData();
    } else {
      setFetchLoading(false);
    }
  }, [userId, currentUser?.id]);

  if (fetchLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-violet-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Cargando datos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-gray-800 rounded-xl border border-gray-700">
          {/* Header */}
          <div className="border-b border-gray-700 px-8 py-6">
            <h1 className="text-2xl font-bold text-white">{title}</h1>
            <p className="text-gray-400 mt-1">
              {userId
                ? "Edita la información del usuario"
                : "Edita tu información personal"}
            </p>
          </div>

          <form onSubmit={form.handleSubmit} className="p-8 space-y-8">
            <div>
              <h2 className="text-xl font-semibold text-white mb-6">
                Información Personal
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  name="Name"
                  label="Nombre *"
                  value={form.values.Name || ""}
                  onChange={(value) => form.setFieldValue("Name", value)}
                  onBlur={form.handleBlur("Name")}
                  error={form.touched.Name ? form.errors.Name : undefined}
                  required
                />
              </div>
            </div>

            {/* Dirección */}
            <div>
              <h2 className="text-xl font-semibold text-white mb-6">
                Dirección de Facturación
              </h2>
              <div className="space-y-6">
                <Input
                  name="BillingAddress"
                  label="Dirección *"
                  value={form.values.BillingAddress}
                  onChange={form.handleChange("BillingAddress")}
                  onBlur={form.handleBlur("BillingAddress")}
                  error={
                    form.touched.BillingAddress
                      ? form.errors.BillingAddress
                      : undefined
                  }
                  required
                />

                <Input
                  name="BillingAddress2"
                  label="Dirección Secundaria"
                  value={form.values.BillingAddress2 || ""}
                  onChange={form.handleChange("BillingAddress2")}
                  onBlur={form.handleBlur("BillingAddress2")}
                  error={
                    form.touched.BillingAddress2
                      ? form.errors.BillingAddress2
                      : undefined
                  }
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Input
                    name="PostalCode"
                    label="Código Postal"
                    value={form.values.PostalCode || ""}
                    onChange={(value) =>
                      form.handleChange("PostalCode")(value || null)
                    }
                    onBlur={form.handleBlur("PostalCode")}
                    error={
                      form.touched.PostalCode
                        ? form.errors.PostalCode
                        : undefined
                    }
                  />

                  <Select
                    label="País"
                    name="CountryDto"
                    value={form.values.CountryDto?.id || ""}
                    options={countries}
                    onChange={(e) => {
                      const countryId = Number(e.target.value);
                      const selectedCountry = countries.find(
                        (c) => c.id === countryId,
                      );
                      form.setFieldValue(
                        "CountryDto",
                        selectedCountry
                          ? {
                              id: selectedCountry.id,
                              name: selectedCountry.name,
                            }
                          : null,
                      );
                      // Limpiar provincia y ciudad cuando cambia el país
                      form.setFieldValue("ProvinceDto", null);
                      form.setFieldValue("CityDto", null);

                      // Cargar provincias para este país
                      loadProvinces(countryId);
                    }}
                    loading={loadingCountries}
                    error={form.errors.CountryDto}
                    disabled={loading}
                  />

                  <Select
                    label="Provincia"
                    name="ProvinceDto"
                    value={form.values.ProvinceDto?.id || ""}
                    options={provinces}
                    onChange={(e) => {
                      const provinceId = Number(e.target.value);
                      const selectedProvince = provinces.find(
                        (p) => p.id === provinceId,
                      );
                      form.setFieldValue(
                        "ProvinceDto",
                        selectedProvince
                          ? {
                              id: selectedProvince.id,
                              name: selectedProvince.name,
                            }
                          : null,
                      );
                      // Limpiar ciudad cuando cambia la provincia
                      form.setFieldValue("CityDto", null);

                      // Cargar ciudades para esta provincia
                      loadCities(provinceId);
                    }}
                    loading={loadingProvinces}
                    error={form.errors.ProvinceDto}
                    disabled={loading || !form.values.CountryDto?.id}
                  />

                  <Select
                    label="Ciudad"
                    name="CityDto"
                    value={form.values.CityDto?.id || ""}
                    options={cities}
                    onChange={(e) => {
                      const cityId = Number(e.target.value);
                      const selectedCity = cities.find((c) => c.id === cityId);
                      form.setFieldValue(
                        "CityDto",
                        selectedCity
                          ? { id: selectedCity.id, name: selectedCity.name }
                          : null,
                      );
                    }}
                    loading={loadingCities}
                    error={form.errors.CityDto}
                    disabled={loading || !form.values.ProvinceDto?.id}
                  />
                </div>
              </div>
            </div>

            {/* Rol - Solo para admin */}
            {userId && (
              <div>
                <h2 className="text-xl font-semibold text-white mb-6">
                  Rol de Usuario
                </h2>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">
                    Rol *
                  </label>
                  <Select
                    name="Role"
                    value={form.values.Role?.id || ""}
                    options={roles}
                    onChange={(e) => {
                      const roleId = Number(e.target.value);
                      const selectedRole = roles.find((r) => r.id === roleId);
                      form.setFieldValue(
                        "Role",
                        selectedRole || { id: 0, name: "" },
                      );
                    }}
                    disabled={loading}
                  />
                </div>
              </div>
            )}

            {/* Botones */}
            <div className="flex justify-end space-x-4 pt-6 border-t border-gray-700">
              {onCancel && (
                <Button
                  type="button"
                  onClick={onCancel}
                  disabled={loading}
                  variant="secondary"
                >
                  Cancelar
                </Button>
              )}
              <Button
                type="submit"
                loading={loading}
                disabled={!form.isValid}
                fullWidth={!onCancel}
              >
                {loading ? "Guardando..." : "Guardar Cambios"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
