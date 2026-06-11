"use client";

interface Review {
  id: string;
  rating: number;
  comment?: string;
  createdAt: string;
  reviewer: { id: string; name?: string; email: string; image?: string };
}

interface ReviewListProps {
  reviews: Review[];
  userRating: number;
  reviewCount: number;
}

export function ReviewList({
  reviews,
  userRating,
  reviewCount,
}: ReviewListProps) {
  return (
    <div className="space-y-6">
      {/* Rating Summary */}
      <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-6 border border-yellow-200">
        <div className="flex items-center gap-4">
          <div>
            <p className="text-4xl font-bold text-yellow-600">{userRating.toFixed(1)}</p>
            <p className="text-sm text-gray-600">{reviewCount} calificaciones</p>
          </div>
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`text-2xl ${
                  star <= Math.round(userRating)
                    ? "text-yellow-400"
                    : "text-gray-300"
                }`}
              >
                ⭐
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Reviews List */}
      {reviews.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">Sin calificaciones aún</p>
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-semibold text-gray-900">
                    {review.reviewer.name || review.reviewer.email}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(review.createdAt).toLocaleDateString("es-ES")}
                  </p>
                </div>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={`text-lg ${
                        star <= review.rating
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                    >
                      ⭐
                    </span>
                  ))}
                </div>
              </div>

              {review.comment && (
                <p className="text-gray-700">{review.comment}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
