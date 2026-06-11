"use client";

import Link from "next/link";

interface ContractItemProps {
  id: string;
  title: string;
  amount: number;
  status: "ACTIVE" | "COMPLETED" | "CANCELLED" | "SUSPENDED";
  startDate: string;
  client?: { id: string; name?: string; email: string };
  freelancer?: { id: string; name?: string; email: string };
  project?: { id: string; title: string };
}

const statusColors: Record<string, string> = {
  ACTIVE: "bg-green-100 text-green-800",
  COMPLETED: "bg-blue-100 text-blue-800",
  CANCELLED: "bg-red-100 text-red-800",
  SUSPENDED: "bg-yellow-100 text-yellow-800",
};

const statusLabels: Record<string, string> = {
  ACTIVE: "Activo",
  COMPLETED: "Completado",
  CANCELLED: "Cancelado",
  SUSPENDED: "Suspendido",
};

export function ContractItem({
  id,
  title,
  amount,
  status,
  startDate,
  client,
  freelancer,
  project,
}: ContractItemProps) {
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
            <p className="text-sm text-gray-600 mt-1">
              {client && freelancer && (
                <>
                  {client.name || client.email} ↔ {freelancer.name || freelancer.email}
                </>
              )}
            </p>
          </div>
          <span
            className={`px-3 py-1 rounded-full text-sm font-semibold ${statusColors[status]}`}
          >
            {statusLabels[status]}
          </span>
        </div>

        <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200">
          <span className="text-lg font-bold text-green-600">
            ${amount.toLocaleString("en-US", { maximumFractionDigits: 2 })}
          </span>
          <span className="text-sm text-gray-500">
            Iniciado: {new Date(startDate).toLocaleDateString("es-ES")}
          </span>
        </div>

        <Link
          href={`/contracts/${id}`}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition text-center block"
        >
          Ver Detalles y Chat
        </Link>
      </div>
    </div>
  );
}
