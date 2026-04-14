"use client"

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Building2, Eye, EyeOff, ArrowLeft, FileText, BarChart3, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ClientLoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      window.location.href = "/portal";
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-black flex">
      {/* Left Side - Branding */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="hidden lg:flex lg:w-1/2 relative overflow-hidden"
      >
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black">
          <div className="absolute inset-0 pattern-grid opacity-20" />
          <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-gold/10 rounded-full blur-[150px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[200px]" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-between p-12 lg:p-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <img src="/image/logo.png" alt="JBLM Logo" className="h-16 w-auto" />
          </Link>

          {/* Main Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/30">
              <Building2 className="w-4 h-4 text-gold" />
              <span className="text-sm text-gold font-medium">Client Portal</span>
            </div>

            <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
              Your Project<br />
              <span className="gradient-gold-text">Dashboard</span>
            </h1>

            <p className="text-lg text-gray-400 max-w-md">
              Stay informed and in control of your projects with real-time updates, 
              document access, and direct communication with your JBLM team.
            </p>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: BarChart3, text: "Project Progress" },
                { icon: FileText, text: "Document Access" },
                { icon: Calendar, text: "Milestone Tracking" },
                { icon: Building2, text: "Team Contact" },
              ].map((feature) => (
                <div key={feature.text} className="flex items-center gap-2 text-sm text-gray-300">
                  <feature.icon className="w-4 h-4 text-gold" />
                  {feature.text}
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="text-sm text-gray-500">
            © {new Date().getFullYear()} JBLM Quantity Surveyors
          </div>
        </div>
      </motion.div>

      {/* Right Side - Login Form */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="flex-1 flex items-center justify-center p-8 bg-background"
      >
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <Link href="/" className="lg:hidden flex items-center justify-center gap-3 mb-8">
            <img src="/image/logo.png" alt="JBLM Logo" className="h-14 w-auto" />
          </Link>

          {/* Back Link */}
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-gold transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" />
            Back to Website
          </Link>

          {/* Form Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-foreground">Client Login</h2>
            <p className="text-muted-foreground mt-2">
              Access your project dashboard and documents
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@company.com"
                required
                className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="w-full px-4 py-3 pr-12 rounded-xl bg-white border border-gray-200 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-gold focus:ring-gold" />
                <span className="text-sm text-foreground">Remember me</span>
              </label>
              <a href="#" className="text-sm text-gold hover:underline">
                Forgot password?
              </a>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className={cn(
                "w-full py-6 text-lg font-semibold transition-all",
                isLoading ? "bg-gray-400 cursor-not-allowed" : "btn-gold"
              )}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                  Signing in...
                </div>
              ) : (
                "Access My Projects"
              )}
            </Button>
          </form>

          {/* Staff Portal Link */}
          <div className="mt-8 p-4 rounded-xl bg-muted/50 text-center">
            <p className="text-sm text-muted-foreground">
              Are you a JBLM staff member?{" "}
              <Link href="/login/staff" className="text-gold font-medium hover:underline">
                Access Staff Portal
              </Link>
            </p>
          </div>

          {/* Request Access */}
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              New client?{" "}
              <Link href="/#contact" className="text-gold font-medium hover:underline">
                Request access
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
