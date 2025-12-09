"use client";
import { useState, useEffect } from "react";
import { apiGet } from "@/lib/api";
import { User } from "@/types/user";
import Table from "@/components/table/Table";
import { useRouter } from "next/navigation";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";

export default function UsersTable() {
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
    <div>
      <Table<User>
        data={usersData}
        columns={["name", "lastName", "email"]}
        actions={[
          {
            label: "Editar",
            color: "bg-blue-600 hover:bg-blue-500",
            icon: <FaEdit />,
            onClick: (user: User) => router.push(`/users/edit/${user.id}`),
          },
          {
            label: "Ver",
            color: "bg-green-600 hover:bg-green-500",
            icon: <FaEye />,
            onClick: (user: User) => console.log("Ver usuario", user),
          },
          {
            label: "Borrar",
            color: "bg-red-600 hover:bg-red-500",
            icon: <FaTrash />,
            onClick: (user: User) => console.log("delete", user.id),
          },
        ]}
      />
    </div>
  );
}
