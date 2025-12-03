import { TableAction } from "@/types/tableActions";

interface RowProps<T extends object> {
  item: T;
  columns: (keyof T)[];
  actions?: TableAction<T>[];
}

export default function Row<T extends object>({
  item,
  columns,
  actions = [],
}: RowProps<T>) {
  return (
    <tr className="hover:bg-gray-800 transition">
      {columns.map((col) => (
        <td
          key={String(col)}
          className="px-6 py-4 whitespace-nowrap text-sm text-gray-300"
        >
          {String(item[col])}
        </td>
      ))}

      {actions.length > 0 && (
        <td className="px-6 py-4 flex items-center gap-3">
          {actions.map((action, i) => (
            <button
              key={i}
              onClick={() => action.onClick(item)}
              className={`${action.color ?? "bg-blue-600 hover:bg-blue-500"}
                          px-3 py-1 rounded text-white flex items-center gap-1`}
            >
              {action.icon}
              {action.label}
            </button>
          ))}
        </td>
      )}
    </tr>
  );
}
