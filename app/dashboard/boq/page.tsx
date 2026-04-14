"use client"

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Plus,
  Download,
  Upload,
  Filter,
  MoreHorizontal,
  FileText,
  Users,
  Clock,
  CheckCircle2,
  MessageSquare,
  History,
  Table,
  Pencil,
  Save,
  X,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ProBadge } from "@/components/pro-badge";
import { isProFeatureEnabled } from "@/lib/feature-flags";

const sampleBoqData = [
  {
    id: 1,
    element: "Preliminaries",
    description: "General conditions and site setup",
    quantity: 1,
    unit: "item",
    rate: 50000,
    amount: 50000,
    status: "approved",
  },
  {
    id: 2,
    element: "Excavation",
    description: "Bulk excavation for foundations",
    quantity: 2500,
    unit: "m³",
    rate: 25,
    amount: 62500,
    status: "approved",
  },
  {
    id: 3,
    element: "Concrete Works",
    description: "Foundation concrete (C30/37)",
    quantity: 800,
    unit: "m³",
    rate: 120,
    amount: 96000,
    status: "pending",
  },
  {
    id: 4,
    element: "Steel Reinforcement",
    description: "High tensile steel bars",
    quantity: 45,
    unit: "tonne",
    rate: 2500,
    amount: 112500,
    status: "pending",
  },
  {
    id: 5,
    element: "Masonry",
    description: "Dense concrete blocks",
    quantity: 2500,
    unit: "m²",
    rate: 45,
    amount: 112500,
    status: "draft",
  },
  {
    id: 6,
    element: "Carpentry",
    description: "Door frames and hardware",
    quantity: 45,
    unit: "no",
    rate: 350,
    amount: 15750,
    status: "draft",
  },
];

const collaborators = [
  { name: "Sarah Mitchell", avatar: "SM", status: "online", cursor: "Row 3" },
  { name: "James Davis", avatar: "JD", status: "online", cursor: "Row 5" },
];

