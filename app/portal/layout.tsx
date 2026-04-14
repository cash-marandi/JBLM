"use client"

import { useState } from "react";
import { ClientSidebar } from "@/components/client-sidebar";
import { ClientHeader } from "@/components/client-header";

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <ClientSidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
      <ClientHeader collapsed={collapsed} clientName="ABC Construction" />
      <main
        className={`min-h-[calc(100vh-5rem)] transition-all duration-300 ${
          collapsed ? "ml-[80px]" : "ml-[280px]"
        }`}
      >
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}
