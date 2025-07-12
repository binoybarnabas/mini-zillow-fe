import { ChangeEvent, forwardRef } from "react";

export type FileUploadProps = {
  label?: string;
  id: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  multiple?: boolean;
};

// Wrap in forwardRef
  export const FileUpload = forwardRef<HTMLInputElement, FileUploadProps>(
    ({ label, id, onChange, className = '', multiple = false }, ref) => (
    <div className="flex flex-col gap-1">
      {label && <label htmlFor={id} className="text-sm font-medium text-gray-700">{label}</label>}
      <input
        type="file"
        id={id}
        name={id}
        multiple={multiple}
        onChange={onChange}
        ref={ref} 
        className={`block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 ${className}`}
      />
    </div>
  )
);