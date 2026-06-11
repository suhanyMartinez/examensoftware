import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-slate-200">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">W</span>
            </div>
            <span className="text-2xl font-bold text-slate-900">
              Workana
            </span>
          </div>

          <div className="flex items-center space-y-0 space-x-8">
            {session ? (
              <>
                <span className="text-slate-600 text-sm">
                  Bienvenido, {session.user?.name}
                </span>
                <Link
                  href="/profile"
                  className="px-4 py-2 rounded-lg text-slate-600 hover:text-blue-600 transition font-medium"
                >
                  Ir a Perfil
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-slate-600 hover:text-blue-600 font-medium transition"
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
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div>
            <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-6 leading-tight">
              🚀 La plataforma de
              <span className="block text-blue-600">
                freelance moderna
              </span>
            </h1>
            <p className="text-xl text-slate-600 mb-8 leading-relaxed">
              Conecta con profesionales de todo el mundo. Publica proyectos, encuentra talento, y colabora de manera segura.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              {!session ? (
                <>
                  <Link
                    href="/register"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition text-center"
                  >
                    Comenzar
                  </Link>
                  <Link
                    href="/login"
                    className="border border-slate-300 text-slate-600 hover:border-blue-600 hover:bg-blue-50 px-8 py-4 rounded-lg font-semibold transition text-center"
                  >
                    Ingresar
                  </Link>
                </>
              ) : (
                <Link
                  href="/profile"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition text-center"
                >
                  Ir al Dashboard
                </Link>
              )}
            </div>
          </div>

          <div className="hidden md:block">
            <div className="relative w-full h-96 bg-gradient-to-br from-blue-50 to-slate-100 rounded-2xl border border-slate-200 flex items-center justify-center shadow-sm">
              <div className="text-center">
                <div className="w-24 h-24 bg-blue-100 rounded-xl mx-auto mb-4 flex items-center justify-center text-4xl">
                  💼
                </div>
                <p className="text-slate-600 font-medium">Plataforma de colaboración</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-28 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-slate-900 mb-20">
            ✨ Por qué elegir Workana
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                title: "Interfaz Intuitiva",
                icon: "🎯",
                description: "Fácil de usar para publicar proyectos y enviar propuestas. Sin complicaciones innecesarias.",
              },
              {
                title: "Seguridad Garantizada",
                icon: "🔒",
                description: "Tus datos están protegidos con encriptación de nivel empresarial y garantía de privacidad.",
              },
              {
                title: "Soporte Confiable",
                icon: "👥",
                description: "Equipo dedicado para ayudarte en cada paso de tu experiencia como cliente o freelancer.",
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="bg-white border border-slate-200 rounded-xl p-10 hover:shadow-lg hover:border-blue-200 transition"
              >
                <div className="w-14 h-14 bg-blue-100 rounded-lg mb-6 flex items-center justify-center text-3xl">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <div className="text-center py-6">
              <div className="text-5xl font-bold text-blue-600 mb-4">10K+</div>
              <p className="text-slate-600 text-lg">👥 Usuarios activos</p>
            </div>
            <div className="text-center py-6">
              <div className="text-5xl font-bold text-blue-600 mb-4">50K+</div>
              <p className="text-slate-600 text-lg">✅ Proyectos completados</p>
            </div>
            <div className="text-center py-6">
              <div className="text-5xl font-bold text-blue-600 mb-4">4.9/5</div>
              <p className="text-slate-600 text-lg">⭐ Calificación promedio</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-28 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-slate-900 mb-8">
            ¿Listo para comenzar? 🎉
          </h2>
          <p className="text-xl text-slate-600 mb-12 leading-relaxed">
            Únete a miles de profesionales que ya están colaborando en proyectos exitosos.
          </p>
          {!session && (
            <Link
              href="/register"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition"
            >
              Crear una cuenta
            </Link>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-700 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div>
              <h4 className="text-white font-semibold mb-6">Workana</h4>
              <p className="text-slate-400 text-sm leading-relaxed">Plataforma de freelance moderna para conectar talento con oportunidades.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-6">Recursos</h4>
              <ul className="text-slate-400 text-sm space-y-3">
                <li><Link href="#" className="hover:text-blue-400 transition">Documentación</Link></li>
                <li><Link href="#" className="hover:text-blue-400 transition">Blog</Link></li>
                <li><Link href="#" className="hover:text-blue-400 transition">Soporte</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-6">Compañía</h4>
              <ul className="text-slate-400 text-sm space-y-3">
                <li><Link href="#" className="hover:text-blue-400 transition">Acerca de</Link></li>
                <li><Link href="#" className="hover:text-blue-400 transition">Términos</Link></li>
                <li><Link href="#" className="hover:text-blue-400 transition">Privacidad</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-6">Legal</h4>
              <ul className="text-slate-400 text-sm space-y-3">
                <li><Link href="#" className="hover:text-blue-400 transition">Términos de servicio</Link></li>
                <li><Link href="#" className="hover:text-blue-400 transition">Política de privacidad</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-700 pt-12 text-center text-slate-400 text-sm">
            <p>&copy; 2026 Workana. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
