"use client"

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Plus,
  Filter,
  Grid,
  List,
  Building2,
  DollarSign,
  Users,
  Calendar,
  MoreHorizontal,
  Star,
  Clock,
  ArrowUpRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ProBadge } from "@/components/pro-badge";

const projects = [
  {
    id: 1,
    name: "Riverside Tower Development",
    client: "ABC Construction",
    type: "Commercial",
    budget: "$2.4M",
    spent: "$1.8M",
    progress: 75,
    status: "On Track",
    team: ["SM", "JD", "AK"],
    startDate: "Jan 15, 2024",
    endDate: "Dec 30, 2024",
    starred: true,
  },
  {
    id: 2,
    name: "Metro Station Extension",
    client: "City Transit Authority",
    type: "Infrastructure",
    budget: "$5.8M",
    spent: "$3.2M",
    progress: 45,
    status: "At Risk",
    team: ["MC", "JD"],
    startDate: "Mar 1, 2024",
    endDate: "Jun 15, 2025",
    starred: false,
  },
  {
    id: 3,
    name: "Oakwood Residential Complex",
    client: "Oakwood Properties",
    type: "Residential",
    budget: "$1.2M",
    spent: "$1.15M",
    progress: 90,
    status: "Completed",
    team: ["SM", "AK"],
    startDate: "Feb 1, 2024",
    endDate: "Mar 30, 2025",
    starred: true,
  },
  {
    id: 4,
    name: "Tech Park Phase 2",
    client: "Innovate Corp",
    type: "Commercial",
    budget: "$3.5M",
    spent: "$1.05M",
    progress: 30,
    status: "On Track",
    team: ["SM", "JD", "AK", "MC"],
    startDate: "Apr 1, 2024",
    endDate: "Aug 30, 2025",
    starred: false,
  },
  {
    id: 5,
    name: "Harbor Bridge Renovation",
    client: "Public Works Dept",
    type: "Infrastructure",
    budget: "$4.2M",
    spent: "$2.1M",
    progress: 55,
    status: "On Track",
    team: ["JD", "MC"],
    startDate: "May 15, 2024",
    endDate: "Nov 30, 2025",
    starred: false,
  },
  {
    id: 6,
    name: "Downtown Mall Expansion",
    client: "Retail Holdings",
    type: "Commercial",
    budget: "$2.8M",
    spent: "$700K",
    progress: 25,
    status: "Delayed",
    team: ["SM", "AK"],
    startDate: "Jun 1, 2024",
    endDate: "Mar 30, 2026",
    starred: true,
  },
];

const statusColors = {
  "On Track": "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
  "At Risk": "bg-amber-500/10 text-amber-400 border-amber-500/30",
  "Completed": "bg-blue-500/10 text-blue-400 border-blue-500/30",
  "Delayed": "bg-red-500/10 text-red-400 border-red-500/30",
};

const typeColors = {
  Commercial: "bg-purple-500/10 text-purple-400",
  Residential: "bg-cyan-500/10 text-cyan-400",
  Infrastructure: "bg-orange-500/10 text-orange-400",
};

