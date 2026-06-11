import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/lib/auth";
import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// GET /api/proposals/[id]
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const proposal = await prisma.proposal.findUnique({
      where: { id },
      include: {
        freelancer: {
          select: { id: true, name: true, email: true, bio: true, location: true },
        },
        client: {
          select: { id: true, name: true, email: true },
        },
        project: {
          select: {
            id: true,
            title: true,
            description: true,
            budget: true,
            category: true,
          },
        },
      },
    });

    if (!proposal) {
      return NextResponse.json(
        { error: "Proposal not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(proposal);
  } catch (error) {
    console.error("Error fetching proposal:", error);
    return NextResponse.json(
      { error: "Error fetching proposal" },
      { status: 500 }
    );
  }
}

// PUT /api/proposals/[id] - Actualizar estado (aceptar/rechazar)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await request.json();
    const { status } = body;

    if (!status || !["ACCEPTED", "REJECTED"].includes(status)) {
      return NextResponse.json(
        { error: "Invalid status" },
        { status: 400 }
      );
    }

    // Verify proposal exists
    const proposal = await prisma.proposal.findUnique({
      where: { id },
      include: { client: true, project: true },
    });

    if (!proposal) {
      return NextResponse.json(
        { error: "Proposal not found" },
        { status: 404 }
      );
    }

    // Verify user is the client
    const user = await prisma.user.findUnique({
      where: { email: session.user.email! },
    });

    if (!user || proposal.clientId !== user.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 403 }
      );
    }

    // Update proposal status
    const updatedProposal = await prisma.proposal.update({
      where: { id },
      data: { status },
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

    // If accepted, update project status to CLOSED
    if (status === "ACCEPTED") {
      await prisma.project.update({
        where: { id: proposal.projectId },
        data: { status: "CLOSED" },
      });
    }

    return NextResponse.json(updatedProposal);
  } catch (error) {
    console.error("Error updating proposal:", error);
    return NextResponse.json(
      { error: "Error updating proposal" },
      { status: 500 }
    );
  }
}

// DELETE /api/proposals/[id]
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;

    const proposal = await prisma.proposal.findUnique({
      where: { id },
    });

    if (!proposal) {
      return NextResponse.json(
        { error: "Proposal not found" },
        { status: 404 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email! },
    });

    // Only freelancer can delete their own proposal
    if (!user || proposal.freelancerId !== user.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 403 }
      );
    }

    await prisma.proposal.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting proposal:", error);
    return NextResponse.json(
      { error: "Error deleting proposal" },
      { status: 500 }
    );
  }
}
