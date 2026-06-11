"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";

interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  budget: number;
  status: string;
  clientId: string;
  createdAt: string;
  client: {
    id: string;
    name?: string;
    email: string;
  };
}

const categoryEmojis: Record<string, string> = {
  DESIGN: "🎨",
  DEVELOPMENT: "💻",
  MARKETING: "📢",
  WRITING: "✍️",
  VIDEO: "🎬",
  PHOTOGRAPHY: "📸",
  CONSULTING: "💡",
  OTHER: "📌",
};

const categoryLabels: Record<string, string> = {
  DESIGN: "Diseño",
  DEVELOPMENT: "Desarrollo",
  MARKETING: "Marketing",
  WRITING: "Redacción",
  VIDEO: "Video",
  PHOTOGRAPHY: "Fotografía",
  CONSULTING: "Consultoría",
  OTHER: "Otro",
};

const statusColors: Record<string, string> = {
  ACTIVE: "bg-green-100 text-green-800",
  COMPLETED: "bg-blue-100 text-blue-800",
  CLOSED: "bg-gray-100 text-gray-800",
  CANCELLED: "bg-red-100 text-red-800",
};

const statusLabels: Record<string, string> = {
  ACTIVE: "Activo",
  COMPLETED: "Completado",
  CLOSED: "Cerrado",
  CANCELLED: "Cancelado",
};

export default function ProjectPage() {
  const params = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const id = params.id as string;

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/projects/${id}`);

        if (!res.ok) throw new Error("Project not found");

        const data = await res.json();
        setProject(data);
      } catch (err) {
        setError("Error al cargar el proyecto");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  const isOwner = session?.user?.email === project?.client.email;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600">Cargando proyecto...</p>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Error al cargar proyecto
          </h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <Link
            href="/projects"
            className="text-blue-600 hover:text-blue-700 font-semibold"
          >
            Volver a proyectos
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/projects"
          className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold mb-6"
        >
          ← Volver a Proyectos
        </Link>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-8 text-white">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-4xl">
                    {categoryEmojis[project.category]}
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${statusColors[project.status]}`}
                  >
                    {statusLabels[project.status]}
                  </span>
                </div>
                <h1 className="text-3xl font-bold">{project.title}</h1>
              </div>
              {isOwner && (
                <Link
                  href={`/projects/${project.id}/edit`}
                  className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition"
                >
                  Editar
                </Link>
              )}
            </div>
          </div>

          <div className="p-8">
            {/* Description */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                Descripción
              </h2>
              <p className="text-gray-700 whitespace-pre-wrap">
                {project.description}
              </p>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 pb-8 border-b border-gray-200">
              <div>
                <p className="text-sm text-gray-600 font-medium mb-2">
                  Categoría
                </p>
                <p className="text-lg font-semibold text-gray-900">
                  {categoryLabels[project.category]}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-600 font-medium mb-2">
                  Presupuesto
                </p>
                <p className="text-lg font-bold text-green-600">
                  ${project.budget.toLocaleString()}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-600 font-medium mb-2">
                  Cliente
                </p>
                <p className="text-lg font-semibold text-gray-900">
                  {project.client.name || project.client.email}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-600 font-medium mb-2">
                  Publicado
                </p>
                <p className="text-lg font-semibold text-gray-900">
                  {new Date(project.createdAt).toLocaleDateString("es-ES")}
                </p>
              </div>
            </div>

            {/* Actions */}
            {isOwner && (
              <div className="flex gap-3">
                <Link
                  href={`/projects/${project.id}/edit`}
                  className="flex-1 bg-blue-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-blue-700 transition text-center"
                >
                  Editar Proyecto
                </Link>
                <button
                  onClick={async () => {
                    if (
                      confirm(
                        "¿Estás seguro de que deseas eliminar este proyecto?"
                      )
                    ) {
                      try {
                        const res = await fetch(`/api/projects/${project.id}`, {
                          method: "DELETE",
                        });
                        if (res.ok) {
                          router.push("/projects");
                        } else {
                          alert("Error al eliminar proyecto");
                        }
                      } catch (err) {
                        alert("Error al eliminar proyecto");
                      }
                    }
                  }}
                  className="flex-1 bg-red-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-red-700 transition"
                >
                  Eliminar Proyecto
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
