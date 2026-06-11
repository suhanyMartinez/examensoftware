"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ProposalItem } from "@/app/components/ProposalItem";

interface Proposal {
  id: string;
  title: string;
  description: string;
  bidAmount: number;
  status: "PENDING" | "ACCEPTED" | "REJECTED";
  createdAt: string;
  freelancerId: string;
  clientId: string;
  freelancer?: { id: string; name?: string; email: string; bio?: string };
  client?: { id: string; name?: string; email: string };
  project?: { id: string; title: string };
}

export default function ProposalsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [tab, setTab] = useState<"sent" | "received">("sent");
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  useEffect(() => {
    const fetchProposals = async () => {
      try {
        setLoading(true);
        const url = new URL("/api/proposals", window.location.origin);
        url.searchParams.append("type", tab);

        const res = await fetch(url.toString());
        if (!res.ok) throw new Error("Error fetching proposals");

        const data = await res.json();
        setProposals(data);
        setError("");
      } catch (err) {
        setError("Error al cargar propuestas");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (session) {
      fetchProposals();
    }
  }, [tab, session]);

  if (status === "loading" || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600">Cargando propuestas...</p>
        </div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/profile"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold mb-4"
          >
            ← Volver
          </Link>
          <h1 className="text-4xl font-bold text-gray-900">Propuestas</h1>
          <p className="text-gray-600 mt-2">Gestiona tus propuestas</p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-md mb-8 border border-gray-200">
          <div className="flex">
            <button
              onClick={() => setTab("sent")}
              className={`flex-1 py-4 px-6 font-semibold transition border-b-2 ${
                tab === "sent"
                  ? "text-blue-600 border-blue-600 bg-blue-50"
                  : "text-gray-600 border-transparent hover:text-gray-900"
              }`}
            >
              📤 Propuestas Enviadas
            </button>
            <button
              onClick={() => setTab("received")}
              className={`flex-1 py-4 px-6 font-semibold transition border-b-2 ${
                tab === "received"
                  ? "text-blue-600 border-blue-600 bg-blue-50"
                  : "text-gray-600 border-transparent hover:text-gray-900"
              }`}
            >
              📥 Propuestas Recibidas
            </button>
          </div>
        </div>

        {/* Content */}
        <div>
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg mb-6">
              {error}
            </div>
          )}

          {proposals.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl shadow-md">
              <div className="text-6xl mb-4">
                {tab === "sent" ? "📤" : "📥"}
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {tab === "sent"
                  ? "No has enviado propuestas"
                  : "No has recibido propuestas"}
              </h2>
              <p className="text-gray-600 mb-6">
                {tab === "sent"
                  ? "Explora proyectos y envía tus primeras propuestas"
                  : "Cuando los freelancers envíen propuestas, aparecerán aquí"}
              </p>
              {tab === "sent" && (
                <Link
                  href="/browse"
                  className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                  Explorar Proyectos
                </Link>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {proposals.map((proposal) => (
                <ProposalItem
                  key={proposal.id}
                  {...proposal}
                  isFreelancer={tab === "sent"}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
