import React, { ChangeEvent } from 'react';

export type TextareaProps = {
  label?: string;
  id: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  className?: string;
  rows?: number;
};

export const Textarea = ({ label, id, value, onChange, placeholder = '', className = '', rows = 4 }: TextareaProps) => (
  <div className="flex flex-col gap-1">
    {label && <label htmlFor={id} className="text-sm font-medium text-gray-700">{label}</label>}
    <textarea
      id={id}
      name={id}
      rows={rows}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`px-3 py-2 border rounded-md outline-none resize-none focus:ring-2 focus:ring-blue-500 border-gray-300 ${className}`}
    />
  </div>
);