"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  console.error(error);

  return (
    <div className="p-6 text-center">
      <h2 className="text-xl font-bold text-red-600">Ocurrió un error</h2>
      <p className="mt-2">{error.message}</p>

      <button
        onClick={reset}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
      >
        Reintentar
      </button>
    </div>
  );
}
