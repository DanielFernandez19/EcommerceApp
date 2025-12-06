export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold text-center mb-8">Contacto</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Información de Contacto</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">Email</h3>
              <p className="text-gray-600">contacto@miecommerce.com</p>
            </div>
            
            <div>
              <h3 className="font-semibold">Teléfono</h3>
              <p className="text-gray-600">+54 11 1234-5678</p>
            </div>
            
            <div>
              <h3 className="font-semibold">Dirección</h3>
              <p className="text-gray-600">Av. Siempre Viva 1234<br />Buenos Aires, Argentina</p>
            </div>
            
            <div>
              <h3 className="font-semibold">Horarios</h3>
              <p className="text-gray-600">
                Lunes a Viernes: 9:00 - 18:00<br />
                Sábados: 9:00 - 13:00
              </p>
            </div>
          </div>
        </div>
        
        <div>
          <h2 className="text-2xl font-semibold mb-4">Envíanos un mensaje</h2>
          
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Nombre
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Mensaje
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
            >
              Enviar Mensaje
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}