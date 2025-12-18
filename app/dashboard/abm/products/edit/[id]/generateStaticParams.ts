export async function generateStaticParams() {
  // Generar algunas rutas estáticas de ejemplo
  // En producción, esto podría venir de una API o archivo de configuración
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
  ];
}