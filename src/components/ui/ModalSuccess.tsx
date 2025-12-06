export function ModalSuccess({ message }: { message: string }) {
  return (
    <div
      className="bg-green-900/50 border border-green-700 text-green-300 px-6 py-4 rounded-lg shadow-lg"
      role="alert"
    >
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <svg
            className="h-6 w-6 text-green-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <div className="ml-3">
          <p className="font-medium">{message}</p>
        </div>
      </div>
    </div>
  );
}
