import { User } from "@/types/user";
import EditUserClient from "./EditUserClient";

// Necesario para static export con rutas dinámicas
export async function generateStaticParams() {
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
  ];
}

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditUserPage({ params }: Props) {
  const { id: userId } = await params;
  
  return <EditUserClient userId={userId} />;
}