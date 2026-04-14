"use client"

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Plus,
  Filter,
  Mail,
  Phone,
  MoreHorizontal,
  Calendar,
  Briefcase,
  Clock,
  Edit,
  Trash2,
  Shield,
} from "lucide-react";
import { cn } from "@/lib/utils";

const teamMembers = [
  {
    id: 1,
    name: "Sarah Mitchell",
    email: "sarah@jblm-qs.com",
    phone: "+1 (555) 111-2222",
    role: "Project Manager",
    department: "Management",
    projects: 4,
    status: "online",
    avatar: "SM",
    joinedDate: "Jan 15, 2022",
  },
  {
    id: 2,
    name: "James Davis",
    email: "james@jblm-qs.com",
    phone: "+1 (555) 222-3333",
    role: "Senior QS",
    department: "Commercial",
    projects: 3,
    status: "online",
    avatar: "JD",
    joinedDate: "Mar 1, 2021",
  },
  {
    id: 3,
    name: "Anna Kowalski",
    email: "anna@jblm-qs.com",
    phone: "+1 (555) 333-4444",
    role: "Quantity Surveyor",
    department: "Commercial",
    projects: 2,
    status: "away",
    avatar: "AK",
    joinedDate: "Jun 15, 2022",
  },
  {
    id: 4,
    name: "Michael Chen",
    email: "michael@jblm-qs.com",
    phone: "+1 (555) 444-5555",
    role: "Cost Consultant",
    department: "Cost Management",
    projects: 3,
    status: "offline",
    avatar: "MC",
    joinedDate: "Aug 1, 2020",
  },
  {
    id: 5,
    name: "Emily Rodriguez",
    email: "emily@jblm-qs.com",
    phone: "+1 (555) 555-6666",
    role: "Junior QS",
    department: "Residential",
    projects: 2,
    status: "online",
    avatar: "ER",
    joinedDate: "Feb 1, 2023",
  },
  {
    id: 6,
    name: "David Thompson",
    email: "david@jblm-qs.com",
    phone: "+1 (555) 666-7777",
    role: "Senior QS",
    department: "Infrastructure",
    projects: 2,
    status: "online",
    avatar: "DT",
    joinedDate: "Apr 15, 2021",
  },
];

const departments = [
  { name: "Management", count: 2 },
  { name: "Commercial", count: 3 },
  { name: "Residential", count: 2 },
  { name: "Infrastructure", count: 2 },
  { name: "Cost Management", count: 2 },
];

const roleColors: Record<string, string> = {
  "Project Manager": "bg-purple-500/10 text-purple-400",
  "Senior QS": "bg-blue-500/10 text-blue-400",
  "Quantity Surveyor": "bg-emerald-500/10 text-emerald-400",
  "Cost Consultant": "bg-amber-500/10 text-amber-400",
  "Junior QS": "bg-cyan-500/10 text-cyan-400",
};

export default function TeamPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);

  const filteredMembers = teamMembers.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDepartment =
      !selectedDepartment || member.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });

  const statusColors = {
    online: "bg-emerald-500",
    away: "bg-amber-500",
    offline: "bg-slate-500",
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
          <h1 className="text-3xl font-bold text-foreground">Team</h1>
          <p className="text-muted-foreground mt-1">
            Manage your team members and their roles
          </p>
        </div>
        <button className="px-4 py-2 rounded-xl bg-primary hover:bg-primary/90 transition-colors text-sm font-medium flex items-center gap-2 text-white">
          <Plus className="w-4 h-4" />
          Add Member
        </button>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        {[
          { label: "Total Members", value: "12", icon: Shield, color: "text-blue-400" },
          { label: "Online Now", value: "8", icon: Briefcase, color: "text-emerald-400" },
          { label: "Active Projects", value: "18", icon: Calendar, color: "text-amber-400" },
          { label: "Departments", value: "5", icon: Shield, color: "text-purple-400" },
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
            placeholder="Search team members..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>

        <select
          value={selectedDepartment || ""}
          onChange={(e) => setSelectedDepartment(e.target.value || null)}
          className="px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
        >
          <option value="">All Departments</option>
          {departments.map((dept) => (
            <option key={dept.name} value={dept.name}>
              {dept.name} ({dept.count})
            </option>
          ))}
        </select>
      </motion.div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Team Members Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-3"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.05 }}
                className="card-glass group"
              >
                <div className="flex items-start gap-4">
                  <div className="relative">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-lg font-bold">
                      {member.avatar}
                    </div>
                    <span
                      className={cn(
                        "absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full border-2 border-card",
                        statusColors[member.status as keyof typeof statusColors]
                      )}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                        {member.name}
                      </h3>
                      <button className="p-1 rounded-lg hover:bg-white/10 opacity-0 group-hover:opacity-100 transition-all">
                        <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                      </button>
                    </div>
                    <span
                      className={cn(
                        "inline-block px-2 py-0.5 text-xs font-medium rounded-full mt-1",
                        roleColors[member.role]
                      )}
                    >
                      {member.role}
                    </span>
                    <p className="text-xs text-muted-foreground mt-1">
                      {member.department}
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/5 space-y-2">
                  <a
                    href={`mailto:${member.email}`}
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    {member.email}
                  </a>
                  <a
                    href={`tel:${member.phone}`}
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    {member.phone}
                  </a>
                </div>

                <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Briefcase className="w-3.5 h-3.5" />
                    {member.projects} projects
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="w-3.5 h-3.5" />
                    Joined {member.joinedDate}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Sidebar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-6"
        >
          {/* Departments */}
          <div className="card-glass">
            <h3 className="font-semibold text-foreground mb-4">Departments</h3>
            <div className="space-y-2">
              {departments.map((dept) => (
                <button
                  key={dept.name}
                  onClick={() =>
                    setSelectedDepartment(
                      selectedDepartment === dept.name ? null : dept.name
                    )
                  }
                  className={cn(
                    "w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors text-left",
                    selectedDepartment === dept.name
                      ? "bg-primary/10 text-primary"
                      : "hover:bg-white/5 text-muted-foreground hover:text-foreground"
                  )}
                >
                  <span className="text-sm font-medium">{dept.name}</span>
                  <span className="px-2 py-0.5 bg-white/10 rounded-full text-xs">
                    {dept.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="card-glass">
            <h3 className="font-semibold text-foreground mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors text-left">
                <Plus className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-foreground">Invite Team Member</span>
              </button>
              <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors text-left">
                <Shield className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-foreground">Manage Roles</span>
              </button>
              <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors text-left">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-foreground">Send Team Email</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
