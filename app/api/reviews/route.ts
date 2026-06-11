import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/lib/auth";
import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// GET /api/reviews?userId=xxx - Obtener reviews de un usuario
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "userId is required" },
        { status: 400 }
      );
    }

    const reviews = await prisma.review.findMany({
      where: { revieweeId: userId },
      include: {
        reviewer: {
          select: { id: true, name: true, email: true, image: true },
        },
        contract: {
          select: { id: true, title: true, project: { select: { title: true } } },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return NextResponse.json(
      { error: "Error fetching reviews" },
      { status: 500 }
    );
  }
}

// POST /api/reviews - Crear review
export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { rating, comment, contractId, revieweeId } = body;

    if (!rating || !contractId || !revieweeId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (rating < 1 || rating > 5 || !Number.isInteger(rating)) {
      return NextResponse.json(
        { error: "Rating must be between 1 and 5" },
        { status: 400 }
      );
    }

    const reviewer = await prisma.user.findUnique({
      where: { email: session.user.email! },
    });

    if (!reviewer) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Verify contract exists and reviewer is part of it
    const contract = await prisma.contract.findUnique({
      where: { id: contractId },
    });

    if (!contract) {
      return NextResponse.json(
        { error: "Contract not found" },
        { status: 404 }
      );
    }

    if (
      contract.clientId !== reviewer.id &&
      contract.freelancerId !== reviewer.id
    ) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 403 }
      );
    }

    // Verify contract is completed
    if (contract.status !== "COMPLETED") {
      return NextResponse.json(
        { error: "Can only review completed contracts" },
        { status: 400 }
      );
    }

    // Check if review already exists
    const existingReview = await prisma.review.findFirst({
      where: {
        contractId,
        reviewerId: reviewer.id,
      },
    });

    if (existingReview) {
      return NextResponse.json(
        { error: "You already reviewed this contract" },
        { status: 400 }
      );
    }

    // Create review
    const review = await prisma.review.create({
      data: {
        rating,
        comment: comment || null,
        contractId,
        reviewerId: reviewer.id,
        revieweeId,
      },
      include: {
        reviewer: {
          select: { id: true, name: true, email: true, image: true },
        },
        contract: {
          select: { id: true, title: true },
        },
      },
    });

    // Update reviewee's rating
    const allReviews = await prisma.review.findMany({
      where: { revieweeId },
    });

    const averageRating =
      allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length;

    await prisma.user.update({
      where: { id: revieweeId },
      data: {
        rating: averageRating,
        reviewCount: allReviews.length,
      },
    });

    return NextResponse.json(review, { status: 201 });
  } catch (error) {
    console.error("Error creating review:", error);
    return NextResponse.json(
      { error: "Error creating review" },
      { status: 500 }
    );
  }
}
