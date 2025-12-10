// hooks/useForm.ts
import { useState, useCallback } from "react";
import type { z } from "zod";

interface UseFormOptions<T> {
  initialValues: T;
  schema?: z.ZodSchema<T>;
  onSubmit?: (values: T) => void | Promise<void>;
}

interface UseFormReturn<T> {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  touched: Partial<Record<keyof T, boolean>>;
  isSubmitting: boolean;
  isValid: boolean;
  handleChange: (field: keyof T) => (value: any) => void;
  handleBlur: (field: keyof T) => () => void;
  handleSubmit: (e?: React.FormEvent) => Promise<void>;
  resetForm: () => void;
  setFieldValue: (field: keyof T, value: any) => void;
  setValues: (values: T) => void;
  setError: (field: keyof T, error: string) => void;
  clearErrors: () => void;
}

export function useForm<T extends Record<string, any>>({
  initialValues,
  schema,
  onSubmit,
}: UseFormOptions<T>): UseFormReturn<T> {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validar con schema si existe
  const validate = useCallback((data: T): boolean => {
    if (!schema) return true;

    const result = schema.safeParse(data);
    if (result.success) {
      setErrors({});
      return true;
    }

    const newErrors: Partial<Record<keyof T, string>> = {};
    result.error.errors.forEach((err) => {
      const field = err.path[0] as keyof T;
      if (field) {
        newErrors[field] = err.message;
      }
    });

    setErrors(newErrors);
    return false;
  }, [schema]);

  // Manejar cambio de un campo
  const handleChange = useCallback((field: keyof T) => (value: any) => {
    setValues(prev => ({ ...prev, [field]: value }));
    
    // Limpiar error del campo cuando el usuario empieza a escribir
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  }, [errors]);

  // Manejar blur (cuando el campo pierde foco)
  const handleBlur = useCallback((field: keyof T) => () => {
    setTouched(prev => ({ ...prev, [field]: true }));
    
    // Validar formulario completo en blur (simplificado)
    if (schema) {
      const result = schema.safeParse(values);
      if (!result.success) {
        const fieldError = result.error.errors.find(err => err.path[0] === field);
        if (fieldError) {
          setErrors(prev => ({
            ...prev,
            [field]: fieldError.message || "Valor inválido"
          }));
        }
      }
    }
  }, [schema, values]);

  // Manejar submit
  const handleSubmit = useCallback(async (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }

    // Marcar todos los campos como touched
    const allTouched = Object.keys(values).reduce((acc, key) => ({
      ...acc,
      [key]: true
    }), {} as Partial<Record<keyof T, boolean>>);
    setTouched(allTouched);

    // Validar formulario completo
    if (!validate(values)) {
      return;
    }

    if (!onSubmit) return;

    setIsSubmitting(true);
    try {
      await onSubmit(values);
    } catch (error) {
      console.error("Form submit error:", error);
    } finally {
      setIsSubmitting(false);
    }
  }, [values, validate, onSubmit]);

  // Resetear formulario
  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  }, [initialValues]);

  // Setear valor específico
  const setFieldValue = useCallback((field: keyof T, value: any) => {
    setValues(prev => ({ ...prev, [field]: value }));
  }, []);

  // Setear todos los valores
  const setAllValues = useCallback((newValues: T) => {
    setValues(newValues);
  }, []);

  // Setear error específico
  const setError = useCallback((field: keyof T, error: string) => {
    setErrors(prev => ({ ...prev, [field]: error }));
  }, []);

  // Limpiar todos los errores
  const clearErrors = useCallback(() => {
    setErrors({});
  }, []);

  // Calcular si el formulario es válido
  const isValid = schema ? schema.safeParse(values).success : true;

  return {
    values,
    errors,
    touched,
    isSubmitting,
    isValid,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    setFieldValue,
    setValues: setAllValues,
    setError,
    clearErrors,
  };
}