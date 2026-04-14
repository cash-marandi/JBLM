"use client"

import { motion } from "framer-motion";
import {
  DollarSign,
  TrendingUp,
  Users,
  FileText,
  Clock,
  CheckCircle2,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  Eye,
  Download,
  MoreHorizontal,
  Building2,
  Briefcase,
  Calendar,
} from "lucide-react";
import { KpiCard, MiniKpiCard } from "@/components/kpi-cards";
import {
  AnimatedBarChart,
  AnimatedLineChart,
  ProgressRing,
  DonutChart,
} from "@/components/charts";
import { ProBadge } from "@/components/pro-badge";
import { isProFeatureEnabled } from "@/lib/feature-flags";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const,
    },
  },
};

const recentProjects = [
  {
    id: 1,
    name: "Riverside Tower Development",
    client: "ABC Construction",
    progress: 75,
    budget: "$2.4M",
    status: "On Track",
    lastUpdate: "2 hours ago",
  },
  {
    id: 2,
    name: "Metro Station Extension",
    client: "City Transit Authority",
    progress: 45,
    budget: "$5.8M",
    status: "At Risk",
    lastUpdate: "1 day ago",
  },
  {
    id: 3,
    name: "Oakwood Residential Complex",
    client: "Oakwood Properties",
    progress: 90,
    budget: "$1.2M",
    status: "Completed",
    lastUpdate: "3 days ago",
  },
  {
    id: 4,
    name: "Tech Park Phase 2",
    client: "Innovate Corp",
    progress: 30,
    budget: "$3.5M",
    status: "On Track",
    lastUpdate: "5 hours ago",
  },
];

const upcomingTasks = [
  {
    id: 1,
    title: "Review BOQ for Metro Station",
    due: "Today",
    priority: "high",
    assignee: "SM",
  },
  {
    id: 2,
    title: "Submit progress report",
    due: "Tomorrow",
    priority: "medium",
    assignee: "JD",
  },
  {
    id: 3,
    title: "Client meeting - Riverside Tower",
    due: "Mar 15",
    priority: "low",
    assignee: "AK",
  },
  {
    id: 4,
    title: "Finalize cost estimates",
    due: "Mar 16",
    priority: "high",
    assignee: "SM",
  },
];

const teamActivity = [
  {
    user: "Sarah Mitchell",
    action: "updated BOQ for",
    target: "Riverside Tower",
    time: "5 min ago",
    avatar: "SM",
  },
  {
    user: "James Davis",
    action: "added comment to",
    target: "Metro Station Extension",
    time: "1 hour ago",
    avatar: "JD",
  },
  {
    user: "Anna Kowalski",
    action: "approved",
    target: "Invoice #1234",
    time: "2 hours ago",
    avatar: "AK",
  },
  {
    user: "Michael Chen",
    action: "created report",
    target: "Monthly Summary",
    time: "3 hours ago",
    avatar: "MC",
  },
];

