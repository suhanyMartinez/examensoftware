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

const statusColors: Record<ProjectStatus, string> = {
  ACTIVE: "bg-emerald-100 text-emerald-800",
  COMPLETED: "bg-sky-100 text-sky-800",
  CLOSED: "bg-slate-100 text-slate-700",
  CANCELLED: "bg-rose-100 text-rose-800",
};

const statusLabels: Record<ProjectStatus, string> = {
  ACTIVE: "Activo",
  COMPLETED: "Completado",
  CLOSED: "Cerrado",
  CANCELLED: "Cancelado",
};

export function ProjectBrowseCard({
  id,
  title,
  description,
  category,
  budget,
  status,
  client,
  hasProposal,
}: ProjectBrowseCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm transition hover:shadow-2xl">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500 opacity-90"></div>
      <div className="p-6 pt-8">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-3xl bg-slate-100 text-2xl">
              {categoryEmojis[category]}
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-slate-500 mb-1">
                {categoryLabels[category]}
              </p>
              <h3 className="text-xl font-semibold text-slate-900 leading-tight">
                {title}
              </h3>
            </div>
          </div>

          <span
            className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${statusColors[status]}`}
          >
            {statusLabels[status]}
          </span>
        </div>

        <p className="text-sm leading-6 text-slate-600 mb-6 line-clamp-3">
          {description}
        </p>

        <div className="grid gap-4 sm:grid-cols-[1fr_auto] items-center mb-6 border-y border-slate-200/80 py-4">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-slate-500 mb-1">
              Presupuesto
            </p>
            <p className="text-lg font-semibold text-slate-900">
              ${budget.toLocaleString()}
            </p>
          </div>
          <div className="text-sm text-slate-500">
            {client && (
              <>
                <p className="text-xs uppercase tracking-[0.22em] text-slate-400 mb-1">
                  Cliente
                </p>
                <p className="font-medium text-slate-700">{client.name || client.email}</p>
              </>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href={`/browse/projects/${id}`}
            className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/10 transition hover:from-blue-700 hover:to-cyan-600"
          >
            Ver Detalles
          </Link>

          {hasProposal && (
            <span className="inline-flex items-center justify-center rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
              Ya postulaste
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
