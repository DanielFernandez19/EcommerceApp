export default function Login() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold m-6">Login</h1>
      <div className="flex flex-col space-y-4">
        <input
          className="border border-gray-300 rounded px-4 py-2"
          type="text"
          placeholder="user@gmail.com"
          id="txtEmail"
          name="email"
        />
        <input
          className="border border-gray-300 rounded px-4 py-2"
          type="password"
          placeholder="Password"
          id="txtPassword"
          name="password"
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          Login
        </button>
      </div>
    </div>
  );
}
