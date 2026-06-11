export const dynamic = "force-dynamic";

import { registerUser } from "@/app/lib/auth";

export async function POST(request: Request) {
  try {
    const { email, name, password, role } = await request.json();

    // Validación básica
    if (!email || !name || !password) {
      return Response.json(
        { error: "Falta información requerida" },
        { status: 400 }
      );
    }

    // Verificar si el email ya existe
    const { default: prisma } = await import("@/app/lib/prisma");
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return Response.json(
        { error: "El email ya está registrado" },
        { status: 400 }
      );
    }

    // Crear usuario
    const user = await registerUser(email, name, password, role || "CLIENT");

    return Response.json(
      {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return Response.json(
      { error: "Error al registrarse" },
      { status: 500 }
    );
  }
}
