import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import { LoginForm } from "@/app/components/LoginForm";

export default async function LoginPage() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/profile");
  }

  return <LoginForm />;
}
