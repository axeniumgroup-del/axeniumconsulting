import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ClientDashboard } from "@/components/client/ClientDashboard";

export default async function ClientPage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return <ClientDashboard session={session} />;
}
