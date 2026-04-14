"use client"

import { useState } from "react";
import { motion } from "framer-motion";
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Download,
  Filter,
  Calendar,
  PieChart,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  MoreHorizontal,
  Receipt,
  Wallet,
  CreditCard,
  Banknote,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ProBadge } from "@/components/pro-badge";
import { isProFeatureEnabled } from "@/lib/feature-flags";
import {
  AnimatedLineChart,
  AnimatedBarChart,
  ProgressRing,
  DonutChart,
} from "@/components/charts";

const financialOverview = [
  {
    id: 1,
    title: "Total Revenue",
    value: "$4.85M",
    change: 12,
    icon: DollarSign,
    color: "text-emerald-400",
    bgColor: "bg-emerald-500/10",
  },
  {
    id: 2,
    title: "Total Expenses",
    value: "$3.42M",
    change: -3,
    icon: Wallet,
    color: "text-red-400",
    bgColor: "bg-red-500/10",
  },
  {
    id: 3,
    title: "Outstanding Invoices",
    value: "$890K",
    change: 8,
    icon: Receipt,
    color: "text-amber-400",
    bgColor: "bg-amber-500/10",
  },
  {
    id: 4,
    title: "Net Profit",
    value: "$1.43M",
    change: 15,
    icon: TrendingUp,
    color: "text-blue-400",
    bgColor: "bg-blue-500/10",
  },
];

const recentInvoices = [
  {
    id: "INV-001",
    client: "ABC Construction",
    project: "Riverside Tower",
    amount: "$125,000",
    status: "Paid",
    date: "Feb 28, 2024",
  },
  {
    id: "INV-002",
    client: "City Transit Authority",
    project: "Metro Station",
    amount: "$85,000",
    status: "Pending",
    date: "Feb 25, 2024",
  },
  {
    id: "INV-003",
    client: "Oakwood Properties",
    project: "Oakwood Complex",
    amount: "$45,000",
    status: "Overdue",
    date: "Feb 20, 2024",
  },
  {
    id: "INV-004",
    client: "Innovate Corp",
    project: "Tech Park",
    amount: "$92,500",
    status: "Pending",
    date: "Mar 1, 2024",
  },
];

