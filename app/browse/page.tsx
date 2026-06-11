"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ProjectBrowseCard } from "@/app/components/ProjectBrowseCard";

interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  budget: number;
  status: string;
  client: { id: string; name?: string; email: string };
  proposals: Array<{ id: string; status: string }>;
}

const categoryOptions = [
  { value: "ALL", label: "Todas las categorías" },
  { value: "DESIGN", label: "🎨 Diseño" },
  { value: "DEVELOPMENT", label: "💻 Desarrollo" },
  { value: "MARKETING", label: "📢 Marketing" },
  { value: "WRITING", label: "✍️ Redacción" },
  { value: "VIDEO", label: "🎬 Video" },
  { value: "PHOTOGRAPHY", label: "📸 Fotografía" },
  { value: "CONSULTING", label: "💡 Consultoría" },
  { value: "OTHER", label: "📌 Otro" },
];

export default function BrowseProjectsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const url = new URL("/api/browse/projects", window.location.origin);

        if (selectedCategory !== "ALL") {
          url.searchParams.append("category", selectedCategory);
        }
        if (search) {
          url.searchParams.append("search", search);
        }

        const res = await fetch(url.toString());
        if (!res.ok) throw new Error("Error fetching projects");

        const data = await res.json();
        setProjects(data);
        setError("");
      } catch (err) {
        setError("Error al cargar proyectos");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (session) {
      fetchProjects();
    }
  }, [selectedCategory, search, session]);

  if (status === "loading" || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600">Buscando proyectos...</p>
        </div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/profile"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold mb-4"
          >
            ← Volver
          </Link>
          <h1 className="text-4xl font-bold text-gray-900">Explorar Proyectos</h1>
          <p className="text-gray-600 mt-2">Encuentra los proyectos perfectos para ti</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="category" className="block text-sm font-semibold text-gray-900 mb-2">
                Categoría
              </label>
              <select
                id="category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-gray-900 bg-white font-medium"
              >
                {categoryOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="search" className="block text-sm font-semibold text-gray-900 mb-2">
                Buscar proyectos
              </label>
              <input
                id="search"
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Busca por título o descripción..."
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition placeholder-gray-700 text-gray-900"
              />
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="mt-8">
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg mb-6">
              {error}
            </div>
          )}

          {projects.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                No hay proyectos disponibles
              </h2>
              <p className="text-gray-600 mb-6">
                {selectedCategory === "ALL"
                  ? "Intenta más tarde, nuevos proyectos se agregan constantemente"
                  : "No hay proyectos en esta categoría. Prueba otra"}
              </p>
              {selectedCategory !== "ALL" && (
                <button
                  onClick={() => setSelectedCategory("ALL")}
                  className="text-blue-600 hover:text-blue-700 font-semibold"
                >
                  Ver todos los proyectos
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <ProjectBrowseCard
                  key={project.id}
                  {...project}
                  hasProposal={project.proposals.length > 0}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
