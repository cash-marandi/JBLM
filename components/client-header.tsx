"use client"

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bell,
  ChevronDown,
  User,
  Settings,
  LogOut,
  HelpCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ClientHeaderProps {
  title?: string;
  subtitle?: string;
  collapsed?: boolean;
  clientName?: string;
}

export function ClientHeader({ title, subtitle, collapsed, clientName = "ABC Construction" }: ClientHeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const notifications = [
    {
      id: 1,
      title: "Project Update",
      message: "Riverside Tower progress report is ready",
      time: "2 hours ago",
      unread: true,
    },
    {
      id: 2,
      title: "New Document",
      message: "BOQ for review has been uploaded",
      time: "5 hours ago",
      unread: true,
    },
  ];

  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <header
      className={cn(
        "h-20 bg-black/95 backdrop-blur-md sticky top-0 z-30 flex items-center justify-between px-6 border-b border-gold/20",
        collapsed ? "ml-[280px]" : "ml-20"
      )}
    >
      {/* Title Section */}
      <div className="flex flex-col">
        {title && (
          <h1 className="text-xl font-bold text-white">{title}</h1>
        )}
        {subtitle && (
          <p className="text-sm text-gray-400">{subtitle}</p>
        )}
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Client Info */}
        <div className="hidden md:flex items-center gap-3 px-4 py-2 rounded-xl bg-gold/10 border border-gold/30">
          <Building2 className="w-5 h-5 text-gold" />
          <span className="text-sm font-medium text-white">{clientName}</span>
        </div>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfile(false);
            }}
            className="relative w-10 h-10 rounded-xl flex items-center justify-center hover:bg-white/10 transition-colors"
          >
            <Bell className="w-5 h-5 text-gray-400" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-[10px] font-bold text-white flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          <AnimatePresence>
            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 top-full mt-2 w-80 rounded-xl bg-black border border-gold/30 shadow-xl overflow-hidden"
              >
                <div className="p-4 border-b border-gold/20">
                  <h3 className="font-semibold text-white">Notifications</h3>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={cn(
                        "p-4 border-b border-gold/10 hover:bg-white/5 transition-colors cursor-pointer",
                        notification.unread && "bg-gold/5"
                      )}
                    >
                      <div className="flex items-start gap-3">
                        {notification.unread && (
                          <span className="w-2 h-2 rounded-full bg-gold mt-2 flex-shrink-0" />
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-white truncate">
                            {notification.title}
                          </p>
                          <p className="text-xs text-gray-400 mt-0.5">
                            {notification.message}
                          </p>
                          <p className="text-[10px] text-gray-500 mt-1">
                            {notification.time}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-3 border-t border-gold/20">
                  <button className="w-full text-center text-sm text-gold hover:underline">
                    View all notifications
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Profile */}
        <div className="relative">
          <button
            onClick={() => {
              setShowProfile(!showProfile);
              setShowNotifications(false);
            }}
            className="flex items-center gap-3 pl-2 pr-3 py-1.5 rounded-xl hover:bg-white/10 transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-gold flex items-center justify-center text-black font-bold text-sm">
              JS
            </div>
            <div className="hidden md:block text-left">
              <p className="text-sm font-medium text-white">John Smith</p>
              <p className="text-[10px] text-gray-400">Project Contact</p>
            </div>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </button>

          <AnimatePresence>
            {showProfile && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 top-full mt-2 w-56 rounded-xl bg-black border border-gold/30 shadow-xl overflow-hidden"
              >
                <div className="p-4 border-b border-gold/20">
                  <p className="font-medium text-white">John Smith</p>
                  <p className="text-sm text-gray-400">john@abc-construction.com</p>
                </div>
                <div className="p-2">
                  <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/10 transition-colors">
                    <User className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-white">Profile</span>
                  </button>
                  <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/10 transition-colors">
                    <Settings className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-white">Settings</span>
                  </button>
                  <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/10 transition-colors">
                    <HelpCircle className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-white">Help</span>
                  </button>
                </div>
                <div className="p-2 border-t border-gold/20">
                  <Link href="/" className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-red-500/10 text-red-400 transition-colors">
                    <LogOut className="w-4 h-4" />
                    <span className="text-sm">Sign out</span>
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}

function Building2({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" />
      <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" />
      <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" />
      <path d="M10 6h4" />
      <path d="M10 10h4" />
      <path d="M10 14h4" />
      <path d="M10 18h4" />
    </svg>
  );
}
