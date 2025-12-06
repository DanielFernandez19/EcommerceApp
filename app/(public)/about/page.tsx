export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold text-center mb-8">Sobre Nosotros</h1>
      
      <div className="prose prose-lg mx-auto">
        <p className="text-lg text-gray-600 mb-6">
          Bienvenido a MiEcommerce, tu tienda online de confianza.
        </p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">Nuestra Misión</h2>
        <p className="text-gray-600 mb-6">
          Ofrecer los mejores productos con la mejor calidad y servicio al cliente.
        </p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">Nuestra Visión</h2>
        <p className="text-gray-600 mb-6">
          Ser la tienda online preferida de nuestros clientes, innovando constantemente.
        </p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">Nuestros Valores</h2>
        <ul className="list-disc pl-6 text-gray-600">
          <li>Calidad en cada producto</li>
          <li>Servicio al cliente excepcional</li>
          <li>Innovación constante</li>
          <li>Transparencia y honestidad</li>
        </ul>
      </div>
    </div>
  );
}