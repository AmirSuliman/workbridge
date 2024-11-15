// components/InputField.tsx
import React from 'react';

interface InputFieldProps {
    label?: string;
    name: string;
    type?: string;
    placeholder?: string;
    register: any;
    error?: string;
    styles?: { label?: string, input?: string, container?: string, error?: string }
}

const InputField: React.FC<InputFieldProps> = ({
    label,
    name,
    type = 'text',
    placeholder,
    register,
    error,
    styles
}) => {
    return (
        <div className={`${styles?.container} w-full my-1`}>
            <div>
                {label && <label htmlFor={name} className={`text-sm text-gray-700 ${styles?.label} ${typeof error == "string" ? "text-red-500" : ""}`}>{label}</label>}
                <input
                    {...register(name)}
                    id={name}
                    type={type}
                    placeholder={placeholder}
                    className={`w-full p-2 px-3 shadow-xs outline-0 placeholder-gray-500 border ${typeof error == "string" ? "!border-red-500" : ""} border-gray-300 rounded-md text-sm text-gray-700 ${styles?.input}`}
                />
            </div>
            {error && <p className={`text-red-400 text-xs mt-1 ms-1 ${styles?.error} `}>{error}</p>}
        </div>
    );
};

export default InputField;
