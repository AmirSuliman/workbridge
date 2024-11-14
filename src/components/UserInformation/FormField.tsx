'use client'
import React from 'react';

interface FormFieldProps {
  label: string;
  value: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  className?: string;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  value,
  onChange,
  placeholder,
  className = '',
}) => {
  return (
    <div className="flex flex-col">
      <h6 className="text-[#abaeb4] text-xs mb-1">{label}</h6>
      <input
        type="text"
        className={`p-2 border border-gray-border text-dark-navy text-xs outline-none focus:outline-none rounded-md ${className}`}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
};

export default FormField;
