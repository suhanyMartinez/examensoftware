"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ProjectCategory } from "@/app/generated/prisma";

interface ProjectFormProps {
  initialData?: {
    id: string;
    title: string;
    description: string;
    category: ProjectCategory;
    budget: number;
  };
  isEditing?: boolean;
}

const categoryOptions: { value: ProjectCategory; label: string }[] = [
  { value: "DESIGN", label: "🎨 Diseño" },
  { value: "DEVELOPMENT", label: "💻 Desarrollo" },
  { value: "MARKETING", label: "📢 Marketing" },
  { value: "WRITING", label: "✍️ Redacción" },
  { value: "VIDEO", label: "🎬 Video" },
  { value: "PHOTOGRAPHY", label: "📸 Fotografía" },
  { value: "CONSULTING", label: "💡 Consultoría" },
  { value: "OTHER", label: "📌 Otro" },
];

export function ProjectForm({ initialData, isEditing }: ProjectFormProps) {
  const router = useRouter();
  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [category, setCategory] = useState<ProjectCategory>(
    initialData?.category || "OTHER"
  );
  const [budget, setBudget] = useState(initialData?.budget.toString() || "");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!title || !description || !budget) {
      setError("Todos los campos son requeridos");
      return;
    }

    if (parseFloat(budget) <= 0) {
      setError("El presupuesto debe ser mayor a 0");
      return;
    }

    setLoading(true);

    try {
      const url = isEditing
        ? `/api/projects/${initialData?.id}`
        : "/api/projects";
      const method = isEditing ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          category,
          budget,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Error al guardar proyecto");
        return;
      }

      const project = await res.json();
      router.push(
        isEditing
          ? `/projects/${project.id}`
          : `/projects`
      );
    } catch (err) {
      setError("Error al guardar proyecto");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="title" className="block text-sm font-semibold text-gray-900 mb-2">
          Título del Proyecto
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition placeholder-gray-700 text-gray-900"
          placeholder="Ej: Diseño de logo profesional"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-semibold text-gray-900 mb-2">
          Descripción
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          rows={5}
          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition placeholder-gray-700 text-gray-900"
          placeholder="Describe tu proyecto en detalle..."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="category" className="block text-sm font-semibold text-gray-900 mb-2">
            Categoría
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value as ProjectCategory)}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition placeholder-gray-700 text-gray-900"
          >
            {categoryOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="budget" className="block text-sm font-semibold text-gray-900 mb-2">
            Presupuesto (USD)
          </label>
          <input
            id="budget"
            type="number"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            required
            step="0.01"
            min="0"
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition placeholder-gray-700 text-gray-900"
            placeholder="5000"
          />
        </div>
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:shadow-lg text-white font-semibold py-3 rounded-lg transition transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading
            ? isEditing
              ? "Actualizando..."
              : "Creando..."
            : isEditing
              ? "Actualizar Proyecto"
              : "Crear Proyecto"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="flex-1 border border-gray-300 text-gray-700 font-semibold py-3 rounded-lg transition hover:bg-gray-50"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
