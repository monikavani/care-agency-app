interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'white' | 'gray' | 'blue';
  className?: string;
}

export default function Spinner({ 
  size = 'md', 
  color = 'gray', 
  className = '' 
}: SpinnerProps) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6'
  };

  const colorClasses = {
    white: 'border-white',
    gray: 'border-gray-900',
    blue: 'border-blue-500'
  };

  return (
    <div 
      className={`animate-spin rounded-full border-b-2 ${sizeClasses[size]} ${colorClasses[color]} ${className}`}
      role="status"
      aria-label="Loading"
    />
  );
}