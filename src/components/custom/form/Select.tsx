import type { Option } from "@/interfaces/Types";
import { forwardRef } from "react";
import type { SelectHTMLAttributes } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: Option[];
  placeholder?: string;
  success?: boolean;
  error?: boolean;
  hint?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps> (({
  options,
  placeholder = "Selecciona una opción",
  className = "",
  success = false,
  error = false,
  hint,
  value,
  defaultValue,
  ...rest
}, ref) => {

  const baseClasses = `h-11 w-full rounded-lg border appearance-none px-4 py-2.5 pr-11 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 ${className}`;

    let stateClasses = "border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700 dark:focus:border-brand-800";

    if (rest.disabled) {
      stateClasses = "border-gray-300 opacity-40 bg-gray-100 cursor-not-allowed dark:bg-gray-800 dark:border-gray-700";
    } else if (error) {
      stateClasses = "border-error-500 focus:border-error-300 focus:ring-error-500/20 dark:border-error-500 dark:focus:border-error-800";
    } else if (success) {
      stateClasses = "border-success-500 focus:border-success-300 focus:ring-success-500/20 dark:border-success-500 dark:focus:border-success-800";
    }

  return (
    <div className="relative">
      <select
      ref={ref}
      className={`${baseClasses} ${stateClasses} text-gray-800 dark:text-white/90`}
        value={value}
        defaultValue={defaultValue}
        aria-invalid={error ? "true" : "false"}
        aria-describedby={hint ? `${rest.id}-hint` : undefined}
        {...rest}
      >
        {/* Placeholder option */}
        <option
          value=""
          disabled
          className="text-gray-700 dark:bg-gray-900 dark:text-gray-500"
        >
          {placeholder}
        </option>
        {/* Map over options */}
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            className="text-gray-700 dark:bg-gray-900 dark:text-gray-400"
          >
            {option.label}
          </option>
        ))}
      </select>
      {/* Chevron icon */}
      <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2">
          <svg
            className="h-5 w-5 fill-gray-500 dark:fill-gray-400"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            />
          </svg>
        </div>

      {hint && (
        <p
          className={`mt-1.5 text-xs ${
            error
              ? 'text-error-500'
              : success
              ? 'text-success-500'
              : 'text-gray-500'
          }`}
        >
          {hint}
        </p>
      )}
    </div>
  );
});

export default Select;
