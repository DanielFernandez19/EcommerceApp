import { DashboardCards } from "@/components/dashboard/DashboardCards";
import { getDashboardData } from "./actions";

export default async function DashboardPage() {
  // Obtener datos reales del servidor
  const dashboardData = await getDashboardData();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="text-gray-400 mt-1">
            Bienvenido al panel de administración
          </p>
        </div>

        <div className="mt-4 sm:mt-0 flex items-center space-x-3">
          <button className="px-4 py-2 bg-gray-800 border border-gray-700 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors">
            Última actualización: hace 2 min
          </button>
          <button className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors">
            Actualizar datos
          </button>
        </div>
      </div>

{/* Stats Grid - Server Component */}
      <DashboardCards data={dashboardData} />
    </div>
  );
}