"use client"

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Plus,
  Filter,
  Building2,
  Mail,
  Phone,
  Globe,
  MapPin,
  MoreHorizontal,
  ExternalLink,
  Eye,
  MessageSquare,
  FileText,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ProBadge } from "@/components/pro-badge";
import { isProFeatureEnabled } from "@/lib/feature-flags";

const clients = [
  {
    id: 1,
    name: "ABC Construction",
    contact: "John Smith",
    email: "john@abc-construction.com",
    phone: "+1 (555) 123-4567",
    website: "www.abc-construction.com",
    address: "123 Business Ave, New York, NY 10001",
    projects: 4,
    totalValue: "$12.5M",
    status: "active",
  },
  {
    id: 2,
    name: "City Transit Authority",
    contact: "Sarah Johnson",
    email: "sarah@citytransit.gov",
    phone: "+1 (555) 234-5678",
    website: "www.citytransit.gov",
    address: "456 Government Plaza, New York, NY 10002",
    projects: 2,
    totalValue: "$8.2M",
    status: "active",
  },
  {
    id: 3,
    name: "Oakwood Properties",
    contact: "Michael Chen",
    email: "michael@oakwoodproperties.com",
    phone: "+1 (555) 345-6789",
    website: "www.oakwoodproperties.com",
    address: "789 Oak Street, New York, NY 10003",
    projects: 3,
    totalValue: "$4.8M",
    status: "active",
  },
  {
    id: 4,
    name: "Innovate Corp",
    contact: "Emily Davis",
    email: "emily@innovatecorp.com",
    phone: "+1 (555) 456-7890",
    website: "www.innovatecorp.com",
    address: "321 Tech Boulevard, New York, NY 10004",
    projects: 1,
    totalValue: "$3.5M",
    status: "active",
  },
  {
    id: 5,
    name: "Public Works Department",
    contact: "Robert Wilson",
    email: "robert@publicworks.gov",
    phone: "+1 (555) 567-8901",
    website: "www.publicworks.gov",
    address: "654 Civic Center, New York, NY 10005",
    projects: 2,
    totalValue: "$6.2M",
    status: "active",
  },
];

const recentActivity = [
  {
    id: 1,
    client: "ABC Construction",
    action: "Reviewed BOQ for Riverside Tower",
    time: "2 hours ago",
  },
  {
    id: 2,
    client: "Oakwood Properties",
    action: "Approved monthly progress report",
    time: "5 hours ago",
  },
  {
    id: 3,
    client: "City Transit Authority",
    action: "Requested changes to Metro Station estimate",
    time: "1 day ago",
  },
];

export default function ClientsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClient, setSelectedClient] = useState<typeof clients[0] | null>(null);
  
  const showClientPortal = isProFeatureEnabled("CLIENT_PORTAL");

  const filteredClients = clients.filter(
    (client) =>
      client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.contact.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
            <h1 className="text-3xl font-bold text-foreground">Clients</h1>
            {showClientPortal && (
              <ProBadge feature="CLIENT_PORTAL" size="sm" />
            )}
          </div>
          <p className="text-muted-foreground mt-1">
            Manage client relationships and portal access
          </p>
        </div>
        <div className="flex items-center gap-3">
          {showClientPortal && (
            <button className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 transition-colors text-sm font-medium flex items-center gap-2 text-white">
              <ExternalLink className="w-4 h-4" />
              Client Portal
            </button>
          )}
          <button className="px-4 py-2 rounded-xl bg-primary hover:bg-primary/90 transition-colors text-sm font-medium flex items-center gap-2 text-white">
            <Plus className="w-4 h-4" />
            Add Client
          </button>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        {[
          { label: "Total Clients", value: "24", icon: Building2, color: "text-blue-400" },
          { label: "Active Projects", value: "18", icon: FileText, color: "text-emerald-400" },
          { label: "Total Value", value: "$48.5M", icon: Building2, color: "text-amber-400" },
          { label: "Pending Reviews", value: "3", icon: MessageSquare, color: "text-purple-400" },
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

      {/* Search and Filter */}
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
            placeholder="Search clients..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
        <button className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-sm font-medium flex items-center gap-2">
          <Filter className="w-4 h-4" />
          Filters
        </button>
      </motion.div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Clients List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2 space-y-4"
        >
          {filteredClients.map((client, index) => (
            <motion.div
              key={client.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.05 }}
              onClick={() => setSelectedClient(client)}
              className={cn(
                "card-glass cursor-pointer transition-all",
                selectedClient?.id === client.id && "ring-2 ring-primary"
              )}
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center flex-shrink-0">
                  <Building2 className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-foreground">
                        {client.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {client.contact}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-emerald-500/10 text-emerald-400">
                        {client.status}
                      </span>
                      <button className="p-1.5 rounded-lg hover:bg-white/10 transition-colors">
                        <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-4 mt-3">
                    <a
                      href={`mailto:${client.email}`}
                      className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      {client.email}
                    </a>
                    <a
                      href={`tel:${client.phone}`}
                      className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      {client.phone}
                    </a>
                  </div>

                  <div className="flex items-center gap-4 mt-3 pt-3 border-t border-white/5">
                    <div className="text-center">
                      <p className="text-lg font-bold text-foreground">
                        {client.projects}
                      </p>
                      <p className="text-xs text-muted-foreground">Projects</p>
                    </div>
                    <div className="h-8 w-px bg-white/10" />
                    <div className="text-center">
                      <p className="text-lg font-bold text-foreground">
                        {client.totalValue}
                      </p>
                      <p className="text-xs text-muted-foreground">Total Value</p>
                    </div>
                    {showClientPortal && (
                      <>
                        <div className="h-8 w-px bg-white/10" />
                        <div className="flex items-center gap-1">
                          <Eye className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-xs text-emerald-400 font-medium">
                            Portal Access
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Sidebar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-6"
        >
          {/* Selected Client Details */}
          {selectedClient && (
            <div className="card-glass">
              <h3 className="font-semibold text-foreground mb-4">
                {selectedClient.name}
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" />
                  <span className="text-sm text-muted-foreground">
                    {selectedClient.address}
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <Globe className="w-4 h-4 text-muted-foreground mt-0.5" />
                  <a
                    href={`https://${selectedClient.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline"
                  >
                    {selectedClient.website}
                  </a>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <button className="flex-1 px-3 py-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors text-sm font-medium">
                  View Projects
                </button>
                <button className="flex-1 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-sm font-medium">
                  Send Message
                </button>
              </div>
            </div>
          )}

          {/* Recent Activity */}
          <div className="card-glass">
            <h3 className="font-semibold text-foreground mb-4">
              Recent Client Activity
            </h3>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                  <div className="flex-1">
                    <p className="text-sm text-foreground">
                      <span className="font-medium">{activity.client}</span>
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {activity.action}
                    </p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
