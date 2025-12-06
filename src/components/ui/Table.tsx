import React from "react";
import { TableAction } from "@/types/tableActions";
import Row from "./Row";

interface TableProps<T extends object> {
  data: T[];
  columns?: (keyof T)[];
  actions?: TableAction<T>[];
}

export default function Table<T extends object>({
  data,
  columns,
  actions = [],
}: TableProps<T>) {
  if (!data || data.length === 0)
    return <p className="text-gray-400">No hay datos</p>;

  const keys = columns ?? (Object.keys(data[0]) as (keyof T)[]);

  return (
    <div className="overflow-x-auto border border-gray-700 rounded-lg bg-gray-900">
      <table className="min-w-full divide-y divide-gray-700">
        <thead className="bg-gray-800">
          <tr>
            {keys.map((col) => (
              <th
                key={String(col)}
                className="px-6 py-3 text-left text-sm font-semibold text-gray-300 uppercase tracking-wider"
              >
                {String(col)}
              </th>
            ))}

            {/* Acciones solo si existen */}
            {actions.length > 0 && (
              <th className="px-6 py-3 text-sm font-semibold text-gray-300 uppercase">
                Acciones
              </th>
            )}
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-800">
          {data.map((item, index) => (
            <Row key={index} item={item} columns={keys} actions={actions} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
