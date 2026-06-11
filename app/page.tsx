import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur border-b border-slate-700">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">W</span>
            </div>
            <span className="text-2xl font-bold text-slate-100">
              Workana
            </span>
          </div>

          <div className="flex items-center space-x-6">
            {session ? (
              <>
                <span className="text-slate-300 text-sm">
                  Bienvenido, {session.user?.name}
                </span>
                <Link
                  href="/profile"
                  className="px-4 py-2 rounded-lg text-slate-300 hover:text-blue-400 transition font-medium"
                >
                  Ir a Perfil
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-slate-300 hover:text-blue-400 font-medium transition"
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
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h1 className="text-5xl md:text-7xl font-bold text-slate-50 mb-6 leading-tight">
              La plataforma de
              <span className="block text-blue-400">
                freelance moderna
              </span>
            </h1>
            <p className="text-xl text-slate-400 mb-8 leading-relaxed">
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
                    className="border border-slate-600 text-slate-300 hover:border-slate-500 hover:bg-slate-800 px-8 py-4 rounded-lg font-semibold transition text-center"
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
            <div className="relative w-full h-96 bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl border border-slate-600 flex items-center justify-center">
              <div className="text-center">
                <div className="w-24 h-24 bg-blue-600/20 rounded-xl mx-auto mb-4 flex items-center justify-center">
                  <div className="w-16 h-16 bg-blue-600 rounded-lg"></div>
                </div>
                <p className="text-slate-400">Plataforma de colaboración</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-slate-800/50 border-t border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-slate-50 mb-16">
            Por qué elegir Workana
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Interfaz Intuitiva",
                description: "Fácil de usar para publicar proyectos y enviar propuestas. Sin complicaciones innecesarias.",
              },
              {
                title: "Seguridad Garantizada",
                description: "Tus datos están protegidos con encriptación de nivel empresarial y garantía de privacidad.",
              },
              {
                title: "Soporte Confiable",
                description: "Equipo dedicado para ayudarte en cada paso de tu experiencia como cliente o freelancer.",
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="bg-slate-700/50 border border-slate-600 rounded-xl p-8 hover:border-slate-500 transition"
              >
                <div className="w-12 h-12 bg-blue-600/20 rounded-lg mb-4 flex items-center justify-center">
                  <div className="w-6 h-6 bg-blue-400 rounded"></div>
                </div>
                <h3 className="text-xl font-bold text-slate-100 mb-3">
                  {feature.title}
                </h3>
                <p className="text-slate-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="text-5xl font-bold text-blue-400 mb-2">10K+</div>
              <p className="text-slate-400 text-lg">Usuarios activos</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-blue-400 mb-2">50K+</div>
              <p className="text-slate-400 text-lg">Proyectos completados</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-blue-400 mb-2">4.9/5</div>
              <p className="text-slate-400 text-lg">Calificación promedio</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 border-t border-slate-700">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-slate-50 mb-6">
            ¿Listo para comenzar?
          </h2>
          <p className="text-xl text-slate-400 mb-8">
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
      <footer className="bg-slate-900 border-t border-slate-700 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="text-slate-100 font-semibold mb-4">Workana</h4>
              <p className="text-slate-400 text-sm">Plataforma de freelance moderna para conectar talento con oportunidades.</p>
            </div>
            <div>
              <h4 className="text-slate-100 font-semibold mb-4">Recursos</h4>
              <ul className="text-slate-400 text-sm space-y-2">
                <li><Link href="#" className="hover:text-blue-400 transition">Documentación</Link></li>
                <li><Link href="#" className="hover:text-blue-400 transition">Blog</Link></li>
                <li><Link href="#" className="hover:text-blue-400 transition">Soporte</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-slate-100 font-semibold mb-4">Compañía</h4>
              <ul className="text-slate-400 text-sm space-y-2">
                <li><Link href="#" className="hover:text-blue-400 transition">Acerca de</Link></li>
                <li><Link href="#" className="hover:text-blue-400 transition">Términos</Link></li>
                <li><Link href="#" className="hover:text-blue-400 transition">Privacidad</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-slate-100 font-semibold mb-4">Legal</h4>
              <ul className="text-slate-400 text-sm space-y-2">
                <li><Link href="#" className="hover:text-blue-400 transition">Términos de servicio</Link></li>
                <li><Link href="#" className="hover:text-blue-400 transition">Política de privacidad</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-700 pt-8 text-center text-slate-400 text-sm">
            <p>&copy; 2026 Workana. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
