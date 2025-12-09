export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white pt-32 pb-20 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-transparent"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-violet-300 bg-clip-text text-transparent">
          Estilo Urbano, Calidad Superior
        </h1>

        <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
          Descubre nuestra colección exclusiva de ropa urbana. Diseños únicos
          que fusionan comodidad y estilo para tu día a día.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="#products"
            className="bg-violet-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-violet-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-violet-500/25"
          >
            Ver Colección
          </a>
          <a
            href="#contact"
            className="border-2 border-violet-500 text-violet-300 px-8 py-4 rounded-lg font-semibold hover:bg-violet-500 hover:text-white transition-all duration-300"
          >
            Contactar
          </a>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
          <div className="text-center">
            <div className="text-3xl font-bold text-violet-400">500+</div>
            <div className="text-gray-400 text-sm mt-1">Productos</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-violet-400">50+</div>
            <div className="text-gray-400 text-sm mt-1">Marcas</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-violet-400">24h</div>
            <div className="text-gray-400 text-sm mt-1">Envío</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-violet-400">100%</div>
            <div className="text-gray-400 text-sm mt-1">Garantía</div>
          </div>
        </div>
      </div>
    </section>
  );
}