const cashFlowData = [30, 45, 35, 50, 42, 58, 48, 62, 55, 70, 65, 78];
const cashFlowLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export default function FinancePage() {
  const [timeRange, setTimeRange] = useState<"monthly" | "quarterly" | "yearly">("monthly");
  
  const showFinancialForecasting = isProFeatureEnabled("FINANCIAL_FORECASTING");

  const statusColors = {
    Paid: "bg-emerald-500/10 text-emerald-400",
    Pending: "bg-amber-500/10 text-amber-400",
    Overdue: "bg-red-500/10 text-red-400",
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
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold text-foreground">Finance</h1>
            {showFinancialForecasting && (
              <ProBadge feature="FINANCIAL_FORECASTING" size="sm" />
            )}
          </div>
          <p className="text-muted-foreground mt-1">
            Financial overview and cost tracking
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex gap-1 p-1 bg-white/5 rounded-lg">
            {(["monthly", "quarterly", "yearly"] as const).map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={cn(
                  "px-3 py-1.5 rounded-md text-sm font-medium transition-colors capitalize",
                  timeRange === range
                    ? "bg-white/10 text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {range}
              </button>
            ))}
          </div>
          <button className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-sm font-medium flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export
          </button>
          <button className="px-4 py-2 rounded-xl bg-primary hover:bg-primary/90 transition-colors text-sm font-medium flex items-center gap-2 text-white">
            <Plus className="w-4 h-4" />
            New Invoice
          </button>
        </div>
      </motion.div>

      {/* Financial Overview Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {financialOverview.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.05 }}
            className="card-glass"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{item.title}</p>
                <p className="text-2xl font-bold text-foreground mt-1">
                  {item.value}
                </p>
                <div className="flex items-center gap-1 mt-2">
                  {item.change > 0 ? (
                    <ArrowUpRight className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4 text-red-400" />
                  )}
                  <span
                    className={cn(
                      "text-sm font-medium",
                      item.change > 0 ? "text-emerald-400" : "text-red-400"
                    )}
                  >
                    {Math.abs(item.change)}%
                  </span>
                  <span className="text-xs text-muted-foreground">
                    vs last period
                  </span>
                </div>
              </div>
              <div className={cn("p-3 rounded-xl", item.bgColor)}>
                <item.icon className={cn("w-6 h-6", item.color)} />
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cash Flow Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 card-glass"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground">
                Cash Flow Trend
              </h3>
              <p className="text-sm text-muted-foreground">
                Monthly revenue and expenses
              </p>
            </div>
          </div>
          <AnimatedLineChart
            data={cashFlowData}
            labels={cashFlowLabels}
            height={280}
            color="hsl(142, 71%, 45%)"
            delay={0.3}
          />
        </motion.div>

        {/* Expense Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card-glass"
        >
          <h3 className="text-lg font-semibold text-foreground mb-6">
            Expense Breakdown
          </h3>
          <div className="flex flex-col items-center">
            <DonutChart
              data={[
                { value: 40, color: "hsl(217, 91%, 60%)", label: "Labor" },
                { value: 25, color: "hsl(142, 71%, 45%)", label: "Materials" },
                { value: 20, color: "hsl(38, 92%, 50%)", label: "Equipment" },
                { value: 15, color: "hsl(280, 67%, 60%)", label: "Overhead" },
              ]}
              size={180}
              strokeWidth={24}
              delay={0.4}
            />
            <div className="grid grid-cols-2 gap-4 mt-6 w-full">
              {[
                { color: "bg-blue-500", label: "Labor", value: "40%" },
                { color: "bg-emerald-500", label: "Materials", value: "25%" },
                { color: "bg-amber-500", label: "Equipment", value: "20%" },
                { color: "bg-purple-500", label: "Overhead", value: "15%" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2">
                  <span className={cn("w-3 h-3 rounded-full", item.color)} />
                  <span className="text-xs text-muted-foreground">
                    {item.label}
                  </span>
                  <span className="text-xs font-medium text-foreground ml-auto">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Recent Invoices and Cost Forecast */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Invoices */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="card-glass"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">
              Recent Invoices
            </h3>
            <button className="text-sm text-primary hover:underline">
              View all
            </button>
          </div>
          
          <div className="space-y-3">
            {recentInvoices.map((invoice) => (
              <div
                key={invoice.id}
                className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                    <Receipt className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{invoice.client}</p>
                    <p className="text-xs text-muted-foreground">
                      {invoice.project} - {invoice.id}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-foreground">{invoice.amount}</p>
                  <span
                    className={cn(
                      "px-2 py-0.5 text-xs font-medium rounded-full",
                      statusColors[invoice.status as keyof typeof statusColors]
                    )}
                  >
                    {invoice.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Cost Forecast */}
        {showFinancialForecasting && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="card-glass"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  Cost Forecast
                </h3>
                <p className="text-xs text-muted-foreground">
                  Projected expenses for next 6 months
                </p>
              </div>
              <ProBadge feature="FINANCIAL_FORECASTING" size="sm" />
            </div>
            
            <AnimatedBarChart
              data={[45, 52, 48, 65, 58, 72]}
              labels={["Mar", "Apr", "May", "Jun", "Jul", "Aug"]}
              height={200}
              color="hsl(38, 92%, 50%)"
              delay={0.5}
            />
            
            <div className="mt-4 p-4 rounded-xl bg-white/5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Projected Total (6 months)
                  </p>
                  <p className="text-2xl font-bold text-foreground">
                    $4.2M
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">
                    Confidence
                  </p>
                  <p className="text-2xl font-bold text-emerald-400">
                    85%
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Budget Utilization */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="card-glass"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              Budget Utilization
            </h3>
            <p className="text-sm text-muted-foreground">
              Current project budget status
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: "Riverside Tower", budget: "$2.4M", spent: "$1.8M", progress: 75 },
            { name: "Metro Station", budget: "$5.8M", spent: "$3.2M", progress: 55 },
            { name: "Tech Park", budget: "$3.5M", spent: "$1.05M", progress: 30 },
          ].map((project) => (
            <div key={project.name} className="space-y-3">
              <div className="flex justify-between">
                <span className="font-medium text-foreground">{project.name}</span>
                <span className="text-sm text-muted-foreground">
                  {project.spent} / {project.budget}
                </span>
              </div>
              <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${project.progress}%` }}
                  transition={{ duration: 1, delay: 0.7 }}
                  className={cn(
                    "h-full rounded-full",
                    project.progress > 80
                      ? "bg-red-500"
                      : project.progress > 50
                      ? "bg-amber-500"
                      : "bg-emerald-500"
                  )}
                />
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">
                  {project.progress}% used
                </span>
                <span
                  className={cn(
                    "font-medium",
                    project.progress > 80
                      ? "text-red-400"
                      : project.progress > 50
                      ? "text-amber-400"
                      : "text-emerald-400"
                  )}
                >
                  {project.progress > 80
                    ? "Over Budget Risk"
                    : project.progress > 50
                    ? "On Track"
                    : "Under Budget"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
