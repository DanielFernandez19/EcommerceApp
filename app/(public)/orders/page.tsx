export default function OrdersPage() {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="max-w-6xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Mis Pedidos</h1>
          <p className="text-gray-400">Historial de tus compras</p>
        </div>
        
        <div className="bg-gray-800 rounded-xl border border-gray-700 p-8">
          <div className="space-y-4">
            {/* Pedido 1 */}
            <div className="bg-gray-700 rounded-lg p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-white">Pedido #12345</h3>
                  <p className="text-gray-400 text-sm">15 de Enero, 2024</p>
                </div>
                <span className="px-3 py-1 bg-green-600/20 text-green-400 rounded-full text-sm font-medium">
                  Entregado
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-16 h-16 bg-gray-600 rounded-lg"></div>
                  <div>
                    <p className="text-white font-medium">Remera Urban</p>
                    <p className="text-gray-400 text-sm">Negro - M</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-16 h-16 bg-gray-600 rounded-lg"></div>
                  <div>
                    <p className="text-white font-medium">Jean Slim</p>
                    <p className="text-gray-400 text-sm">Azul - 32</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-gray-400 text-sm">Total</p>
                  <p className="text-xl font-bold text-white">$15.990</p>
                </div>
              </div>
              
              <div className="flex justify-between items-center pt-4 border-t border-gray-600">
                <button className="text-violet-400 hover:text-violet-300 transition-colors">
                  Ver detalles
                </button>
                <button className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors">
                  Comprar nuevamente
                </button>
              </div>
            </div>
            
            {/* Pedido 2 */}
            <div className="bg-gray-700 rounded-lg p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-white">Pedido #12344</h3>
                  <p className="text-gray-400 text-sm">10 de Enero, 2024</p>
                </div>
                <span className="px-3 py-1 bg-blue-600/20 text-blue-400 rounded-full text-sm font-medium">
                  En camino
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-16 h-16 bg-gray-600 rounded-lg"></div>
                  <div>
                    <p className="text-white font-medium">Buzo Hoodie</p>
                    <p className="text-gray-400 text-sm">Gris - L</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-16 h-16 bg-gray-600 rounded-lg"></div>
                  <div>
                    <p className="text-white font-medium">Gorra Snapback</p>
                    <p className="text-gray-400 text-sm">Negro - Único</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-gray-400 text-sm">Total</p>
                  <p className="text-xl font-bold text-white">$12.500</p>
                </div>
              </div>
              
              <div className="flex justify-between items-center pt-4 border-t border-gray-600">
                <button className="text-violet-400 hover:text-violet-300 transition-colors">
                  Seguir pedido
                </button>
                <button className="px-4 py-2 border border-gray-500 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors">
                  Contactar soporte
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}