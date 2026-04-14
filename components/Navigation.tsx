"use client"

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, User, Building2, Users } from "lucide-react";

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "News", href: "/news" },
  { name: "Contact", href: "/#contact" },
];

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showLoginDropdown, setShowLoginDropdown] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-md border-b border-gold/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <img src="/image/logo.png" alt="JBLM Logo" className="h-14 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="px-4 py-2 rounded-lg text-sm font-medium text-gray-300 hover:text-gold hover:bg-white/5 transition-all duration-200"
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* Login Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowLoginDropdown(!showLoginDropdown)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gold hover:bg-gold-light transition-all duration-200 text-black font-semibold text-sm"
              >
                <User className="w-4 h-4" />
                Login
                <ChevronDown className="w-4 h-4" />
              </button>

              <AnimatePresence>
                {showLoginDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 top-full mt-2 w-64 rounded-xl bg-black border border-gold/30 shadow-xl overflow-hidden"
                  >
                    <div className="p-2">
                      <p className="px-4 py-2 text-xs font-semibold text-gold uppercase tracking-wider">
                        Select Portal
                      </p>
                      <Link
                        href="/login/staff"
                        onClick={() => setShowLoginDropdown(false)}
                        className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors group"
                      >
                        <div className="w-10 h-10 rounded-lg bg-gold/20 flex items-center justify-center group-hover:bg-gold/30 transition-colors">
                          <Users className="w-5 h-5 text-gold" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-white">Staff Portal</p>
                          <p className="text-xs text-gray-400">Internal team access</p>
                        </div>
                      </Link>
                      <Link
                        href="/login/client"
                        onClick={() => setShowLoginDropdown(false)}
                        className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors group"
                      >
                        <div className="w-10 h-10 rounded-lg bg-gold/20 flex items-center justify-center group-hover:bg-gold/30 transition-colors">
                          <Building2 className="w-5 h-5 text-gold" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-white">Client Portal</p>
                          <p className="text-xs text-gray-400">Project access & updates</p>
                        </div>
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              {mobileOpen ? (
                <X className="w-6 h-6 text-gold" />
              ) : (
                <Menu className="w-6 h-6 text-white" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-black border-t border-gold/20"
          >
            <div className="px-4 py-6 space-y-1">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-3 rounded-lg text-sm font-medium text-gray-300 hover:text-gold hover:bg-white/5 transition-colors"
                >
                  {item.name}
                </a>
              ))}
              <div className="pt-4 border-t border-gold/20 mt-4 space-y-2">
                <Link
                  href="/login/staff"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-gold text-black font-semibold"
                >
                  <Users className="w-4 h-4" />
                  Staff Login
                </Link>
                <Link
                  href="/login/client"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 border-gold text-gold font-semibold"
                >
                  <Building2 className="w-4 h-4" />
                  Client Login
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
