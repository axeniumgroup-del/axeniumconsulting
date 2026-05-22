import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { ClientDashboard } from "@/components/client/ClientDashboard";
import { redirect } from "next/navigation";

export default async function ClientPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return <ClientDashboard session={session} />;
}
