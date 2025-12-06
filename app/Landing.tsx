import Hero from "@/components/features/landing/Hero";
import ProductGrid from "@/components/features/products/ProductGrid";
import Contact from "@/components/features/landing/Contact";
import Footer from "@/components/features/landing/Footer";
import { PRODUCTS_DATA } from "@/data/products";

export default function LandingPage() {
  // Productos destacados (primeros 4)
  const featuredProducts = PRODUCTS_DATA.slice(0, 4);

  // Todos los productos
  const allProducts = PRODUCTS_DATA;

  return (
    <div className="min-h-screen bg-black">
      <Hero />

      {/* Productos Destacados */}
      <section className="bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <ProductGrid
            products={featuredProducts}
            title="Productos Destacados"
          />
        </div>
      </section>

      {/* Sección de beneficios */}
      <section className="bg-black py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              ¿Por qué elegirnos?
            </h2>
            <div className="w-24 h-1 bg-violet-500 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-violet-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Calidad Premium
              </h3>
              <p className="text-gray-400">
                Prendas seleccionadas con los mejores materiales del mercado.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-violet-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Envíos Rápidos
              </h3>
              <p className="text-gray-400">
                Recibí tu pedido en 24hs en CABA y GBA.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-violet-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Satisfacción Garantizada
              </h3>
              <p className="text-gray-400">
                30 días de devolución si no estás conforme con tu compra.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Todos los productos */}
      <section className="bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <ProductGrid
            products={allProducts}
            title="Nuestra Colección Completa"
          />
        </div>
      </section>

      {/* CTA Final */}
      <section className="bg-linear-gradient-to-r from-violet-900 to-violet-700 py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            ¿Listo para renovar tu estilo?
          </h2>
          <p className="text-xl text-violet-100 mb-8">
            Sumate a nuestra comunidad y recibí ofertas exclusivas cada semana.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/auth/register"
              className="bg-white text-violet-700 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
            >
              Crear Cuenta
            </a>
            <a
              href="#products"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-violet-700 transition-all duration-300"
            >
              Ver Catálogo
            </a>
          </div>
        </div>
      </section>

      <Contact />
      <Footer />
    </div>
  );
}
