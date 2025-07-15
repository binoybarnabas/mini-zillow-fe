// app/auth/layout.tsx or wherever your layout file is
"use client";
import AuthGuard from "@/components/AuthGuard";
import SearchNavBar from "@/components/NavBar";
import { FormSubmitProvider } from "@/contexts/FormSubmitContext";
import { usePathname } from "next/navigation";

export default function PropertyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
 
  const pathname = usePathname();
  const showNavbar = pathname === '/property-finder';

  return (
    <AuthGuard>
      <FormSubmitProvider>
        <div className="min-h-screen bg-gray-100">
          {showNavbar && <SearchNavBar />}

          <main className="px-6 py-4">
            {children}
          </main>
        </div>
      </FormSubmitProvider>
    </AuthGuard>
  );
}
