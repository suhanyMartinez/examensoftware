"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Email o contraseña inválidos");
      } else if (result?.ok) {
        // Redirect to home after successful login
        window.location.href = "/";
      }
    } catch (err) {
      setError("Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="w-14 h-14 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-2xl">W</span>
          </div>
        </div>

        {/* Card */}
        <div className="bg-slate-800 border border-slate-700 rounded-xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-8">
            <h2 className="text-3xl font-bold text-white">Bienvenido</h2>
            <p className="text-blue-100 mt-2">Inicia sesión en tu cuenta</p>
          </div>

          <div className="p-10">
            {error && (
              <div className="mb-8 p-4 bg-red-900/30 border border-red-700 text-red-300 rounded-lg text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-slate-100 mb-2">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-slate-100 placeholder-slate-400"
                  placeholder="tu@ejemplo.com"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-slate-100 mb-2">
                  Contraseña
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-slate-100 placeholder-slate-400"
                  placeholder="••••••••"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Cargando..." : "Iniciar Sesión"}
              </button>
            </form>

            <div className="mt-8 pt-8 border-t border-slate-700 space-y-4 text-sm">
              <Link
                href="/forgot-password"
                className="block text-center text-blue-400 hover:text-blue-300 font-medium transition py-2"
              >
                ¿Olvidaste tu contraseña?
              </Link>
              <p className="text-slate-400 text-center py-2">
                ¿No tienes cuenta?{" "}
                <Link href="/register" className="text-blue-400 hover:text-blue-300 font-semibold">
                  Regístrate aquí
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
