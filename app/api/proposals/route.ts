import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/lib/auth";
import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// GET /api/proposals - Listar propuestas
export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email! },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const searchParams = request.nextUrl.searchParams;
    const type = searchParams.get("type"); // "sent" o "received"

    let where: any = {};

    if (type === "sent") {
      where.freelancerId = user.id;
    } else if (type === "received") {
      where.clientId = user.id;
    } else {
      // Si no se especifica, devolver ambas
      where = {
        OR: [{ freelancerId: user.id }, { clientId: user.id }],
      };
    }

    const proposals = await prisma.proposal.findMany({
      where,
      include: {
        freelancer: {
          select: { id: true, name: true, email: true, bio: true },
        },
        client: {
          select: { id: true, name: true, email: true },
        },
        project: {
          select: { id: true, title: true, budget: true, category: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(proposals);
  } catch (error) {
    console.error("Error fetching proposals:", error);
    return NextResponse.json(
      { error: "Error fetching proposals" },
      { status: 500 }
    );
  }
}

// POST /api/proposals - Enviar propuesta
export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { title, description, bidAmount, projectId } = body;

    if (!title || !description || !bidAmount || !projectId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Get freelancer
    const freelancer = await prisma.user.findUnique({
      where: { email: session.user.email! },
    });

    if (!freelancer || freelancer.role !== "FREELANCER") {
      return NextResponse.json(
        { error: "Only freelancers can send proposals" },
        { status: 403 }
      );
    }

    // Verify project exists
    const project = await prisma.project.findUnique({
      where: { id: projectId },
      include: { client: true },
    });

    if (!project) {
      return NextResponse.json(
        { error: "Project not found" },
        { status: 404 }
      );
    }

    // Check if freelancer already sent proposal to this project
    const existingProposal = await prisma.proposal.findFirst({
      where: {
        freelancerId: freelancer.id,
        projectId,
      },
    });

    if (existingProposal) {
      return NextResponse.json(
        { error: "You already sent a proposal for this project" },
        { status: 400 }
      );
    }

    // Create proposal
    const proposal = await prisma.proposal.create({
      data: {
        title,
        description,
        bidAmount: parseFloat(bidAmount),
        freelancerId: freelancer.id,
        projectId,
        clientId: project.clientId,
      },
      include: {
        freelancer: {
          select: { id: true, name: true, email: true, bio: true },
        },
        client: {
          select: { id: true, name: true, email: true },
        },
        project: {
          select: { id: true, title: true, budget: true },
        },
      },
    });

    return NextResponse.json(proposal, { status: 201 });
  } catch (error) {
    console.error("Error creating proposal:", error);
    return NextResponse.json(
      { error: "Error creating proposal" },
      { status: 500 }
    );
  }
}
