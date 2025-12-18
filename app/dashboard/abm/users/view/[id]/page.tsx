import { User } from "@/types/user";
import UserViewClient from "./UserViewClient";

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

export default async function UserViewPage({ params }: Props) {
  const { id } = await params;
  
  return <UserViewClient id={id} />;
}