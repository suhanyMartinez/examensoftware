"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";

interface Proposal {
  id: string;
  title: string;
  description: string;
  bidAmount: number;
  status: "PENDING" | "ACCEPTED" | "REJECTED";
  createdAt: string;
  freelancerId: string;
  clientId: string;
  freelancer: { id: string; name?: string; email: string; bio?: string; location?: string };
  client: { id: string; name?: string; email: string };
  project: { id: string; title: string; description: string; budget: number; category: string };
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

export default function ProposalDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  const [proposal, setProposal] = useState<Proposal | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionLoading, setActionLoading] = useState(false);

  const id = params.id as string;

  useEffect(() => {
    const fetchProposal = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/proposals/${id}`);

        if (!res.ok) throw new Error("Proposal not found");

        const data = await res.json();
        setProposal(data);
      } catch (err) {
        setError("Error al cargar la propuesta");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProposal();
  }, [id]);

  const handleAccept = async () => {
    if (!confirm("¿Aceptar esta propuesta?")) return;

    setActionLoading(true);
    try {
      const res = await fetch(`/api/proposals/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "ACCEPTED" }),
      });

      if (!res.ok) throw new Error("Error accepting proposal");

      router.push("/proposals");
      router.refresh();
    } catch (err) {
      alert("Error al aceptar propuesta");
    } finally {
      setActionLoading(false);
    }
  };

  const handleReject = async () => {
    if (!confirm("¿Rechazar esta propuesta?")) return;

    setActionLoading(true);
    try {
      const res = await fetch(`/api/proposals/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "REJECTED" }),
      });

      if (!res.ok) throw new Error("Error rejecting proposal");

      router.push("/proposals");
      router.refresh();
    } catch (err) {
      alert("Error al rechazar propuesta");
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600">Cargando propuesta...</p>
        </div>
      </div>
    );
  }

  if (error || !proposal) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Error al cargar propuesta
          </h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <Link
            href="/proposals"
            className="text-blue-600 hover:text-blue-700 font-semibold"
          >
            Volver a propuestas
          </Link>
        </div>
      </div>
    );
  }

  const isClient = session?.user?.email === proposal.client.email;
  const isFreelancer = session?.user?.email === proposal.freelancer.email;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/proposals"
          className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold mb-6"
        >
          ← Volver a propuestas
        </Link>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-8 text-white">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-3xl font-bold">{proposal.title}</h1>
                <p className="text-blue-100 mt-2">Propuesta para: {proposal.project.title}</p>
              </div>
              <span
                className={`px-4 py-2 rounded-full text-sm font-semibold ${statusColors[proposal.status]}`}
              >
                {statusLabels[proposal.status]}
              </span>
            </div>
          </div>

          <div className="p-8">
            {/* Proposal Content */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                Descripción de la propuesta
              </h2>
              <p className="text-gray-700 whitespace-pre-wrap">
                {proposal.description}
              </p>
            </div>

            {/* Bid Amount */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
              <p className="text-sm text-gray-600 mb-2">Presupuesto propuesto</p>
              <p className="text-3xl font-bold text-green-600">
                ${proposal.bidAmount.toLocaleString("en-US", { maximumFractionDigits: 2 })}
              </p>
              {proposal.project.budget && (
                <p className="text-sm text-gray-600 mt-2">
                  Presupuesto del proyecto: ${proposal.project.budget.toLocaleString()}
                </p>
              )}
            </div>

            {/* Freelancer Info */}
            {isClient && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Información del freelancer</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Nombre</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {proposal.freelancer.name || proposal.freelancer.email}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {proposal.freelancer.email}
                    </p>
                  </div>
                  {proposal.freelancer.location && (
                    <div>
                      <p className="text-sm text-gray-600">Ubicación</p>
                      <p className="text-lg font-semibold text-gray-900">
                        {proposal.freelancer.location}
                      </p>
                    </div>
                  )}
                </div>
                {proposal.freelancer.bio && (
                  <div className="mt-4 pt-4 border-t border-blue-200">
                    <p className="text-sm text-gray-600 mb-2">Biografía</p>
                    <p className="text-gray-700">{proposal.freelancer.bio}</p>
                  </div>
                )}
              </div>
            )}

            {/* Project Info */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Detalles del proyecto</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Título</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {proposal.project.title}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Categoría</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {proposal.project.category}
                  </p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-600 mb-2">Descripción</p>
                <p className="text-gray-700 line-clamp-3">
                  {proposal.project.description}
                </p>
              </div>
            </div>

            {/* Actions */}
            {isClient && proposal.status === "PENDING" && (
              <div className="flex gap-3">
                <button
                  onClick={handleAccept}
                  disabled={actionLoading}
                  className="flex-1 bg-green-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {actionLoading ? "Procesando..." : "✅ Aceptar Propuesta"}
                </button>
                <button
                  onClick={handleReject}
                  disabled={actionLoading}
                  className="flex-1 bg-red-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {actionLoading ? "Procesando..." : "❌ Rechazar"}
                </button>
              </div>
            )}

            {/* Status Messages */}
            {proposal.status === "ACCEPTED" && (
              <div className="p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg">
                ✅ Esta propuesta ha sido aceptada. El proyecto está ahora cerrado.
              </div>
            )}

            {proposal.status === "REJECTED" && (
              <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
                ❌ Esta propuesta ha sido rechazada.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
