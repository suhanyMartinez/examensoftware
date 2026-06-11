"use client";

import { ProjectCategory } from "@prisma/client";

interface ProjectFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const categories: { value: string; label: string; emoji: string }[] = [
  { value: "ALL", label: "Todas", emoji: "📋" },
  { value: "DESIGN", label: "Diseño", emoji: "🎨" },
  { value: "DEVELOPMENT", label: "Desarrollo", emoji: "💻" },
  { value: "MARKETING", label: "Marketing", emoji: "📢" },
  { value: "WRITING", label: "Redacción", emoji: "✍️" },
  { value: "VIDEO", label: "Video", emoji: "🎬" },
  { value: "PHOTOGRAPHY", label: "Fotografía", emoji: "📸" },
  { value: "CONSULTING", label: "Consultoría", emoji: "💡" },
  { value: "OTHER", label: "Otro", emoji: "📌" },
];

export function ProjectFilter({
  selectedCategory,
  onCategoryChange,
}: ProjectFilterProps) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Filtrar por Categoría</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => onCategoryChange(cat.value)}
            className={`p-3 rounded-lg text-sm font-semibold transition ${
              selectedCategory === cat.value
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <span className="mr-2">{cat.emoji}</span>
            {cat.label}
          </button>
        ))}
      </div>
    </div>
  );
}
