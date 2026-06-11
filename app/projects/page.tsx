"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ProjectCard } from "@/app/components/ProjectCard";
import { ProjectFilter } from "@/app/components/ProjectFilter";

interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  budget: number;
  status: string;
  clientId: string;
  client: {
    id: string;
    name?: string;
    email: string;
  };
}

export default function ProjectsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("ALL");
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
        const url = new URL("/api/projects", window.location.origin);
        if (selectedCategory !== "ALL") {
          url.searchParams.append("category", selectedCategory);
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
  }, [selectedCategory, session]);

  const handleDeleteProject = async (id: string) => {
    if (!confirm("¿Estás seguro de que deseas eliminar este proyecto?")) {
      return;
    }

    try {
      const res = await fetch(`/api/projects/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Error deleting project");

      setProjects(projects.filter((p) => p.id !== id));
    } catch (err) {
      alert("Error al eliminar proyecto");
      console.error(err);
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600">Cargando proyectos...</p>
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
          <div className="flex items-center justify-between mb-6">
            <div>
              <Link href="/profile" className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold mb-4">
                ← Volver
              </Link>
              <h1 className="text-4xl font-bold text-gray-900">Proyectos</h1>
              <p className="text-gray-600 mt-2">Gestiona todos tus proyectos</p>
            </div>
            <Link
              href="/projects/new"
              className="bg-gradient-to-r from-green-600 to-green-700 hover:shadow-lg text-white font-semibold px-6 py-3 rounded-lg transition transform hover:scale-105"
            >
              + Crear Proyecto
            </Link>
          </div>
        </div>

        {/* Filter */}
        <ProjectFilter
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        {/* Projects Grid */}
        <div className="mt-8">
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg mb-6">
              {error}
            </div>
          )}

          {projects.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📭</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                No hay proyectos
              </h2>
              <p className="text-gray-600 mb-6">
                {selectedCategory === "ALL"
                  ? "Crea tu primer proyecto para empezar"
                  : "No hay proyectos en esta categoría"}
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
                <ProjectCard
                  key={project.id}
                  {...project}
                  clientName={project.client.name || project.client.email}
                  isOwner={session?.user?.email === project.client.email}
                  onDelete={handleDeleteProject}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
