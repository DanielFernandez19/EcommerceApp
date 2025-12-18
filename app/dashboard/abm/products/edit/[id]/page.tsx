import { Product } from "@/types/product";
import EditProductClient from "./EditProductClient";

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

export default async function EditProductPage({ params }: Props) {
  const { id } = await params;
  
  return <EditProductClient id={id} />;
}