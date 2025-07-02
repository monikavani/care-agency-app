import { ReactNode } from 'react';

interface FormFieldProps {
  label: string;
  error?: string;
  children: ReactNode;
  className?: string;
}

export default function FormField({ 
  label, 
  error, 
  children, 
  className = '' 
}: FormFieldProps) {
  return (
    <div className={`bg-gray-50 p-4 rounded-lg ${className}`}>
      <label className="block text-gray-600 mb-2 font-medium">
        {label}
      </label>
      {children}
      {error && (
        <p className="mt-2 text-red-500 text-sm">
          {error}
        </p>
      )}
    </div>
  );
} 