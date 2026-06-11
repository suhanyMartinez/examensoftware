"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ProjectBrowseCard } from "@/app/components/ProjectBrowseCard";
import { ProjectCategory, ProjectStatus } from "@/app/generated/prisma";

interface Project {
  id: string;
  title: string;
  description: string;
  category: ProjectCategory;
  budget: number;
  status: ProjectStatus;
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
        if (selectedCategory !== "ALL") url.searchParams.append("category", selectedCategory);
        if (search) url.searchParams.append("search", search);

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

    if (session) fetchProjects();
  }, [selectedCategory, search, session]);

  if (status === "loading" || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4" />
          <p className="text-slate-500 text-sm font-medium">Buscando proyectos...</p>
        </div>
      </div>
    );
  }

  if (status === "unauthenticated") return null;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top bar */}
      <div className="bg-white border-b border-slate-200 px-4 sm:px-8 py-4 flex items-center justify-between sticky top-0 z-10">
        <Link
          href="/profile"
          className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-blue-600 font-medium transition-colors"
        >
          ← Volver al perfil
        </Link>
        <span className="text-sm text-slate-400 font-medium">
          {projects.length} proyecto{projects.length !== 1 ? "s" : ""} encontrado{projects.length !== 1 ? "s" : ""}
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Page header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            Explora proyectos
          </h1>
          <p className="mt-2 text-slate-500 text-base max-w-xl">
            Filtra por categoría o palabras clave para encontrar oportunidades que se ajusten a tu perfil.
          </p>
        </div>

        {/* Filters card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-8 shadow-sm">
          {/* Search + select row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div>
              <label htmlFor="search" className="block text-sm font-semibold text-slate-700 mb-1.5">
                Buscar
              </label>
              <input
                id="search"
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Título, descripción o cliente..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:bg-white"
              />
            </div>
            <div>
              <label htmlFor="category" className="block text-sm font-semibold text-slate-700 mb-1.5">
                Categoría
              </label>
              <select
                id="category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:bg-white"
              >
                {categoryOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Category pills */}
          <div className="flex flex-wrap gap-2">
            {categoryOptions.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setSelectedCategory(opt.value)}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${
                  selectedCategory === opt.value
                    ? "bg-blue-600 text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl">
            {error}
          </div>
        )}

        {/* Results header */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between mb-5">
          <div className="flex items-center gap-2 flex-wrap">
            {selectedCategory !== "ALL" && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 border border-blue-200 px-3 py-1 text-xs font-semibold text-blue-700">
                {categoryOptions.find((o) => o.value === selectedCategory)?.label}
                <button
                  onClick={() => setSelectedCategory("ALL")}
                  className="ml-0.5 text-blue-400 hover:text-blue-700"
                  aria-label="Quitar filtro"
                >
                  ×
                </button>
              </span>
            )}
            {search && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600">
                "{search}"
                <button
                  onClick={() => setSearch("")}
                  className="ml-0.5 text-slate-400 hover:text-slate-700"
                  aria-label="Limpiar búsqueda"
                >
                  ×
                </button>
              </span>
            )}
          </div>
          <div className="flex gap-2 text-xs text-slate-500">
            <span className="rounded-full bg-white border border-slate-200 px-3 py-1.5 font-medium">Más reciente</span>
            <span className="rounded-full bg-white border border-slate-200 px-3 py-1.5 font-medium">Relevancia</span>
          </div>
        </div>

        {/* Projects grid / empty state */}
        {projects.length === 0 ? (
          <div className="text-center py-20 rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="text-5xl mb-4">🔍</div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">No hay proyectos disponibles</h2>
            <p className="text-slate-500 text-sm mb-6 max-w-xs mx-auto">
              {selectedCategory === "ALL"
                ? "Intenta más tarde, nuevos proyectos se agregan constantemente."
                : "No hay proyectos en esta categoría. Prueba otra o restablece el filtro."}
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <button
                onClick={() => { setSelectedCategory("ALL"); setSearch(""); }}
                className="rounded-full bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Ver todos los proyectos
              </button>
              <button
                onClick={() => setSearch("")}
                className="rounded-full border border-slate-200 bg-white px-6 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Limpiar búsqueda
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
  );
}
