import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/lib/auth";
import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// GET /api/browse/projects - Buscar proyectos disponibles para freelancers
export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email! },
    });

    if (!user || user.role !== "FREELANCER") {
      return NextResponse.json(
        { error: "Only freelancers can browse projects" },
        { status: 403 }
      );
    }

    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    const minBudget = searchParams.get("minBudget");
    const maxBudget = searchParams.get("maxBudget");

    const where: any = {
      status: "ACTIVE",
      clientId: { not: user.id }, // No mostrar propios proyectos
    };

    if (category && category !== "ALL") {
      where.category = category;
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ];
    }

    if (minBudget) {
      where.budget = { gte: parseFloat(minBudget) };
    }

    if (maxBudget) {
      where.budget = {
        ...where.budget,
        lte: parseFloat(maxBudget),
      };
    }

    const projects = await prisma.project.findMany({
      where,
      include: {
        client: {
          select: { id: true, name: true, email: true },
        },
        proposals: {
          where: { freelancerId: user.id },
          select: { id: true, status: true },
        },
      },
      orderBy: { createdAt: "desc" },
      take: 50,
    });

    return NextResponse.json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json(
      { error: "Error fetching projects" },
      { status: 500 }
    );
  }
}
