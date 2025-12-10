// components/ui/Input.tsx
import React from "react";

type InputProps = {
  id?: string;
  name: string;
  label?: string;
  value: string;
  placeholder?: string;
  type?: "text" | "email" | "password" | "tel" | "number";
  onChange: (value: string) => void;
  onBlur?: () => void;
  required?: boolean;
  disabled?: boolean;
  error?: string | null;
  className?: string;
  autoComplete?: string;
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id,
      name,
      label,
      value,
      placeholder,
      type = "text",
      onChange,
      onBlur,
      required = false,
      disabled = false,
      error = null,
      className = "",
      autoComplete,
      ...props
    },
    ref
  ) => {
    const inputId = id ?? name;

    return (
      <div className={`flex flex-col gap-1 ${className}`}>
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-white">
            {label} {required && <span className="text-red-500">*</span>}
          </label>
        )}

        <input
          ref={ref}
          id={inputId}
          name={name}
          type={type}
          value={value}
          placeholder={placeholder}
          autoComplete={autoComplete}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          required={required}
          disabled={disabled}
            className={`
            px-3 py-2 border rounded-lg text-sm
            focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent
            disabled:opacity-50 disabled:cursor-not-allowed
            bg-gray-700 text-white border-gray-600
            ${error 
              ? "border-red-500 focus:ring-red-500" 
              : "border-gray-600"
            }
          `}
          {...props}
        />

        {error && (
          <p role="alert" className="text-sm text-red-400 mt-1">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";