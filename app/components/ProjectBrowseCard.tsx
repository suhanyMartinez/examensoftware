"use client";

import Link from "next/link";
import { ProjectCategory, ProjectStatus } from "@/app/generated/prisma";

interface ProjectBrowseCardProps {
  id: string;
  title: string;
  description: string;
  category: ProjectCategory;
  budget: number;
  status: ProjectStatus;
  client?: { id: string; name?: string; email: string };
  proposals?: Array<{ id: string; status: string }>;
  hasProposal?: boolean;
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

export function ProjectBrowseCard({
  id,
  title,
  description,
  category,
  budget,
  client,
  hasProposal,
}: ProjectBrowseCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition overflow-hidden border border-gray-200">
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">{categoryEmojis[category]}</span>
              {hasProposal && (
                <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                  Ya postulaste
                </span>
              )}
            </div>
            <h3 className="text-lg font-bold text-gray-900">{title}</h3>
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {description}
        </p>

        <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200">
          <span className="inline-block px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs font-medium">
            {categoryLabels[category]}
          </span>
          <span className="text-lg font-bold text-green-600">
            ${budget.toLocaleString()}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">
            {client && <p>Por: {client.name || client.email}</p>}
          </div>

          <Link
            href={`/browse/projects/${id}`}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition"
          >
            Ver Detalles
          </Link>
        </div>
      </div>
    </div>
  );
}
