export function ModalSuccess({ message }: { message: string }) {
  return (
    <div
      className="bg-green-300 border-t-4 border-green-600 rounded-b text-green-900 px-4 py-3 shadow-md"
      role="alert"
    >
      <div className="flex">
        <div className="py-1">
          <svg
            className="fill-current h-6 w-6 text-green-600 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M10 0a10 10 0 1 0 0 20A10 10 0 0 0 10 0zm-1 15L4 10l1.4-1.4L9 12.2l5.6-5.6L16 8l-7 7z" />
          </svg>
        </div>
        <div>
          <p className="font-bold">{message}</p>
        </div>
      </div>
    </div>
  );
}
