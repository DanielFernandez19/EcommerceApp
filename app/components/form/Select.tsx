export type OptionItem = { id: number | string; name: string };

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
        <label htmlFor={selectId} className="text-sm font-medium">
          {label} {required ? <span aria-hidden> *</span> : null}
        </label>
      )}

      <select
        id={selectId}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled || loading}
        className="bg-background border border-white rounded-lg px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50"
      >
        <option value="">{loading ? "Cargando..." : "Seleccione..."}</option>
        {options.map((opt) => (
          <option key={String(opt.id)} value={opt.id}>
            {opt.name}
          </option>
        ))}
      </select>

      {error ? (
        <p role="alert" className="text-sm text-red-600 mt-1">
          {error}
        </p>
      ) : null}
    </div>
  );
}
