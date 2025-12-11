"use client";
import { useState, useEffect } from "react";
import { apiGet } from "@/lib/api";
import { User } from "@/types/user";
import Table from "@/components/ui/Table";
import { useRouter } from "next/navigation";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";

export default function UsersPage() {
  const router = useRouter();
  const [usersData, setUsersData] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data: User[] = await apiGet("user/GetAll");
        setUsersData(data);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };

    fetchUsers();
  }, []);
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Gestión de usuarios</h1>
          <p className="text-gray-400 mt-1">Administra los usuarios del sistema</p>
        </div>
        
        <div className="mt-4 sm:mt-0">
          <button 
            onClick={() => router.push("/dashboard/abm/users/new")}
            className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors"
          >
            Nuevo usuario
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
        <Table<User>
          data={usersData}
          columns={["id", "name", "email"]}
          actions={[
            {
              label: "Editar",
              color: "bg-blue-600 hover:bg-blue-700",
              icon: <FaEdit />,
              onClick: (user: User) =>
                router.push(`/dashboard/abm/users/edit/${user.id}`),
            },
            {
              label: "Ver",
              color: "bg-green-600 hover:bg-green-700",
              icon: <FaEye />,
              onClick: (user: User) => router.push(`/dashboard/abm/users/view/${user.id}`),
            },
            {
              label: "Borrar",
              color: "bg-red-600 hover:bg-red-700",
              icon: <FaTrash />,
              onClick: (user: User) => {
                if (window.confirm(`¿Estás seguro de eliminar a ${user.name}?`)) {
                  // TODO: Implementar delete con API call
                  console.log(`Implementar delete para usuario ${user.id}`);
                }
              },
            },
          ]}
        />
      </div>
    </div>
  );
}
