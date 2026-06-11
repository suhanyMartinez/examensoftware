"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { ContractChat } from "@/app/components/ContractChat";

interface Contract {
  id: string;
  title: string;
  description: string;
  amount: number;
  status: "ACTIVE" | "COMPLETED" | "CANCELLED" | "SUSPENDED";
  startDate: string;
  endDate?: string;
  client: { id: string; name?: string; email: string; phone?: string; bio?: string };
  freelancer: { id: string; name?: string; email: string; phone?: string; bio?: string };
  project: { id: string; title: string; description: string };
  proposal: { id: string; title: string; bidAmount: number };
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

export default function ContractDetailPage() {
  const params = useParams();
  const { data: session } = useSession();
  const [contract, setContract] = useState<Contract | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingStatus, setUpdatingStatus] = useState(false);

  const id = params.id as string;

  useEffect(() => {
    const fetchContract = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/contracts/${id}`);

        if (!res.ok) throw new Error("Contract not found");

        const data = await res.json();
        setContract(data);
      } catch (err) {
        setError("Error al cargar el contrato");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchContract();
  }, [id]);

  const handleStatusUpdate = async (newStatus: string) => {
    if (!confirm(`¿Cambiar estado a ${newStatus}?`)) return;

    setUpdatingStatus(true);
    try {
      const res = await fetch(`/api/contracts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        const data = await res.json();
        setContract(data);
      } else {
        alert("Error al actualizar contrato");
      }
    } catch (err) {
      alert("Error al actualizar contrato");
    } finally {
      setUpdatingStatus(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600">Cargando contrato...</p>
        </div>
      </div>
    );
  }

  if (error || !contract) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Error</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <Link
            href="/contracts"
            className="text-blue-600 hover:text-blue-700 font-semibold"
          >
            Volver a contratos
          </Link>
        </div>
      </div>
    );
  }

  const isClient = session?.user?.email === contract.client.email;
  const otherUser = isClient ? contract.freelancer : contract.client;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <Link
          href="/contracts"
          className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold mb-6"
        >
          ← Volver a contratos
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Contract Details */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-8 text-white">
                <div className="flex items-start justify-between">
                  <div>
                    <h1 className="text-3xl font-bold">{contract.title}</h1>
                    <p className="text-blue-100 mt-2">
                      Proyecto: {contract.project.title}
                    </p>
                  </div>
                  <span
                    className={`px-4 py-2 rounded-full text-sm font-semibold ${statusColors[contract.status]}`}
                  >
                    {statusLabels[contract.status]}
                  </span>
                </div>
              </div>

              <div className="p-8 space-y-6">
                {/* Description */}
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-3">
                    Descripción
                  </h2>
                  <p className="text-gray-700 whitespace-pre-wrap">
                    {contract.description}
                  </p>
                </div>

                {/* Amount */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <p className="text-sm text-gray-600 mb-2">Monto del Contrato</p>
                  <p className="text-3xl font-bold text-green-600">
                    ${contract.amount.toLocaleString("en-US", {
                      maximumFractionDigits: 2,
                    })}
                  </p>
                  <p className="text-sm text-gray-600 mt-2">
                    Iniciado: {new Date(contract.startDate).toLocaleDateString("es-ES")}
                  </p>
                </div>

                {/* Project Details */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">
                    Detalles del Proyecto
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Título</p>
                      <p className="text-lg font-semibold text-gray-900">
                        {contract.project.title}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-sm text-gray-600 mb-2">Descripción</p>
                    <p className="text-gray-700 line-clamp-3">
                      {contract.project.description}
                    </p>
                  </div>
                </div>

                {/* Status Actions */}
                {contract.status === "ACTIVE" && (
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleStatusUpdate("COMPLETED")}
                      disabled={updatingStatus}
                      className="flex-1 bg-green-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {updatingStatus ? "..." : "✅ Marcar Completado"}
                    </button>
                    <button
                      onClick={() => handleStatusUpdate("SUSPENDED")}
                      disabled={updatingStatus}
                      className="flex-1 bg-yellow-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-yellow-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {updatingStatus ? "..." : "⏸️ Suspender"}
                    </button>
                    <button
                      onClick={() => handleStatusUpdate("CANCELLED")}
                      disabled={updatingStatus}
                      className="flex-1 bg-red-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {updatingStatus ? "..." : "❌ Cancelar"}
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Chat */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                💬 Conversación
              </h2>
              <ContractChat
                contractId={contract.id}
                otherUserId={otherUser.id}
                otherUserName={otherUser.name}
                otherUserEmail={otherUser.email}
              />
            </div>
          </div>

          {/* Sidebar - Parties */}
          <div className="space-y-6">
            {/* Client */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">👤 Cliente</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Nombre</p>
                  <p className="font-semibold text-gray-900">
                    {contract.client.name || contract.client.email}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-semibold text-gray-900">
                    {contract.client.email}
                  </p>
                </div>
                {contract.client.phone && (
                  <div>
                    <p className="text-sm text-gray-600">Teléfono</p>
                    <p className="font-semibold text-gray-900">
                      {contract.client.phone}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Freelancer */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">⭐ Freelancer</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Nombre</p>
                  <p className="font-semibold text-gray-900">
                    {contract.freelancer.name || contract.freelancer.email}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-semibold text-gray-900">
                    {contract.freelancer.email}
                  </p>
                </div>
                {contract.freelancer.phone && (
                  <div>
                    <p className="text-sm text-gray-600">Teléfono</p>
                    <p className="font-semibold text-gray-900">
                      {contract.freelancer.phone}
                    </p>
                  </div>
                )}
                {contract.freelancer.bio && (
                  <div>
                    <p className="text-sm text-gray-600">Acerca de</p>
                    <p className="text-sm text-gray-700">
                      {contract.freelancer.bio}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
