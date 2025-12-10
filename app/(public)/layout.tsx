"use client";

import { AuthenticationProvider } from "@/components/providers/AuthProvider";
import Navigation from "@/components/features/layout/Navigation";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthenticationProvider>
      <Navigation />
      <main>{children}</main>
    </AuthenticationProvider>
  );
}