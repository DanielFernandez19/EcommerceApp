interface Props {
  total: number;
}

export default function CartSummary({ total }: Props) {
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 space-y-4">
      <h2 className="text-lg font-semibold text-white">
        Resumen
      </h2>

      <div className="flex justify-between text-gray-300">
        <span>Total</span>
        <span className="font-bold text-violet-400">
          ${total}
        </span>
      </div>

      <button className="w-full bg-violet-600 hover:bg-violet-700 py-2 rounded-lg font-semibold">
        Confirmar pedido
      </button>
    </div>
  );
}
