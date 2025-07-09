import React, { ChangeEvent } from 'react';

export type RadioGroupProps = {
  name: string;
  options: { value: string; label: string }[];
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const RadioGroup = ({ name, options, value, onChange }: RadioGroupProps) => (
  <div className="flex gap-4">
    {options.map((opt) => (
      <label key={opt.value} className="flex items-center gap-2">
        <input
          type="radio"
          name={name}
          value={opt.value}
          checked={value === opt.value}
          onChange={onChange}
          className="text-blue-600 focus:ring-blue-500"
        />
        <span className="text-sm text-gray-700">{opt.label}</span>
      </label>
    ))}
  </div>
);