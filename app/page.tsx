import Login from "./Login/page";

export default function Home() {
  console.log("API BASE:", process.env.NEXT_PUBLIC_API_URL);
  return (
    <div>
      <Login />
    </div>
  );
}
