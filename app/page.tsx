import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h1 className="text-5xl font-bold text-slate-900 mb-6">
              La plataforma de freelance moderna
            </h1>
            <p className="text-base text-slate-600 mb-8">
              Conecta con profesionales. Publica proyectos. Colabora de manera segura.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              {!session ? (
                <>
                  <Link
                    href="/register"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-semibold transition text-center text-sm"
                  >
                    Comenzar
                  </Link>
                  <Link
                    href="/login"
                    className="border border-slate-300 text-slate-600 hover:border-blue-600 hover:bg-blue-50 px-6 py-2.5 rounded-lg font-semibold transition text-center text-sm"
                  >
                    Ingresar
                  </Link>
                </>
              ) : (
                <Link
                  href="/profile"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-semibold transition text-center text-sm"
                >
                  Dashboard
                </Link>
              )}
            </div>
          </div>

          <div className="hidden md:block">
            <div className="relative w-full h-72 bg-gradient-to-br from-blue-50 to-slate-100 rounded-xl border border-slate-200 flex items-center justify-center shadow-sm">
              <div className="text-center">
                <div className="text-5xl mb-3">💼</div>
                <p className="text-slate-600 font-medium text-sm">Plataforma colaborativa</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-16">
            ¿Por qué Workana?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                icon: "🎯",
                title: "Interfaz Intuitiva",
                description: "Fácil de usar y sin complicaciones.",
              },
              {
                icon: "🔒",
                title: "Seguridad",
                description: "Tus datos protegidos siempre.",
              },
              {
                icon: "👥",
                title: "Soporte",
                description: "Equipo dedicado a ayudarte.",
              },
            ].map((feature, idx) => (
              <div key={idx} className="bg-white border border-slate-200 rounded-xl p-8">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-slate-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <div className="text-center">
              <div className="text-5xl font-bold text-blue-600 mb-3">10K+</div>
              <p className="text-slate-600 font-medium">Usuarios activos</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-blue-600 mb-3">50K+</div>
              <p className="text-slate-600 font-medium">Proyectos completados</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-blue-600 mb-3">4.9/5</div>
              <p className="text-slate-600 font-medium">Calificación promedio</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 border-t border-slate-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Comienza ahora
          </h2>
          <p className="text-slate-600 mb-8 text-sm">
            Únete a profesionales colaborando en proyectos exitosos.
          </p>
          {!session && (
            <Link
              href="/register"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-2.5 rounded-lg font-semibold transition text-sm"
            >
              Crear cuenta gratis
            </Link>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-700 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="text-white font-semibold mb-3 text-sm">Workana</h4>
              <p className="text-slate-400 text-xs">Plataforma de freelance moderna.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3 text-sm">Recursos</h4>
              <ul className="text-slate-400 text-xs space-y-1.5">
                <li><Link href="#" className="hover:text-blue-400 transition">Documentación</Link></li>
                <li><Link href="#" className="hover:text-blue-400 transition">Blog</Link></li>
                <li><Link href="#" className="hover:text-blue-400 transition">Soporte</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3 text-sm">Compañía</h4>
              <ul className="text-slate-400 text-xs space-y-1.5">
                <li><Link href="#" className="hover:text-blue-400 transition">Acerca de</Link></li>
                <li><Link href="#" className="hover:text-blue-400 transition">Términos</Link></li>
                <li><Link href="#" className="hover:text-blue-400 transition">Privacidad</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3 text-sm">Legal</h4>
              <ul className="text-slate-400 text-xs space-y-1.5">
                <li><Link href="#" className="hover:text-blue-400 transition">Términos</Link></li>
                <li><Link href="#" className="hover:text-blue-400 transition">Privacidad</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-700 pt-8 text-center text-slate-400 text-xs">
            <p>&copy; 2026 Workana. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
