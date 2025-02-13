// components/SelectField.tsx
import React from 'react';

interface SelectFieldProps {
  label?: string;
  name: string;
  options: { value: string | number; label: string }[];
  placeholder?: string;
  register: any; // Assuming React Hook Form is used
  error?: string;
  styles?: {
    label?: string;
    input?: string;
    container?: string;
    error?: string;
  };
}

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  name,
  options,
  placeholder,
  register,
  error,
  styles,
}) => {
  return (
    <div className={`${styles?.container} w-full my-1`}>
      {label && (
        <label
          htmlFor={name}
          className={`text-sm text-gray-700 ${styles?.label} ${
            error ? 'text-red-500' : ''
          }`}
        >
          {label}
        </label>
      )}
      <select
        {...register(name)}
        id={name}
        defaultValue=""
        className={`form-input ${
          error ? '!border-red-500' : 'border-gray-300'
        } rounded-md text-sm text-gray-700 ${styles?.input}`}
      >
        <option value="" disabled hidden>
          {placeholder || 'Select an option'}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className={`form-error ${styles?.error}`}>{error}</p>}
    </div>
  );
};

export default SelectField;