export default function BoqEditorPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [editingRow, setEditingRow] = useState<number | null>(null);
  const [boqData, setBoqData] = useState(sampleBoqData);
  const [showFilters, setShowFilters] = useState(false);
  
  const showCollaboration = isProFeatureEnabled("REAL_TIME_COLLABORATION");

  const totalAmount = boqData.reduce((sum, item) => sum + item.amount, 0);
  
  const statusColors = {
    approved: "bg-emerald-500/10 text-emerald-400",
    pending: "bg-amber-500/10 text-amber-400",
    draft: "bg-slate-500/10 text-slate-400",
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div className="flex items-center gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-bold text-foreground">BOQ Editor</h1>
              {showCollaboration && (
                <ProBadge feature="REAL_TIME_COLLABORATION" size="sm" />
              )}
            </div>
            <p className="text-muted-foreground mt-1">
              Bill of Quantities - Riverside Tower Development
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Collaborators */}
          {showCollaboration && (
            <div className="flex items-center gap-2 pr-4 border-r border-white/10">
              <div className="flex -space-x-2">
                {collaborators.map((collab, i) => (
                  <div
                    key={i}
                    className="relative"
                    title={`${collab.name} - ${collab.cursor}`}
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-xs font-bold border-2 border-background">
                      {collab.avatar}
                    </div>
                    <span
                      className={cn(
                        "absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-background",
                        collab.status === "online"
                          ? "bg-emerald-500"
                          : "bg-slate-500"
                      )}
                    />
                  </div>
                ))}
              </div>
              <span className="text-xs text-muted-foreground">
                {collaborators.length} editing
              </span>
            </div>
          )}

          <button className="px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-sm font-medium flex items-center gap-2">
            <History className="w-4 h-4" />
            History
          </button>
          <button className="px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-sm font-medium flex items-center gap-2">
            <Upload className="w-4 h-4" />
            Import
          </button>
          <button className="px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-sm font-medium flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export
          </button>
          <button className="px-4 py-2 rounded-xl bg-primary hover:bg-primary/90 transition-colors text-sm font-medium flex items-center gap-2 text-white">
            <Save className="w-4 h-4" />
            Save
          </button>
        </div>
      </motion.div>

      {/* Toolbar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between"
      >
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search elements..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={cn(
              "p-2.5 rounded-xl transition-colors",
              showFilters
                ? "bg-primary text-white"
                : "bg-white/5 text-muted-foreground hover:bg-white/10"
            )}
          >
            <Filter className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-2xl font-bold text-foreground">
              £{totalAmount.toLocaleString()}
            </p>
            <p className="text-xs text-muted-foreground">Total Amount</p>
          </div>
          <button className="px-4 py-2 rounded-xl bg-primary hover:bg-primary/90 transition-colors text-sm font-medium flex items-center gap-2 text-white">
            <Plus className="w-4 h-4" />
            Add Row
          </button>
        </div>
      </motion.div>

      {/* Filters Panel */}
      {showFilters && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="p-4 rounded-xl bg-white/5 border border-white/10"
        >
          <div className="flex flex-wrap gap-3">
            {["All", "Approved", "Pending", "Draft"].map((status) => (
              <button
                key={status}
                className="px-3 py-1.5 rounded-lg text-sm font-medium bg-white/5 hover:bg-white/10 transition-colors"
              >
                {status}
              </button>
            ))}
          </div>
        </motion.div>
      )}

      {/* BOQ Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="rounded-2xl border border-white/10 overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-white/5">
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Element
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Description
                </th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Qty
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Unit
                </th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Rate (£)
                </th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Amount (£)
                </th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {boqData.map((row, index) => (
                <tr
                  key={row.id}
                  className={cn(
                    "hover:bg-white/5 transition-colors",
                    editingRow === row.id && "bg-primary/5"
                  )}
                >
                  <td className="px-4 py-3">
                    <span className="font-medium text-foreground">
                      {row.element}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-muted-foreground">
                      {row.description}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    {editingRow === row.id ? (
                      <input
                        type="number"
                        defaultValue={row.quantity}
                        className="w-20 px-2 py-1 bg-white/10 border border-white/20 rounded text-sm text-foreground text-right focus:outline-none focus:ring-2 focus:ring-primary/50"
                      />
                    ) : (
                      <span className="text-foreground">{row.quantity.toLocaleString()}</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-0.5 bg-white/10 rounded text-sm text-muted-foreground">
                      {row.unit}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    {editingRow === row.id ? (
                      <input
                        type="number"
                        defaultValue={row.rate}
                        className="w-24 px-2 py-1 bg-white/10 border border-white/20 rounded text-sm text-foreground text-right focus:outline-none focus:ring-2 focus:ring-primary/50"
                      />
                    ) : (
                      <span className="text-foreground">
                        {row.rate.toLocaleString()}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span className="font-semibold text-foreground">
                      {row.amount.toLocaleString()}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span
                      className={cn(
                        "px-2 py-0.5 text-xs font-medium rounded-full",
                        statusColors[row.status as keyof typeof statusColors]
                      )}
                    >
                      {row.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center gap-1">
                      <button
                        onClick={() =>
                          setEditingRow(editingRow === row.id ? null : row.id)
                        }
                        className={cn(
                          "p-1.5 rounded-lg transition-colors",
                          editingRow === row.id
                            ? "bg-emerald-500/20 text-emerald-400"
                            : "hover:bg-white/10 text-muted-foreground hover:text-foreground"
                        )}
                      >
                        {editingRow === row.id ? (
                          <CheckCircle2 className="w-4 h-4" />
                        ) : (
                          <Pencil className="w-4 h-4" />
                        )}
                      </button>
                      <button className="p-1.5 rounded-lg hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors">
                        <MessageSquare className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 rounded-lg hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-white/5">
                <td colSpan={5} className="px-4 py-4 text-right font-semibold text-foreground">
                  Total:
                </td>
                <td className="px-4 py-4 text-right font-bold text-lg text-foreground">
                  £{totalAmount.toLocaleString()}
                </td>
                <td colSpan={2}></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </motion.div>

      {/* Comments Panel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="card-glass"
      >
        <div className="flex items-center gap-2 mb-4">
          <MessageSquare className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-foreground">Recent Comments</h3>
        </div>
        <div className="space-y-4">
          {[
            {
              user: "Sarah Mitchell",
              avatar: "SM",
              comment: "Please verify the excavation quantities for section B.",
              time: "10 min ago",
            },
            {
              user: "James Davis",
              avatar: "JD",
              comment: "Concrete rates have been updated based on latest supplier quote.",
              time: "1 hour ago",
            },
          ].map((comment, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                {comment.avatar}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-foreground text-sm">
                    {comment.user}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {comment.time}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mt-0.5">
                  {comment.comment}
                </p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
