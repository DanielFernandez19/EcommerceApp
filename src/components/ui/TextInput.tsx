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
        <label htmlFor={inputId} className="text-sm font-medium text-gray-300">
          {label} {required ? <span className="text-violet-400">*</span> : null}
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
        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all disabled:opacity-50"
      />

      {error ? (
        <p role="alert" className="text-sm text-red-400 mt-1">
          {error}
        </p>
      ) : null}
    </div>
  );
}
