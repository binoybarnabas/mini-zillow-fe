import React from 'react';

export type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  loading?: boolean;
  disabled?: boolean;
  loadingText?: string;
};

export const Button = ({
  children,
  onClick,
  type = 'button',
  className = '',
  loading = false,
  disabled = false,
  loadingText = 'Loading...',
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled || loading}
      className={`w-full bg-blue-600 text-white rounded py-2 my-4 hover:bg-blue-700 disabled:opacity-50 transition ${className}`}
    >
      {loading ? loadingText : children}
    </button>
  );
};