export default function ProjectsPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.client.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = !selectedStatus || project.status === selectedStatus;
    const matchesType = !selectedType || project.type === selectedType;
    return matchesSearch && matchesStatus && matchesType;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-foreground">Projects</h1>
          <p className="text-muted-foreground mt-1">
            Manage and track all your construction projects
          </p>
        </div>
        <button className="px-4 py-2 rounded-xl bg-primary hover:bg-primary/90 transition-colors text-sm font-medium flex items-center gap-2 text-white">
          <Plus className="w-4 h-4" />
          New Project
        </button>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-col md:flex-row gap-4"
      >
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>

        {/* Status Filter */}
        <div className="flex gap-2">
          {["All", "On Track", "At Risk", "Delayed", "Completed"].map((status) => (
            <button
              key={status}
              onClick={() =>
                setSelectedStatus(status === "All" ? null : status)
              }
              className={cn(
                "px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                (status === "All" && !selectedStatus) || selectedStatus === status
                  ? "bg-primary text-white"
                  : "bg-white/5 text-muted-foreground hover:bg-white/10"
              )}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Type Filter */}
        <select
          value={selectedType || ""}
          onChange={(e) => setSelectedType(e.target.value || null)}
          className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
        >
          <option value="">All Types</option>
          <option value="Commercial">Commercial</option>
          <option value="Residential">Residential</option>
          <option value="Infrastructure">Infrastructure</option>
        </select>

        {/* View Toggle */}
        <div className="flex gap-1 p-1 bg-white/5 rounded-lg">
          <button
            onClick={() => setViewMode("grid")}
            className={cn(
              "p-2 rounded-md transition-colors",
              viewMode === "grid"
                ? "bg-white/10 text-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Grid className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={cn(
              "p-2 rounded-md transition-colors",
              viewMode === "list"
                ? "bg-white/10 text-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        {[
          { label: "Total Projects", value: "24", icon: Building2, color: "text-blue-400" },
          { label: "Active", value: "18", icon: Clock, color: "text-emerald-400" },
          { label: "Total Value", value: "$48.5M", icon: DollarSign, color: "text-amber-400" },
          { label: "Team Members", value: "12", icon: Users, color: "text-purple-400" },
        ].map((stat, index) => (
          <div
            key={stat.label}
            className="p-4 rounded-xl bg-white/5 border border-white/10"
          >
            <div className="flex items-center gap-3">
              <div className={cn("p-2 rounded-lg bg-white/5", stat.color)}>
                <stat.icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Projects Grid/List */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className={cn(
          viewMode === "grid"
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            : "space-y-4"
        )}
      >
        {filteredProjects.map((project) => (
          <motion.div
            key={project.id}
            variants={itemVariants}
            className={cn(
              "card-glass group cursor-pointer",
              viewMode === "list" && "flex items-center gap-6"
            )}
          >
            {viewMode === "grid" ? (
              <>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                      <Building2 className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                        {project.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {project.client}
                      </p>
                    </div>
                  </div>
                  <button className="p-1.5 rounded-lg hover:bg-white/10 transition-colors">
                    <Star
                      className={cn(
                        "w-4 h-4",
                        project.starred
                          ? "text-amber-400 fill-amber-400"
                          : "text-muted-foreground"
                      )}
                    />
                  </button>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <span
                    className={cn(
                      "px-2 py-0.5 text-xs font-medium rounded-full border",
                      statusColors[project.status as keyof typeof statusColors]
                    )}
                  >
                    {project.status}
                  </span>
                  <span
                    className={cn(
                      "px-2 py-0.5 text-xs font-medium rounded-full",
                      typeColors[project.type as keyof typeof typeColors]
                    )}
                  >
                    {project.type}
                  </span>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium text-foreground">
                      {project.progress}%
                    </span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-500"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-foreground">{project.budget}</span>
                  </div>
                  <div className="flex -space-x-2">
                    {project.team.map((member, i) => (
                      <div
                        key={i}
                        className="w-7 h-7 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-[10px] font-bold border-2 border-card"
                      >
                        {member}
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center flex-shrink-0">
                    <Building2 className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground truncate">
                      {project.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {project.client}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-right hidden md:block">
                    <p className="text-sm font-medium text-foreground">
                      {project.budget}
                    </p>
                    <p className="text-xs text-muted-foreground">Budget</p>
                  </div>
                  <div className="text-right hidden md:block">
                    <p className="text-sm font-medium text-foreground">
                      {project.progress}%
                    </p>
                    <p className="text-xs text-muted-foreground">Progress</p>
                  </div>
                  <span
                    className={cn(
                      "px-2 py-0.5 text-xs font-medium rounded-full border",
                      statusColors[project.status as keyof typeof statusColors]
                    )}
                  >
                    {project.status}
                  </span>
                  <button className="p-2 rounded-lg hover:bg-white/10 transition-colors">
                    <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>
              </>
            )}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
