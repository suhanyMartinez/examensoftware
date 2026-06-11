import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/lib/auth";
import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// GET /api/contracts - Listar contratos
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
    const type = searchParams.get("type"); // "client" o "freelancer"

    let where: any = {
      OR: [{ clientId: user.id }, { freelancerId: user.id }],
    };

    if (type === "client") {
      where = { clientId: user.id };
    } else if (type === "freelancer") {
      where = { freelancerId: user.id };
    }

    const contracts = await prisma.contract.findMany({
      where,
      include: {
        client: {
          select: { id: true, name: true, email: true },
        },
        freelancer: {
          select: { id: true, name: true, email: true },
        },
        project: {
          select: { id: true, title: true },
        },
        proposal: {
          select: { id: true, title: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(contracts);
  } catch (error) {
    console.error("Error fetching contracts:", error);
    return NextResponse.json(
      { error: "Error fetching contracts" },
      { status: 500 }
    );
  }
}
