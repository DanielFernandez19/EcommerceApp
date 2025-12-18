"use client";

interface Props {
  cart: any;
}

export default function CartSummary({ cart }: Props) {
  if (!cart || !cart.items) return null;

  const itemCount = cart.items.length;
  const subtotal = cart.items.reduce((sum: number, item: any) => {
    return sum + (item.price * item.quantity);
  }, 0);
  const total = cart.total || subtotal;

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 space-y-4">
      <h2 className="text-lg font-semibold text-white">
        Resumen
      </h2>

      <div className="space-y-3">
        <div className="flex justify-between text-sm text-gray-300">
          <span>Productos:</span>
          <span className="font-semibold text-white">{itemCount}</span>
        </div>

        <div className="flex justify-between text-sm text-gray-300">
          <span>Subtotal:</span>
          <span className="font-semibold text-white">
            ${subtotal.toLocaleString("es-AR")}
          </span>
        </div>

        <div className="border-t border-gray-700 pt-3">
          <div className="flex justify-between text-base">
            <span className="font-semibold text-white">Total:</span>
            <span className="font-bold text-violet-400">
              ${total.toLocaleString("es-AR")}
            </span>
          </div>
        </div>
      </div>

      <button className="w-full bg-violet-600 hover:bg-violet-700 py-2 rounded-lg font-semibold text-white transition-colors">
        Confirmar pedido
      </button>
    </div>
  );
}
