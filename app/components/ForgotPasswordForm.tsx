"use client";

import { useState } from "react";
import Link from "next/link";

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // In a real app, you would send a password reset email here
      // For now, we'll just simulate it
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSent(true);
    } catch (err) {
      setError("Error al enviar el correo");
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div className="w-14 h-14 bg-gradient-to-br from-green-600 to-green-700 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white text-2xl">✓</span>
            </div>
          </div>

          {/* Card */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-green-600 to-green-700 px-8 py-8 text-white text-center">
              <h2 className="text-3xl font-bold">Correo Enviado</h2>
            </div>

            <div className="p-8 text-center">
              <p className="text-gray-600 mb-6">
                Hemos enviado instrucciones para restablecer tu contraseña a{" "}
                <strong className="text-gray-900">{email}</strong>. Por favor revisa tu correo.
              </p>
              <Link
                href="/login"
                className="inline-block bg-gradient-to-r from-blue-600 to-blue-700 hover:shadow-lg text-white font-semibold px-8 py-3 rounded-lg transition transform hover:scale-105"
              >
                Volver al Inicio de Sesión
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-2xl">W</span>
          </div>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-8 text-white">
            <h2 className="text-3xl font-bold">Recuperar Contraseña</h2>
            <p className="text-blue-100 mt-2">Vuelve a acceder a tu cuenta</p>
          </div>

          <div className="p-8">
            <p className="text-gray-600 text-center mb-6">
              Ingresa tu email y te enviaremos instrucciones para restablecer tu contraseña.
            </p>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition placeholder-gray-700 text-gray-900"
                  placeholder="tu@ejemplo.com"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:shadow-lg text-white font-semibold py-3 rounded-lg transition transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Enviando..." : "Enviar Instrucciones"}
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-gray-200 text-center text-sm">
              <Link href="/login" className="text-blue-600 hover:text-blue-700 font-semibold">
                Volver al inicio de sesión
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
