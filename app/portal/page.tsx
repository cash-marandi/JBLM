"use client"

import { motion } from "framer-motion";
import {
  Building2,
  TrendingUp,
  DollarSign,
  Calendar,
  FileText,
  Download,
  ArrowRight,
  CheckCircle,
  Clock,
} from "lucide-react";
import Link from "next/link";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const projects = [
  {
    id: 1,
    name: "Riverside Tower Development",
    progress: 75,
    budget: "$2.4M",
    spent: "$1.8M",
    status: "On Track",
    nextMilestone: "Foundation inspection - Mar 20",
    lastUpdate: "Updated 2 hours ago",
  },
  {
    id: 2,
    name: "Metro Station Extension",
    progress: 45,
    budget: "$5.8M",
    spent: "$2.6M",
    status: "On Track",
    nextMilestone: "Structural review - Mar 25",
    lastUpdate: "Updated 1 day ago",
  },
];

const recentDocuments = [
  {
    id: 1,
    name: "BOQ - Riverside Tower Phase 2",
    type: "PDF",
    date: "Mar 10, 2024",
    size: "2.4 MB",
  },
  {
    id: 2,
    name: "Progress Report - February 2024",
    type: "PDF",
    date: "Mar 1, 2024",
    size: "1.8 MB",
  },
  {
    id: 3,
    name: "Cost Analysis Summary",
    type: "XLSX",
    date: "Feb 28, 2024",
    size: "856 KB",
  },
];

const upcomingMeetings = [
  {
    id: 1,
    title: "Project Review Meeting",
    date: "Mar 15, 2024",
    time: "10:00 AM",
    type: "Video Call",
  },
  {
    id: 2,
    title: "BOQ Walkthrough",
    date: "Mar 18, 2024",
    time: "2:00 PM",
    type: "In-Person",
  },
];

export default function ClientPortalPage() {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Welcome Section */}
      <motion.div variants={fadeInUp} className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Welcome back, John
          </h1>
          <p className="text-muted-foreground mt-1">
            Here&apos;s an overview of your active projects.
          </p>
        </div>
        <Link
          href="/portal/messages"
          className="px-4 py-2 rounded-xl bg-gold hover:bg-gold-light transition-colors text-sm font-semibold flex items-center gap-2 text-black"
        >
          Contact Team
          <ArrowRight className="w-4 h-4" />
        </Link>
      </motion.div>

      {/* Stats Overview */}
      <motion.div variants={fadeInUp} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            icon: Building2,
            label: "Active Projects",
            value: "2",
            color: "text-gold",
            bgColor: "bg-gold/10",
          },
          {
            icon: DollarSign,
            label: "Total Investment",
            value: "$8.2M",
            color: "text-emerald-400",
            bgColor: "bg-emerald-500/10",
          },
          {
            icon: TrendingUp,
            label: "Avg Progress",
            value: "60%",
            color: "text-blue-400",
            bgColor: "bg-blue-500/10",
          },
          {
            icon: Calendar,
            label: "Upcoming Events",
            value: "4",
            color: "text-purple-400",
            bgColor: "bg-purple-500/10",
          },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            variants={fadeInUp}
            className="card-premium bg-card border-border"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-3xl font-bold text-foreground mt-1">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Projects List */}
        <motion.div variants={fadeInUp} className="lg:col-span-2 space-y-6">
          {/* Active Projects */}
          <div className="card-premium bg-card border-border">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-foreground">Your Projects</h2>
              <Link href="/portal/projects" className="text-sm text-gold hover:underline">
                View all
              </Link>
            </div>

            <div className="space-y-4">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="p-4 rounded-xl bg-muted/50 border border-border hover:border-gold/30 transition-colors"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-foreground">{project.name}</h3>
                      <p className="text-sm text-muted-foreground">{project.lastUpdate}</p>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-medium">
                      {project.status}
                    </span>
                  </div>

                  {/* Progress */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-semibold text-foreground">{project.progress}%</span>
                    </div>
                    <div className="h-3 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${project.progress}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="h-full bg-gradient-to-r from-gold to-gold-light rounded-full"
                      />
                    </div>
                  </div>

                  {/* Budget */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Budget</p>
                      <p className="font-semibold text-foreground">{project.budget}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Spent</p>
                      <p className="font-semibold text-foreground">{project.spent}</p>
                    </div>
                  </div>

                  {/* Next Milestone */}
                  <div className="flex items-center gap-2 pt-4 border-t border-border">
                    <Calendar className="w-4 h-4 text-gold" />
                    <span className="text-sm text-muted-foreground">Next:</span>
                    <span className="text-sm font-medium text-foreground">{project.nextMilestone}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Upcoming Meetings */}
          <motion.div variants={fadeInUp} className="card-premium bg-card border-border">
            <h3 className="text-lg font-bold text-foreground mb-4">Upcoming Meetings</h3>
            <div className="space-y-3">
              {upcomingMeetings.map((meeting) => (
                <div
                  key={meeting.id}
                  className="p-3 rounded-xl bg-muted/50 border border-border"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-foreground text-sm">{meeting.title}</h4>
                    <span className="px-2 py-0.5 bg-gold/10 text-gold text-xs rounded-full">
                      {meeting.type}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="w-3 h-3" />
                    {meeting.date} at {meeting.time}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Recent Documents */}
          <motion.div variants={fadeInUp} className="card-premium bg-card border-border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-foreground">Recent Documents</h3>
              <Link href="/portal/documents" className="text-sm text-gold hover:underline">
                View all
              </Link>
            </div>
            <div className="space-y-3">
              {recentDocuments.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 border border-border hover:border-gold/30 transition-colors cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-gold" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{doc.name}</p>
                    <p className="text-xs text-muted-foreground">{doc.date} • {doc.size}</p>
                  </div>
                  <button className="p-2 rounded-lg hover:bg-white/10 transition-colors">
                    <Download className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div variants={fadeInUp} className="card-premium bg-card border-border">
            <h3 className="text-lg font-bold text-foreground mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <Link
                href="/portal/messages"
                className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 border border-border hover:border-gold/30 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-gold" />
                </div>
                <span className="text-sm font-medium text-foreground">Request BOQ Review</span>
              </Link>
              <Link
                href="/portal/reports"
                className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 border border-border hover:border-gold/30 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center">
                  <Download className="w-5 h-5 text-gold" />
                </div>
                <span className="text-sm font-medium text-foreground">Download Reports</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
