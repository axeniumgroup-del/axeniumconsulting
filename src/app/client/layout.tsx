import { ClientNavbar } from "@/components/client/ClientNavbar";

export const dynamic = 'force-dynamic';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ClientNavbar />
      <main>{children}</main>
    </>
  );
}
