interface LoadingStateProps {
  message?: string;
}

export const LoadingState = ({ message = "Loading..." }: LoadingStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className="loading loading-spinner loading-lg"></div>
      <p className="mt-4 text-base-content/70">{message}</p>
    </div>
  );
};
