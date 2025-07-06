interface LoadingSpinnerProps {
  message?: string;
}

const LoadingSpinner = ({ message = "Generating your tailored application materials..." }: LoadingSpinnerProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 space-y-4">
      <div className="relative">
        {/* Outer rotating ring */}
        <div className="w-16 h-16 border-4 border-border rounded-full animate-spin border-t-primary"></div>
        {/* Inner pulsing dot */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
        </div>
      </div>
      
      <div className="text-center space-y-2">
        <p className="text-foreground font-medium">{message}</p>
        <p className="text-sm text-muted-foreground">
          This may take a few moments...
        </p>
      </div>
      
      {/* Progress dots */}
      <div className="flex space-x-1">
        <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce"></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;