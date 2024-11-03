import React from "react";

interface LoadingStateProps {
  message?: string;
  className?: string;
}

const LoadingState: React.FC<LoadingStateProps> = ({ message = "Loading...", className = "" }) => {
  return (
    <div className={`flex flex-col items-center justify-center p-8 ${className}`}>
      <div className="relative w-16 h-16">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
        </div>
        <div className="absolute top-0 left-0 w-full h-full rotate-45">
          <div className="w-16 h-16 border-4 border-transparent border-t-primary/40 rounded-full animate-pulse"></div>
        </div>
      </div>
      <p className="mt-4 text-base-content/70 animate-pulse">{message}</p>
    </div>
  );
};

export default LoadingState;
