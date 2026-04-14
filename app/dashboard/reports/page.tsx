"use client"

import { useState } from "react";
import { motion } from "framer-motion";
import {
  FileText,
  Download,
  Plus,
  Calendar,
  Filter,
  Search,
  Clock,
  CheckCircle2,
  AlertCircle,
  Eye,
  MoreHorizontal,
  BarChart3,
  PieChart,
  TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ProBadge } from "@/components/pro-badge";
import { isProFeatureEnabled } from "@/lib/feature-flags";

const reports = [
  {
    id: 1,
    title: "Monthly Progress Report - February 2024",
    project: "Riverside Tower Development",
    type: "Progress",
    status: "generated",
    generatedAt: "Mar 1, 2024",
    size: "2.4 MB",
  },
  {
    id: 2,
    title: "Cost Analysis Summary - Q1 2024",
    project: "Metro Station Extension",
    type: "Financial",
    status: "scheduled",
    nextRun: "Apr 1, 2024",
    size: null,
  },
  {
    id: 3,
    title: "BOQ Comparison Report",
    project: "Oakwood Residential Complex",
    type: "Comparison",
    status: "generated",
    generatedAt: "Feb 28, 2024",
    size: "1.8 MB",
  },
  {
    id: 4,
    title: "Weekly Progress Update",
    project: "Tech Park Phase 2",
    type: "Progress",
    status: "scheduled",
    nextRun: "Weekly",
    size: null,
  },
  {
    id: 5,
    title: "Budget Variance Analysis",
    project: "Harbor Bridge Renovation",
    type: "Financial",
    status: "generated",
    generatedAt: "Feb 25, 2024",
    size: "3.1 MB",
  },
  {
    id: 6,
    title: "Resource Utilization Report",
    project: "All Projects",
    type: "Resource",
    status: "generated",
    generatedAt: "Feb 20, 2024",
    size: "1.2 MB",
  },
];

const reportTemplates = [
  {
    id: 1,
    name: "Progress Report",
    description: "Weekly or monthly project progress updates",
    icon: TrendingUp,
    color: "text-blue-400",
    bgColor: "bg-blue-500/10",
  },
  {
    id: 2,
    name: "Cost Report",
    description: "Detailed cost analysis and forecasts",
    icon: BarChart3,
    color: "text-emerald-400",
    bgColor: "bg-emerald-500/10",
  },
  {
    id: 3,
    name: "BOQ Report",
    description: "Bill of quantities summary and comparison",
    icon: FileText,
    color: "text-amber-400",
    bgColor: "bg-amber-500/10",
  },
  {
    id: 4,
    name: "Resource Report",
    description: "Team utilization and allocation",
    icon: PieChart,
    color: "text-purple-400",
    bgColor: "bg-purple-500/10",
  },
];

const statusColors = {
  generated: "bg-emerald-500/10 text-emerald-400",
  scheduled: "bg-amber-500/10 text-amber-400",
  pending: "bg-slate-500/10 text-slate-400",
};

export default function ReportsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string | null>(null);
  
  const showAutomatedReports = isProFeatureEnabled("AUTOMATED_REPORTS");

  const filteredReports = reports.filter((report) => {
    const matchesSearch =
      report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.project.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = !selectedType || report.type === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold text-foreground">Reports</h1>
            {showAutomatedReports && (
              <ProBadge feature="AUTOMATED_REPORTS" size="sm" />
            )}
          </div>
          <p className="text-muted-foreground mt-1">
            Generate and manage project reports
          </p>
        </div>
        <button className="px-4 py-2 rounded-xl bg-primary hover:bg-primary/90 transition-colors text-sm font-medium flex items-center gap-2 text-white">
          <Plus className="w-4 h-4" />
          Create Report
        </button>
      </motion.div>

      {/* Report Templates */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {reportTemplates.map((template, index) => (
          <motion.div
            key={template.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.05 }}
            className="card-glass cursor-pointer group"
          >
            <div
              className={cn(
                "w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110",
                template.bgColor
              )}
            >
              <template.icon className={cn("w-6 h-6", template.color)} />
            </div>
            <h3 className="font-semibold text-foreground mb-1">
              {template.name}
            </h3>
            <p className="text-sm text-muted-foreground">
              {template.description}
            </p>
          </motion.div>
        ))}
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex flex-col md:flex-row gap-4"
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search reports..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>

        <div className="flex gap-2 flex-wrap">
          {[null, "Progress", "Financial", "Comparison", "Resource"].map(
            (type) => (
              <button
                key={type || "all"}
                onClick={() => setSelectedType(type)}
                className={cn(
                  "px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  selectedType === type
                    ? "bg-primary text-white"
                    : "bg-white/5 text-muted-foreground hover:bg-white/10"
                )}
              >
                {type || "All"}
              </button>
            )
          )}
        </div>
      </motion.div>

      {/* Reports List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="space-y-4"
      >
        {filteredReports.map((report, index) => (
          <motion.div
            key={report.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + index * 0.05 }}
            className="card-glass flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div className="flex items-start gap-4 flex-1">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center flex-shrink-0">
                <FileText className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-foreground truncate">
                  {report.title}
                </h3>
                <p className="text-sm text-muted-foreground">{report.project}</p>
                <div className="flex items-center gap-4 mt-2">
                  <span
                    className={cn(
                      "px-2 py-0.5 text-xs font-medium rounded-full",
                      statusColors[report.status as keyof typeof statusColors]
                    )}
                  >
                    {report.status}
                  </span>
                  {report.status === "generated" && report.generatedAt && (
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {report.generatedAt}
                    </span>
                  )}
                  {report.status === "scheduled" && report.nextRun && (
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      Next: {report.nextRun}
                    </span>
                  )}
                  {report.size && (
                    <span className="text-xs text-muted-foreground">
                      {report.size}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {report.status === "generated" && (
                <>
                  <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                    <Eye className="w-4 h-4 text-muted-foreground" />
                  </button>
                  <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                    <Download className="w-4 h-4 text-muted-foreground" />
                  </button>
                </>
              )}
              <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Scheduled Reports Section */}
      {showAutomatedReports && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="card-glass"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-foreground">
                Automated Report Schedule
              </h3>
              <p className="text-sm text-muted-foreground">
                Reports generated and sent automatically
              </p>
            </div>
            <button className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-sm font-medium">
              Manage Schedule
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                name: "Weekly Progress Summary",
                schedule: "Every Monday at 9:00 AM",
                recipients: "Team + Client",
              },
              {
                name: "Monthly Financial Report",
                schedule: "1st of each month",
                recipients: "Finance Team",
              },
              {
                name: "Quarterly Executive Summary",
                schedule: "Quarterly",
                recipients: "Management",
              },
            ].map((schedule, index) => (
              <div
                key={index}
                className="p-4 rounded-xl bg-white/5 border border-white/10"
              >
                <h4 className="font-medium text-foreground mb-2">
                  {schedule.name}
                </h4>
                <p className="text-xs text-muted-foreground mb-1">
                  {schedule.schedule}
                </p>
                <p className="text-xs text-muted-foreground">
                  Recipients: {schedule.recipients}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
