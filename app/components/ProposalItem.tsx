"use client";

import Link from "next/link";

interface ProposalItemProps {
  id: string;
  title: string;
  status: "PENDING" | "ACCEPTED" | "REJECTED";
  bidAmount: number;
  createdAt: string;
  freelancer?: { id: string; name?: string; email: string; bio?: string };
  project?: { id: string; title: string };
  isFreelancer?: boolean;
}

const statusColors: Record<string, string> = {
  PENDING: "bg-yellow-100 text-yellow-800",
  ACCEPTED: "bg-green-100 text-green-800",
  REJECTED: "bg-red-100 text-red-800",
};

const statusLabels: Record<string, string> = {
  PENDING: "Pendiente",
  ACCEPTED: "Aceptada",
  REJECTED: "Rechazada",
};

export function ProposalItem({
  id,
  title,
  status,
  bidAmount,
  createdAt,
  freelancer,
  project,
  isFreelancer,
}: ProposalItemProps) {
  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900">{title}</h3>
            {project && (
              <p className="text-sm text-gray-600 mt-1">
                Proyecto: <strong>{project.title}</strong>
              </p>
            )}
            {freelancer && (
              <p className="text-sm text-gray-600 mt-1">
                De: <strong>{freelancer.name || freelancer.email}</strong>
              </p>
            )}
          </div>
          <span
            className={`px-3 py-1 rounded-full text-sm font-semibold ${statusColors[status]}`}
          >
            {statusLabels[status]}
          </span>
        </div>

        <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200">
          <span className="text-lg font-bold text-green-600">
            ${bidAmount.toLocaleString("en-US", { maximumFractionDigits: 2 })}
          </span>
          <span className="text-sm text-gray-500">
            {new Date(createdAt).toLocaleDateString("es-ES")}
          </span>
        </div>

        <div className="flex gap-2">
          <Link
            href={`/proposals/${id}`}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition text-center"
          >
            Ver Detalles
          </Link>
          {isFreelancer && status === "PENDING" && (
            <button
              onClick={async () => {
                if (confirm("¿Deseas retirar esta propuesta?")) {
                  try {
                    const res = await fetch(`/api/proposals/${id}`, {
                      method: "DELETE",
                    });
                    if (res.ok) {
                      window.location.reload();
                    }
                  } catch (err) {
                    alert("Error al retirar propuesta");
                  }
                }
              }}
              className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-semibold hover:bg-red-700 transition"
            >
              Retirar
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
