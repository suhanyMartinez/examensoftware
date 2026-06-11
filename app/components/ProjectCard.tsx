"use client";

import Link from "next/link";
import { ProjectCategory, ProjectStatus } from "@/app/generated/prisma";

interface ProjectCardProps {
  id: string;
  title: string;
  description: string;
  category: ProjectCategory;
  budget: number;
  status: ProjectStatus;
  clientName?: string;
  isOwner?: boolean;
  onDelete?: (id: string) => void;
}

const categoryEmojis: Record<ProjectCategory, string> = {
  DESIGN: "🎨",
  DEVELOPMENT: "💻",
  MARKETING: "📢",
  WRITING: "✍️",
  VIDEO: "🎬",
  PHOTOGRAPHY: "📸",
  CONSULTING: "💡",
  OTHER: "📌",
};

const statusColors: Record<ProjectStatus, string> = {
  ACTIVE: "bg-green-100 text-green-800",
  COMPLETED: "bg-blue-100 text-blue-800",
  CLOSED: "bg-gray-100 text-gray-800",
  CANCELLED: "bg-red-100 text-red-800",
};

const categoryLabels: Record<ProjectCategory, string> = {
  DESIGN: "Diseño",
  DEVELOPMENT: "Desarrollo",
  MARKETING: "Marketing",
  WRITING: "Redacción",
  VIDEO: "Video",
  PHOTOGRAPHY: "Fotografía",
  CONSULTING: "Consultoría",
  OTHER: "Otro",
};

const statusLabels: Record<ProjectStatus, string> = {
  ACTIVE: "Activo",
  COMPLETED: "Completado",
  CLOSED: "Cerrado",
  CANCELLED: "Cancelado",
};

export function ProjectCard({
  id,
  title,
  description,
  category,
  budget,
  status,
  clientName,
  isOwner,
  onDelete,
}: ProjectCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition overflow-hidden border border-gray-200">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">{categoryEmojis[category]}</span>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[status]}`}>
                {statusLabels[status]}
              </span>
            </div>
            <h3 className="text-xl font-bold text-gray-900">{title}</h3>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {description}
        </p>

        {/* Category and Budget */}
        <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200">
          <span className="inline-block px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs font-medium">
            {categoryLabels[category]}
          </span>
          <span className="text-lg font-bold text-green-600">
            ${budget.toLocaleString()}
          </span>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">
            {clientName && <p>Por: {clientName}</p>}
          </div>

          <div className="flex gap-2">
            <Link
              href={`/projects/${id}`}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition"
            >
              Ver
            </Link>

            {isOwner && (
              <>
                <Link
                  href={`/projects/${id}/edit`}
                  className="px-4 py-2 bg-yellow-600 text-white rounded-lg text-sm font-semibold hover:bg-yellow-700 transition"
                >
                  Editar
                </Link>
                <button
                  onClick={() => onDelete?.(id)}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-semibold hover:bg-red-700 transition"
                >
                  Eliminar
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
