import React, { ChangeEvent } from 'react';

// 1️⃣ Input.tsx
export type InputProps = {
  label?: string;
  id: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  disabled?: boolean;
};

export const Input = ({
  label,
  id,
  type = 'text',
  placeholder = '',
  value,
  onChange,
  className = '',
  error,
  helperText,
  required = false,
  disabled = false,
}: InputProps) => (
  <div className="flex flex-col gap-1">
    {label && (
      <label htmlFor={id} className="text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
    )}
    <input
      id={id}
      name={id}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className={`px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${error ? 'border-red-500' : 'border-gray-300'} ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''} ${className}`}
    />
    {helperText && !error && <span className="text-xs text-gray-500">{helperText}</span>}
    {error && <span className="text-xs text-red-500">{error}</span>}
  </div>
);