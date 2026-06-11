import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">W</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
              Workana
            </span>
          </div>

          <div className="flex items-center space-x-4">
            {session ? (
              <>
                <Link
                  href="/profile"
                  className="text-gray-700 hover:text-blue-600 font-medium transition"
                >
                  Mi Perfil
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-gray-700 hover:text-blue-600 font-medium transition"
                >
                  Iniciar Sesión
                </Link>
                <Link
                  href="/register"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition"
                >
                  Registrarse
                </Link>
              </>
            )}
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Conecta con
              <span className="block bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                Profesionales
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              La plataforma más confiable para encontrar proyectos o talento. Conecta con miles de profesionales de todo el mundo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              {!session ? (
                <>
                  <Link
                    href="/register"
                    className="bg-gradient-to-r from-blue-600 to-blue-700 hover:shadow-lg text-white px-8 py-4 rounded-lg font-semibold transition transform hover:scale-105 text-center"
                  >
                    Comienza Ahora
                  </Link>
                  <Link
                    href="/login"
                    className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-lg font-semibold transition text-center"
                  >
                    Inicia Sesión
                  </Link>
                </>
              ) : (
                <Link
                  href="/profile"
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:shadow-lg text-white px-8 py-4 rounded-lg font-semibold transition transform hover:scale-105 text-center"
                >
                  Ir a Mi Perfil
                </Link>
              )}
            </div>
          </div>

          <div className="hidden md:block">
            <div className="relative w-full h-96 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl shadow-2xl flex items-center justify-center">
              <div className="text-6xl">👥</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
            ¿Por qué elegir Workana?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "🎯",
                title: "Fácil de Usar",
                description: "Interfaz intuitiva para conectar con profesionales",
              },
              {
                icon: "🔒",
                title: "Seguro",
                description: "Tus datos están protegidos con encriptación de nivel empresarial",
              },
              {
                icon: "⚡",
                title: "Rápido",
                description: "Encuentra lo que necesitas en minutos, no en horas",
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="bg-gray-50 rounded-xl p-8 text-center hover:shadow-lg transition"
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2026 Workana. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
