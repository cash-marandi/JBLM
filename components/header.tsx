"use client"

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bell,
  Search,
  ChevronDown,
  User,
  Settings,
  LogOut,
  HelpCircle,
  Sun,
  Moon,
} from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

interface HeaderProps {
  title?: string;
  subtitle?: string;
  collapsed?: boolean;
}

export function Header({ title, subtitle, collapsed }: HeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const { theme, setTheme } = useTheme();

  const notifications = [
    {
      id: 1,
      title: "New client feedback",
      message: "ABC Construction reviewed Project #123",
      time: "5 min ago",
      unread: true,
    },
    {
      id: 2,
      title: "Report ready",
      message: "Monthly progress report is ready to download",
      time: "1 hour ago",
      unread: true,
    },
    {
      id: 3,
      title: "Task assigned",
      message: "You were assigned to review BOQ changes",
      time: "2 hours ago",
      unread: false,
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
      <div className="flex items-center gap-2">
        {/* Theme Toggle */}
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="w-10 h-10 rounded-xl flex items-center justify-center hover:bg-white/10 transition-colors"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={theme}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5 text-gold" />
              ) : (
                <Moon className="w-5 h-5 text-gray-600" />
              )}
            </motion.div>
          </AnimatePresence>
        </button>

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
              SM
            </div>
            <div className="hidden md:block text-left">
              <p className="text-sm font-medium text-white">Sarah Mitchell</p>
              <p className="text-[10px] text-gray-400">Project Manager</p>
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
                  <p className="font-medium text-white">Sarah Mitchell</p>
                  <p className="text-sm text-gray-400">sarah@jblm-qs.com</p>
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
                  <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-red-500/10 text-red-400 transition-colors">
                    <LogOut className="w-4 h-4" />
                    <span className="text-sm">Sign out</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
