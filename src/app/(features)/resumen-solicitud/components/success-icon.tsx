export const SuccessIcon = () => {
  return (
    <div className="relative w-24 h-24 mx-auto mb-6">
      <div className="absolute inset-0 bg-emerald-100 rounded-full animate-ping opacity-20" />
      <div className="relative w-full h-full bg-emerald-500 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/30">
        <svg
          className="w-12 h-12 text-white animate-scale-in"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>
    </div>
  );
};
