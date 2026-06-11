"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";

export function ProfileContent() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-white">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600 font-medium">Cargando perfil...</p>
        </div>
      </div>
    );
  }

  if (!session?.user) {
    return null;
  }

  const handleSignOut = async () => {
    await signOut({ redirect: true, callbackUrl: "/" });
  };

  const initials = session.user.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase() || "U";

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-8">
        <Link
          href="/"
          className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold mb-6"
        >
          ← Volver al inicio
        </Link>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header Background */}
          <div className="h-32 bg-gradient-to-r from-blue-600 to-blue-700"></div>

          {/* Profile Content */}
          <div className="px-8 py-8 -mt-16 relative z-10">
            <div className="flex flex-col md:flex-row md:items-start gap-6 mb-8">
              {/* Avatar */}
              <div className="flex-shrink-0">
                <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white text-5xl font-bold shadow-lg border-4 border-white">
                  {initials}
                </div>
              </div>

              {/* Info */}
              <div className="flex-grow pt-4">
                <h1 className="text-4xl font-bold text-gray-900 mb-2">
                  {session.user.name || "Usuario"}
                </h1>
                <p className="text-lg text-gray-600 mb-6">{session.user.email}</p>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => router.push("/profile/edit")}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition transform hover:scale-105 shadow-md"
                  >
                    ✏️ Editar Perfil
                  </button>
                  <button
                    onClick={handleSignOut}
                    className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded-lg transition transform hover:scale-105 shadow-md"
                  >
                    🚪 Cerrar Sesión
                  </button>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="border-t border-gray-200 pt-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Información del Perfil</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-xl p-6">
                  <p className="text-sm text-gray-600 font-medium mb-2">Nombre Completo</p>
                  <p className="text-xl font-semibold text-gray-900">
                    {session.user.name || "No especificado"}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-xl p-6">
                  <p className="text-sm text-gray-600 font-medium mb-2">Email</p>
                  <p className="text-xl font-semibold text-gray-900">
                    {session.user.email}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
