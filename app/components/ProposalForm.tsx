"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface ProposalFormProps {
  projectId: string;
  projectTitle: string;
}

export function ProposalForm({ projectId, projectTitle }: ProposalFormProps) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [bidAmount, setBidAmount] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!title || !description || !bidAmount) {
      setError("Todos los campos son requeridos");
      return;
    }

    if (parseFloat(bidAmount) <= 0) {
      setError("El presupuesto debe ser mayor a 0");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/proposals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          bidAmount,
          projectId,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Error al enviar propuesta");
        return;
      }

      router.push("/proposals");
      router.refresh();
    } catch (err) {
      setError("Error al enviar propuesta");
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

      <div className="bg-blue-50 p-4 rounded-lg">
        <p className="text-sm text-gray-600">
          Proyecto: <strong>{projectTitle}</strong>
        </p>
      </div>

      <div>
        <label htmlFor="title" className="block text-sm font-semibold text-gray-900 mb-2">
          Título de tu propuesta
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition placeholder-gray-700 text-gray-900"
          placeholder="Ej: Desarrollo web moderno con React"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-semibold text-gray-900 mb-2">
          Descripción de tu propuesta
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          rows={5}
          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition placeholder-gray-700 text-gray-900"
          placeholder="Explica por qué eres la mejor opción para este proyecto..."
        />
      </div>

      <div>
        <label htmlFor="bidAmount" className="block text-sm font-semibold text-gray-900 mb-2">
          Tu presupuesto propuesto (USD)
        </label>
        <input
          id="bidAmount"
          type="number"
          value={bidAmount}
          onChange={(e) => setBidAmount(e.target.value)}
          required
          step="0.01"
          min="0"
          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition placeholder-gray-700 text-gray-900"
          placeholder="1000"
        />
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:shadow-lg text-white font-semibold py-3 rounded-lg transition transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Enviando..." : "Enviar Propuesta"}
        </button>
        <button
          type="button"
          onClick={() => window.history.back()}
          className="flex-1 border border-gray-300 text-gray-700 font-semibold py-3 rounded-lg transition hover:bg-gray-50"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
