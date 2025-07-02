import Button from './Button';

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
  className?: string;
}

export default function ErrorState({ 
  message = 'Something went wrong', 
  onRetry,
  className = ''
}: ErrorStateProps) {
  return (
    <div className={`text-center ${className}`}>
      <p className="text-red-600 mb-4">{message}</p>
      {onRetry && (
        <Button onClick={onRetry}>
          Retry
        </Button>
      )}
    </div>
  );
} 