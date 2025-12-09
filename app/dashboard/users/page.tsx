import UsersTable from "@/components/table/UsersTable";

export default function UserPage() {
  return (
    <>
      <div className="justify-around my-3">
        <h1 className="text-3xl font-bold text-center">Gestion de usuario</h1>
      </div>
      <div className="flex justify-center">
        <UsersTable />
      </div>
    </>
  );
}
