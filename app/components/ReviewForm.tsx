"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface ReviewFormProps {
  contractId: string;
  revieweeId: string;
  revieweeName?: string;
  onSuccess?: () => void;
}

export function ReviewForm({
  contractId,
  revieweeId,
  revieweeName,
  onSuccess,
}: ReviewFormProps) {
  const router = useRouter();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    setLoading(true);

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          rating,
          comment: comment || null,
          contractId,
          revieweeId,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Error al enviar calificación");
        return;
      }

      if (onSuccess) {
        onSuccess();
      }
      router.refresh();
    } catch (err) {
      setError("Error al enviar calificación");
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
          Evaluando a: <strong>{revieweeName || "Usuario"}</strong>
        </p>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-4">
          Calificación (1-5 estrellas)
        </label>
        <div className="flex gap-3">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              className={`text-4xl transition transform hover:scale-110 ${
                star <= rating ? "text-yellow-400" : "text-gray-300"
              }`}
            >
              ⭐
            </button>
          ))}
        </div>
        <p className="text-sm text-gray-600 mt-2">{rating} de 5 estrellas</p>
      </div>

      <div>
        <label htmlFor="comment" className="block text-sm font-semibold text-gray-900 mb-2">
          Comentario (opcional)
        </label>
        <textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={4}
          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition placeholder-gray-700 text-gray-900"
          placeholder="Comparte tu experiencia trabajando con esta persona..."
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:shadow-lg text-white font-semibold py-3 rounded-lg transition transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Enviando..." : "✅ Enviar Calificación"}
      </button>
    </form>
  );
}
