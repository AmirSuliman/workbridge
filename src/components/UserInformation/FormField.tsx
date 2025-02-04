'use client';
import React from 'react';

interface FormFieldProps {
  label: string;
  value: string;
  name?: string;
  readOnly: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  className?: string;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  value,
  onChange,
  readOnly,
  placeholder,
  className = '',
}) => {
  return (
    <label className="flex flex-col">
      <h6 className="form-label mb-1">{label}</h6>
      <input
        type="text"
        className={`form-input ${className}`}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        readOnly={readOnly}
        name={name}
      />
    </label>
  );
};

export default FormField;
