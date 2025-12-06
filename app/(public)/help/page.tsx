export default function HelpPage() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold text-center mb-8">Centro de Ayuda</h1>
      
      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Preguntas Frecuentes</h2>
          
          <div className="space-y-4">
            <details className="border border-gray-200 rounded-lg p-4">
              <summary className="font-semibold cursor-pointer">¿Cómo realizo una compra?</summary>
              <p className="mt-2 text-gray-600">
                Simplemente navega por nuestros productos, selecciona lo que quieres comprar, 
                agrégalo al carrito y sigue los pasos de checkout.
              </p>
            </details>
            
            <details className="border border-gray-200 rounded-lg p-4">
              <summary className="font-semibold cursor-pointer">¿Qué métodos de pago aceptan?</summary>
              <p className="mt-2 text-gray-600">
                Aceptamos tarjetas de crédito/débito, transferencias bancarias y wallets digitales.
              </p>
            </details>
            
            <details className="border border-gray-200 rounded-lg p-4">
              <summary className="font-semibold cursor-pointer">¿Cuánto tarda el envío?</summary>
              <p className="mt-2 text-gray-600">
                Los envíos en Capital Federal tardan 24-48hs. Al resto del país 3-5 días hábiles.
              </p>
            </details>
            
            <details className="border border-gray-200 rounded-lg p-4">
              <summary className="font-semibold cursor-pointer">¿Puedo devolver un producto?</summary>
              <p className="mt-2 text-gray-600">
                Sí, tienes 30 días para devolver productos en su estado original.
              </p>
            </details>
          </div>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold mb-4">Políticas de Devolución</h2>
          <div className="bg-gray-50 p-6 rounded-lg">
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>30 días para realizar devoluciones</li>
              <li>El producto debe estar en su estado original</li>
              <li>El embalaje original debe estar incluido</li>
              <li>Los costos de envío de devolución son por cuenta del cliente</li>
              <li>El reembolso se procesa dentro de 5-7 días hábiles</li>
            </ul>
          </div>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold mb-4">Garantía</h2>
          <p className="text-gray-600">
            Todos nuestros productos cuentan con garantía del fabricante. 
            Para hacer uso de la garantía, contactanos a través de nuestro formulario de contacto.
          </p>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold mb-4">¿Necesitas más ayuda?</h2>
          <p className="text-gray-600 mb-4">
            Si no encontraste la respuesta que buscabas, no dudes en contactarnos:
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a 
              href="/contact" 
              className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 text-center"
            >
              Contactar Soporte
            </a>
            <a 
              href="tel:+541112345678" 
              className="border border-blue-600 text-blue-600 px-6 py-3 rounded-md hover:bg-blue-50 text-center"
            >
              Llamar ahora
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}