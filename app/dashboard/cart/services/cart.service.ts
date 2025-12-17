const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getCart(userId: string) {
  const res = await fetch(`${API_URL}/Cart/GetCart/${userId}`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Error al obtener carrito");

  return res.json();
  
}

export async function addItemToCart(
  userId: string,
  productId: number,
  quantity: number = 1
) {
  const res = await fetch(`${API_URL}/Cart/AddItemToCart`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, productId, quantity }),
  });
 console.log("AddItem payload:", { userId, productId, quantity });

  if (!res.ok) throw new Error("Error al agregar producto");

  return res.json();
}

export async function removeCartItem(id: number) {
  const res = await fetch(`${API_URL}/Cart/RemoveCartItem/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Error al eliminar item");
}
