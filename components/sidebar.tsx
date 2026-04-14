"use client"

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  FolderKanban,
  FileText,
  Users,
  MessageSquare,
  BarChart3,
  Calendar,
  Settings,
  ChevronLeft,
  ChevronRight,
  Bell,
  Search,
  LogOut,
  Crown,
  HelpCircle,
  Briefcase,
  DollarSign,
  TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  collapsed?: boolean;
  onToggle?: () => void;
}

const mainNavItems = [
  { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { title: "Projects", href: "/dashboard/projects", icon: FolderKanban },
  { title: "BOQ Editor", href: "/dashboard/boq", icon: FileText },
  { title: "Reports", href: "/dashboard/reports", icon: BarChart3 },
  { title: "Clients", href: "/dashboard/clients", icon: Users },
  { title: "Team", href: "/dashboard/team", icon: Users },
  { title: "Messages", href: "/dashboard/messages", icon: MessageSquare, badge: "3" },
];

const secondaryNavItems = [
  { title: "Calendar", href: "/dashboard/calendar", icon: Calendar },
  { title: "Finance", href: "/dashboard/finance", icon: DollarSign },
];

const bottomNavItems = [
  { title: "Settings", href: "/dashboard/settings", icon: Settings },
  { title: "Help", href: "/dashboard/help", icon: HelpCircle },
];

export function Sidebar({ collapsed = false, onToggle }: SidebarProps) {
  const pathname = usePathname() ?? "";

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 80 : 280 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed left-0 top-0 h-screen flex flex-col bg-black border-r border-gold/20 z-40"
    >
      {/* Logo */}
      <div className={cn(
        "h-20 flex items-center border-b border-gold/20",
        collapsed ? "justify-center px-2" : "px-6"
      )}>
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-black border-2 border-gold flex items-center justify-center shadow-gold flex-shrink-0 overflow-hidden">
            <Image
              src="/image/logo.png"
              alt="JBLM Logo"
              width={40}
              height={40}
              className="object-contain"
            />
          </div>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col"
            >
              <span className="text-lg font-bold text-white">Dashboard</span>
              <span className="text-[10px] text-gold font-medium -mt-1">Staff Portal</span>
            </motion.div>
          )}
        </Link>
      </div>

      {/* Search */}
      {!collapsed && (
        <div className="px-4 py-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all"
            />
          </div>
        </div>
      )}

      {/* Main Navigation */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto space-y-1">
        <div className="space-y-1">
          {mainNavItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "group relative flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200",
                  isActive
                    ? "bg-gold/10 text-gold border border-gold/30"
                    : "text-gray-400 hover:text-white hover:bg-white/5",
                  collapsed && "justify-center px-2"
                )}
              >
                <item.icon className={cn("w-5 h-5 flex-shrink-0", isActive ? "text-gold" : "")} />
                {!collapsed && (
                  <>
                    <span className="text-sm font-medium flex-1">{item.title}</span>
                    {item.badge && (
                      <span className="px-2 py-0.5 text-xs font-bold bg-gold text-black rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
                {collapsed && item.badge && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-gold text-black text-[10px] font-bold rounded-full flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
                {collapsed && (
                  <div className="absolute left-full ml-2 px-3 py-1.5 bg-black text-white text-sm rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50 border border-gold/30">
                    {item.title}
                  </div>
                )}
              </Link>
            );
          })}
        </div>

        {!collapsed && (
          <div className="pt-6">
            <p className="px-3 mb-2 text-[10px] font-semibold uppercase tracking-wider text-gray-600">
              Tools
            </p>
          </div>
        )}

        <div className="space-y-1">
          {secondaryNavItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "group relative flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200",
                  isActive
                    ? "bg-gold/10 text-gold border border-gold/30"
                    : "text-gray-400 hover:text-white hover:bg-white/5",
                  collapsed && "justify-center px-2"
                )}
              >
                <item.icon className={cn("w-5 h-5 flex-shrink-0", isActive ? "text-gold" : "")} />
                {!collapsed && (
                  <span className="text-sm font-medium">{item.title}</span>
                )}
                {collapsed && (
                  <div className="absolute left-full ml-2 px-3 py-1.5 bg-black text-white text-sm rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50 border border-gold/30">
                    {item.title}
                  </div>
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Bottom Navigation */}
      <div className="px-3 py-4 border-t border-gold/20 space-y-1">
        {bottomNavItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group relative flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200",
                isActive
                  ? "bg-gold/10 text-gold"
                  : "text-gray-400 hover:text-white hover:bg-white/5",
                collapsed && "justify-center px-2"
              )}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {!collapsed && (
                <span className="text-sm font-medium">{item.title}</span>
              )}
            </Link>
          );
        })}
        
        {/* Logout */}
        <button className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200">
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {!collapsed && (
            <span className="text-sm font-medium">Sign Out</span>
          )}
        </button>
      </div>

      {/* Collapse Toggle */}
      <button
        onClick={onToggle}
        className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-gold flex items-center justify-center shadow-gold hover:shadow-glow-gold transition-all z-50"
      >
        {collapsed ? (
          <ChevronRight className="w-4 h-4 text-black" />
        ) : (
          <ChevronLeft className="w-4 h-4 text-black" />
        )}
      </button>
    </motion.aside>
  );
}
