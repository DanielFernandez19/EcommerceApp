"use client";

interface Props {
  item: any;
}

export default function CartItem({ item }: Props) {
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-xl p-4 flex justify-between items-center">
      <div>
        <p className="font-semibold text-white">{item.productName}</p>
        <p className="text-sm text-gray-400">
          Cantidad: {item.quantity}
        </p>
      </div>

      <div className="text-right">
        <p className="text-violet-400 font-semibold">
          ${item.price}
        </p>
      </div>
    </div>
  );
}
