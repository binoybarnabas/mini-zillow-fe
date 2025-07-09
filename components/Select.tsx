import React, { ChangeEvent } from 'react';

export type SelectProps = {
  label?: string;
  id: string;
  options: { value: string; label: string }[];
  value?: string;
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
};

export const Select = ({ label, id, options, value, onChange, className = '' }: SelectProps) => (
  <div className="flex flex-col gap-1">
    {label && <label htmlFor={id} className="text-sm font-medium text-gray-700">{label}</label>}
    <select
      id={id}
      name={id}
      value={value}
      onChange={onChange}
      className={`px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-500 border-gray-300 ${className}`}
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
  </div>
);