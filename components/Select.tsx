import React, { ChangeEvent, useEffect, useState } from 'react';

export type SelectProps = {
  label?: string;
  id: string;
  options: { value: string; label: string }[];
  value?: string;
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
  required?: boolean;
};

export const Select = ({
  label,
  id,
  options,
  value,
  onChange,
  className = '',
  required = false,
}: SelectProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Enable animation only after mount to avoid SSR issues
    setMounted(true);
  }, []);

  return (
    <div
      className={`flex flex-col gap-1 transform transition-all duration-500 ease-out ${
        mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
      }`}
    >
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <select
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        className={`px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-500 border-gray-300 transition-all duration-300 ease-in-out hover:shadow-md focus:shadow-md ${className}`}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};
