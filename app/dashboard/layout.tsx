"use client"

import { useState } from "react";
import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
      <Header collapsed={collapsed} />
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
