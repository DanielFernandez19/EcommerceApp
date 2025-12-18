import { Product } from "@/types/product";
import ProductViewClient from "./ProductViewClient";

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

export default async function ProductViewPage({ params }: Props) {
  const { id } = await params;
  
  return <ProductViewClient id={id} />;
}