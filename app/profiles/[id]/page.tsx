"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ReviewList } from "@/app/components/ReviewList";

interface User {
  id: string;
  name?: string;
  email: string;
  bio?: string;
  location?: string;
  role: string;
  rating: number;
  reviewCount: number;
}

interface Review {
  id: string;
  rating: number;
  comment?: string;
  createdAt: string;
  reviewer: { id: string; name?: string; email: string; image?: string };
}

export default function PublicProfilePage() {
  const params = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const userId = params.id as string;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch user
        const userRes = await fetch(`/api/users/${userId}`);
        if (!userRes.ok) throw new Error("User not found");
        const userData = await userRes.json();
        setUser(userData);

        // Fetch reviews
        const reviewsRes = await fetch(
          `/api/reviews?userId=${userId}`
        );
        if (reviewsRes.ok) {
          const reviewsData = await reviewsRes.json();
          setReviews(reviewsData);
        }
      } catch (err) {
        setError("Error al cargar perfil");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600">Cargando perfil...</p>
        </div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Perfil no encontrado
          </h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <Link
            href="/"
            className="text-blue-600 hover:text-blue-700 font-semibold"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  const roleLabel = user.role === "FREELANCER" ? "Freelancer" : "Cliente";

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold mb-6"
        >
          ← Volver
        </Link>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header Background */}
          <div className="h-32 bg-gradient-to-r from-blue-600 to-blue-700"></div>

          {/* Profile Content */}
          <div className="px-8 py-8 -mt-16 relative z-10">
            <div className="flex flex-col md:flex-row md:items-start gap-6 mb-8">
              {/* Avatar */}
              <div className="flex-shrink-0">
                <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white text-5xl font-bold shadow-lg border-4 border-white">
                  {user.name
                    ?.split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase() || "U"}
                </div>
              </div>

              {/* Info */}
              <div className="flex-grow pt-4">
                <h1 className="text-4xl font-bold text-gray-900 mb-2">
                  {user.name || user.email}
                </h1>
                <p className="text-lg text-gray-600 mb-3">{user.email}</p>
                <span className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-lg font-semibold">
                  {roleLabel}
                </span>

                {/* Rating Badge */}
                <div className="mt-4 flex items-center gap-3">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className={`text-2xl ${
                          star <= Math.round(user.rating)
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                      >
                        ⭐
                      </span>
                    ))}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">
                      {user.rating.toFixed(1)}
                    </p>
                    <p className="text-sm text-gray-600">
                      ({user.reviewCount} calificaciones)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bio */}
            {user.bio && (
              <div className="border-t border-gray-200 pt-8 mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-3">
                  Acerca de
                </h2>
                <p className="text-gray-700">{user.bio}</p>
              </div>
            )}

            {/* Location */}
            {user.location && (
              <div className="mb-8">
                <p className="text-sm text-gray-600">📍 Ubicación</p>
                <p className="font-semibold text-gray-900">{user.location}</p>
              </div>
            )}

            {/* Reviews */}
            <div className="border-t border-gray-200 pt-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Calificaciones
              </h2>
              <ReviewList
                reviews={reviews}
                userRating={user.rating}
                reviewCount={user.reviewCount}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
