export default function LoadingSpinner({ className = "" }) {
  return (
    <span
      aria-label="Loading"
      className={`inline-block h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white ${className}`}
    />
  );
}
