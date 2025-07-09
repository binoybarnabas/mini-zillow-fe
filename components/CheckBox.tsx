import React, { ChangeEvent } from 'react';

export type CheckboxProps = {
  label?: string;
  id: string;
  checked?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
};

export const Checkbox = ({ label, id, checked, onChange, className = '' }: CheckboxProps) => (
  <div className="flex items-center gap-2">
    <input
      type="checkbox"
      id={id}
      checked={checked}
      onChange={onChange}
      className={`w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 ${className}`}
    />
    {label && <label htmlFor={id} className="text-sm text-gray-700">{label}</label>}
  </div>
);