import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-sm shadow-sm">
        <nav className="mx-auto flex max-w-[1280px] items-center justify-between px-6 py-4 md:px-8 lg:px-10">
          <div className="flex items-center gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-3xl bg-gradient-to-br from-blue-600 to-sky-500 text-white shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
              <span className="text-lg font-semibold">W</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">Workana</p>
              <p className="text-xs text-slate-500">Plataforma freelance moderna</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            {session ? (
              <Link
                href="/profile"
                className="inline-flex min-h-[48px] items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-2 text-sm font-semibold text-slate-700 shadow-[0_20px_60px_rgba(15,23,42,0.06)] transition hover:border-blue-300 hover:text-blue-700"
              >
                Mi perfil
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  className="inline-flex min-h-[48px] items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-2 text-sm font-semibold text-slate-700 shadow-[0_20px_60px_rgba(15,23,42,0.06)] transition hover:border-blue-300 hover:text-blue-700"
                >
                  Iniciar sesión
                </Link>
                <Link
                  href="/register"
                  className="inline-flex min-h-[48px] items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-sky-500 px-5 py-2 text-sm font-semibold text-white shadow-[0_20px_60px_rgba(15,23,42,0.08)] transition hover:bg-blue-700"
                >
                  Comienza ahora
                </Link>
              </>
            )}
          </div>
        </nav>
      </header>

      <main className="mx-auto grid min-h-[92vh] max-w-[1280px] gap-16 px-6 py-12 md:grid-cols-[1.1fr_0.9fr] md:px-8 lg:px-10 xl:px-12">
        <section className="flex min-h-[calc(92vh-96px)] flex-col justify-center gap-12">
          <div className="space-y-6 max-w-3xl">
            <p className="inline-flex items-center rounded-full bg-sky-100 px-4 py-2 text-sm font-semibold text-sky-700 shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
              🎯 Conecta con profesionales reales
            </p>
            <div className="space-y-6">
              <h1 className="text-5xl font-bold tracking-tight text-slate-950 sm:text-6xl leading-tight">
                Conecta con <span className="text-blue-600">profesionales</span> y encuentra proyectos reales.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-600">
                La plataforma más confiable para descubrir talento, publicar proyectos y trabajar seguro desde cualquier lugar.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <Link
              href="/register"
              className="inline-flex min-h-[48px] items-center justify-center rounded-xl bg-blue-600 px-6 text-base font-semibold text-white shadow-[0_20px_60px_rgba(15,23,42,0.08)] transition hover:bg-blue-700"
            >
              Comienza ahora
            </Link>
            <Link
              href="/login"
              className="inline-flex min-h-[48px] items-center justify-center rounded-xl border border-slate-200 bg-white px-6 text-base font-semibold text-slate-800 shadow-[0_20px_60px_rgba(15,23,42,0.06)] transition hover:bg-slate-100"
            >
              Inicia sesión
            </Link>
          </div>
        </section>

        <section className="flex items-center justify-center">
          <div className="w-full overflow-hidden rounded-[24px] border border-slate-200 bg-gradient-to-br from-blue-600 via-sky-500 to-cyan-500 p-8 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
            <div className="grid gap-6">
              <div className="rounded-[24px] border border-white/10 bg-white/10 p-6 backdrop-blur-sm">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-[0.24em] text-sky-100/90">Workana</p>
                    <h2 className="mt-3 text-2xl font-semibold text-white">Tu espacio freelance</h2>
                  </div>
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 text-xl">
                    🤝
                  </div>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-[24px] bg-white/10 p-6">
                  <p className="text-sm uppercase tracking-[0.24em] text-sky-100/80">Proyectos</p>
                  <p className="mt-4 text-3xl font-semibold text-white">250+</p>
                </div>
                <div className="rounded-[24px] bg-white/10 p-6">
                  <p className="text-sm uppercase tracking-[0.24em] text-sky-100/80">Freelancers</p>
                  <p className="mt-4 text-3xl font-semibold text-white">8K+</p>
                </div>
              </div>

              <div className="rounded-[24px] bg-white/10 p-6">
                <p className="text-sm uppercase tracking-[0.24em] text-sky-100/80">Seguridad</p>
                <p className="mt-4 text-base leading-7 text-slate-100/90">
                  Contratos, pagos y comunicación protegidos en una sola plataforma.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
