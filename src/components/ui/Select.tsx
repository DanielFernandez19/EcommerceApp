import type { OptionItem } from "@/types/ui";

type SelectProps = {
  id?: string;
  name: string;
  label?: string;
  value: string | number;
  options: OptionItem[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  required?: boolean;
  disabled?: boolean;
  loading?: boolean;
  error?: string | null;
  className?: string;
};

export function Select({
  id,
  name,
  label,
  value,
  options,
  onChange,
  required = false,
  disabled = false,
  loading = false,
  error = null,
  className = "",
}: SelectProps) {
  const selectId = id ?? name;

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && (
        <label htmlFor={selectId} className="text-sm font-medium text-gray-300">
          {label} {required ? <span className="text-violet-400">*</span> : null}
        </label>
      )}

      <select
        id={selectId}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled || loading}
        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all disabled:opacity-50"
      >
        <option value="" className="bg-gray-700">{loading ? "Cargando..." : "Seleccione..."}</option>
        {options.map((opt) => (
          <option key={String(opt.id)} value={opt.id} className="bg-gray-700">
            {opt.name}
          </option>
        ))}
      </select>

      {error ? (
        <p role="alert" className="text-sm text-red-400 mt-1">
          {error}
        </p>
      ) : null}
    </div>
  );
}
