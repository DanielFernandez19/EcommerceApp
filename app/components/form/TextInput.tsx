type TextInputProps = {
  id?: string;
  name: string;
  label?: string;
  value: string;
  placeholder?: string;
  type?: "text" | "email" | "password" | "tel";
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  disabled?: boolean;
  error?: string | null;
  className?: string;
};

export function TextInput({
  id,
  name,
  label,
  value,
  placeholder,
  type = "text",
  onChange,
  required = false,
  disabled = false,
  error = null,
  className = "",
}: TextInputProps) {
  const inputId = id ?? name;

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium">
          {label} {required ? <span aria-hidden> *</span> : null}
        </label>
      )}

      <input
        id={inputId}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        required={required}
        disabled={disabled}
        className="bg-background border border-white rounded-lg px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50"
      />

      {error ? (
        <p role="alert" className="text-sm text-red-600 mt-1">
          {error}
        </p>
      ) : null}
    </div>
  );
}