export default function DashboardPage() {
  const showAdvancedCharts = isProFeatureEnabled("ADVANCED_CHARTS");
  const showFinancialForecasting = isProFeatureEnabled("FINANCIAL_FORECASTING");

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Welcome Section */}
      <motion.div variants={itemVariants} className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Welcome back, Sarah
          </h1>
          <p className="text-muted-foreground mt-1">
            Here&apos;s what&apos;s happening with your projects today.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-sm font-medium flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export Report
          </button>
          <button className="px-4 py-2 rounded-xl bg-primary hover:bg-primary/90 transition-colors text-sm font-medium flex items-center gap-2 text-white">
            <Plus className="w-4 h-4" />
            New Project
          </button>
        </div>
      </motion.div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          title="Total Projects"
          value="24"
          change={12}
          changeLabel="vs last month"
          icon={Briefcase}
          iconColor="text-blue-400"
          iconBg="bg-blue-500/10"
          delay={0.1}
        />
        <KpiCard
          title="Active Projects"
          value="18"
          change={8}
          changeLabel="vs last month"
          icon={TrendingUp}
          iconColor="text-emerald-400"
          iconBg="bg-emerald-500/10"
          delay={0.2}
        />
        <KpiCard
          title="Total Value"
          value="$48.5M"
          change={15}
          changeLabel="vs last month"
          icon={DollarSign}
          iconColor="text-amber-400"
          iconBg="bg-amber-500/10"
          delay={0.3}
        />
        <KpiCard
          title="Team Members"
          value="12"
          change={0}
          icon={Users}
          iconColor="text-purple-400"
          iconBg="bg-purple-500/10"
          delay={0.4}
        />
      </div>

      {/* Charts Section */}
      {showAdvancedCharts && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Project Overview Chart */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-2 card-glass"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  Project Overview
                </h3>
                <p className="text-sm text-muted-foreground">
                  Monthly project completion trend
                </p>
              </div>
              <ProBadge feature="ADVANCED_CHARTS" size="sm" />
            </div>
            <AnimatedLineChart
              data={[30, 45, 35, 50, 40, 60, 55, 70, 65, 80, 75, 90]}
              labels={["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]}
              height={280}
              color="hsl(217, 91%, 60%)"
              delay={0.3}
            />
          </motion.div>

          {/* Project Status Distribution */}
          <motion.div variants={itemVariants} className="card-glass">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-foreground">
                Project Status
              </h3>
            </div>
            <div className="flex flex-col items-center">
              <DonutChart
                data={[
                  { value: 12, color: "hsl(217, 91%, 60%)", label: "On Track" },
                  { value: 4, color: "hsl(142, 71%, 45%)", label: "Completed" },
                  { value: 2, color: "hsl(38, 92%, 50%)", label: "At Risk" },
                  { value: 2, color: "hsl(0, 84%, 60%)", label: "Delayed" },
                ]}
                size={180}
                strokeWidth={24}
                delay={0.4}
              />
              <div className="flex flex-wrap justify-center gap-4 mt-6">
                {[
                  { color: "bg-blue-500", label: "On Track" },
                  { color: "bg-emerald-500", label: "Completed" },
                  { color: "bg-amber-500", label: "At Risk" },
                  { color: "bg-red-500", label: "Delayed" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-2">
                    <span className={`w-3 h-3 rounded-full ${item.color}`} />
                    <span className="text-xs text-muted-foreground">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Projects */}
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <div className="card-glass">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  Recent Projects
                </h3>
                <p className="text-sm text-muted-foreground">
                  Your most recent project activity
                </p>
              </div>
              <button className="text-sm text-primary hover:underline">
                View all
              </button>
            </div>
            
            <div className="space-y-4">
              {recentProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors cursor-pointer group"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-primary" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium text-foreground truncate">
                        {project.name}
                      </h4>
                      <span
                        className={`px-2 py-0.5 text-[10px] font-medium rounded-full ${
                          project.status === "On Track"
                            ? "bg-emerald-500/10 text-emerald-400"
                            : project.status === "At Risk"
                            ? "bg-amber-500/10 text-amber-400"
                            : "bg-blue-500/10 text-blue-400"
                        }`}
                      >
                        {project.status}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {project.client}
                    </p>
                  </div>
                  
                  <div className="hidden md:block text-right">
                    <p className="text-sm font-medium text-foreground">
                      {project.budget}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {project.lastUpdate}
                    </p>
                  </div>
                  
                  <div className="w-24 hidden sm:block">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-muted-foreground">
                        Progress
                      </span>
                      <span className="text-xs font-medium text-foreground">
                        {project.progress}%
                      </span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${project.progress}%` }}
                        transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                        className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                      />
                    </div>
                  </div>
                  
                  <button className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors opacity-0 group-hover:opacity-100">
                    <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <motion.div variants={itemVariants} className="card-glass">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Quick Stats
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <MiniKpiCard
                title="This Week"
                value="3"
                progress={75}
                color="primary"
                delay={0.5}
              />
              <MiniKpiCard
                title="Pending"
                value="8"
                progress={40}
                color="amber"
                delay={0.6}
              />
              <MiniKpiCard
                title="Invoices"
                value="$45K"
                progress={60}
                color="emerald"
                delay={0.7}
              />
              <MiniKpiCard
                title="Clients"
                value="15"
                progress={80}
                color="purple"
                delay={0.8}
              />
            </div>
          </motion.div>

          {/* Upcoming Tasks */}
          <motion.div variants={itemVariants} className="card-glass">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">
                Upcoming Tasks
              </h3>
              <button className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
                <Plus className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
            
            <div className="space-y-3">
              {upcomingTasks.map((task, index) => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-xs font-bold">
                    {task.assignee}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {task.title}
                    </p>
                    <p className="text-xs text-muted-foreground">{task.due}</p>
                  </div>
                  <span
                    className={`w-2 h-2 rounded-full ${
                      task.priority === "high"
                        ? "bg-red-500"
                        : task.priority === "medium"
                        ? "bg-amber-500"
                        : "bg-slate-500"
                    }`}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Team Activity */}
          <motion.div variants={itemVariants} className="card-glass">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">
                Team Activity
              </h3>
            </div>
            
            <div className="space-y-4">
              {teamActivity.map((activity, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                    {activity.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground">
                      <span className="font-medium">{activity.user}</span>{" "}
                      <span className="text-muted-foreground">
                        {activity.action}
                      </span>{" "}
                      <span className="font-medium">{activity.target}</span>
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {activity.time}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Financial Forecasting Section */}
      {showFinancialForecasting && (
        <motion.div variants={itemVariants} className="card-glass">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground">
                Financial Overview
                <ProBadge feature="FINANCIAL_FORECASTING" size="sm" className="ml-2" />
              </h3>
              <p className="text-sm text-muted-foreground">
                Cost tracking and budget analysis
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1.5 text-sm rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                Monthly
              </button>
              <button className="px-3 py-1.5 text-sm rounded-lg bg-primary text-white">
                Quarterly
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="flex flex-col items-center p-4 rounded-xl bg-white/5">
              <ProgressRing
                progress={85}
                size={100}
                strokeWidth={8}
                color="hsl(217, 91%, 60%)"
                label="85%"
                sublabel="Budget Used"
                delay={0.6}
              />
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Total Budget</p>
                <p className="text-2xl font-bold text-foreground">$48.5M</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Spent</p>
                <p className="text-2xl font-bold text-foreground">$41.2M</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Remaining</p>
                <p className="text-2xl font-bold text-emerald-400">$7.3M</p>
              </div>
            </div>
            <div className="md:col-span-2">
              <p className="text-sm text-muted-foreground mb-3">
                Cost by Category
              </p>
              <AnimatedBarChart
                data={[40, 25, 20, 15]}
                labels={["Labor", "Materials", "Equipment", "Other"]}
                height={150}
                color="hsl(142, 71%, 45%)"
                delay={0.7}
              />
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
