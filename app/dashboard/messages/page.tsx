"use client"

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Send,
  Paperclip,
  Smile,
  MoreHorizontal,
  Phone,
  Video,
  Users,
  Hash,
  Star,
  Circle,
  Image,
  File,
  AtSign,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";

const channels = [
  { id: 1, name: "general", unread: 0, type: "channel" },
  { id: 2, name: "projects", unread: 3, type: "channel" },
  { id: 3, name: "announcements", unread: 1, type: "channel" },
  { id: 4, name: "riverside-tower", unread: 5, type: "project" },
  { id: 5, name: "metro-station", unread: 0, type: "project" },
];

const directMessages = [
  { id: 1, name: "James Davis", avatar: "JD", status: "online", unread: 2 },
  { id: 2, name: "Anna Kowalski", avatar: "AK", status: "away", unread: 0 },
  { id: 3, name: "Michael Chen", avatar: "MC", status: "offline", unread: 1 },
];

const messages = [
  {
    id: 1,
    user: "Sarah Mitchell",
    avatar: "SM",
    content: "Good morning team! Quick reminder about the client meeting at 2 PM today.",
    time: "9:00 AM",
    type: "text",
  },
  {
    id: 2,
    user: "James Davis",
    avatar: "JD",
    content: "Thanks for the reminder! I've prepared the BOQ summary for the presentation.",
    time: "9:15 AM",
    type: "text",
  },
  {
    id: 3,
    user: "Anna Kowalski",
    avatar: "AK",
    content: "I've uploaded the latest drawings to the project folder. Please review before the meeting.",
    time: "9:30 AM",
    type: "file",
    file: { name: "Riverside_Tower_Drawings_v2.pdf", size: "2.4 MB" },
  },
  {
    id: 4,
    user: "Michael Chen",
    avatar: "MC",
    content: "Just finished the cost analysis. The current variance is within acceptable limits.",
    time: "10:00 AM",
    type: "text",
  },
  {
    id: 5,
    user: "Sarah Mitchell",
    avatar: "SM",
    content: "Great work Michael! Can you also send over the breakdown by category?",
    time: "10:05 AM",
    type: "text",
  },
  {
    id: 6,
    user: "Michael Chen",
    avatar: "MC",
    content: "Sure thing! Sending it over now.",
    time: "10:10 AM",
    type: "text",
  },
];

export default function MessagesPage() {
  const [selectedChannel, setSelectedChannel] = useState(channels[1]);
  const [searchQuery, setSearchQuery] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [showSidebar, setShowSidebar] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const statusColors = {
    online: "bg-emerald-500",
    away: "bg-amber-500",
    offline: "bg-slate-500",
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex rounded-2xl overflow-hidden border border-white/10">
      {/* Channels Sidebar */}
      <AnimatePresence>
        {showSidebar && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 280, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="bg-sidebar border-r border-white/10 flex flex-col"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/10">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-foreground">Messages</h2>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search messages..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
            </div>

            {/* Channels List */}
            <div className="flex-1 overflow-y-auto p-4">
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2 px-2">
                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Channels
                  </span>
                </div>
                <div className="space-y-1">
                  {channels.map((channel) => (
                    <button
                      key={channel.id}
                      onClick={() => setSelectedChannel(channel)}
                      className={cn(
                        "w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-left",
                        selectedChannel.id === channel.id
                          ? "bg-primary/10 text-primary"
                          : "hover:bg-white/5 text-muted-foreground hover:text-foreground"
                      )}
                    >
                      <Hash className="w-4 h-4 flex-shrink-0" />
                      <span className="flex-1 text-sm truncate">
                        {channel.name}
                      </span>
                      {channel.unread > 0 && (
                        <span className="px-1.5 py-0.5 bg-primary rounded-full text-[10px] font-bold text-white">
                          {channel.unread}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2 px-2">
                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Direct Messages
                  </span>
                </div>
                <div className="space-y-1">
                  {directMessages.map((dm) => (
                    <button
                      key={dm.id}
                      onClick={() =>
                        setSelectedChannel({
                          id: dm.id,
                          name: dm.name,
                          unread: dm.unread,
                          type: "dm",
                        })
                      }
                      className={cn(
                        "w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-left",
                        selectedChannel.name === dm.name
                          ? "bg-primary/10 text-primary"
                          : "hover:bg-white/5 text-muted-foreground hover:text-foreground"
                      )}
                    >
                      <div className="relative flex-shrink-0">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-[10px] font-bold">
                          {dm.avatar}
                        </div>
                        <span
                          className={cn(
                            "absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-sidebar",
                            statusColors[dm.status as keyof typeof statusColors]
                          )}
                        />
                      </div>
                      <span className="flex-1 text-sm truncate">{dm.name}</span>
                      {dm.unread > 0 && (
                        <span className="px-1.5 py-0.5 bg-primary rounded-full text-[10px] font-bold text-white">
                          {dm.unread}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-background">
        {/* Chat Header */}
        <div className="h-16 px-6 flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowSidebar(!showSidebar)}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              <Hash className="w-5 h-5 text-muted-foreground" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-foreground">
                  {selectedChannel.type === "dm"
                    ? directMessages.find((d) => d.name === selectedChannel.name)
                        ?.name || selectedChannel.name
                    : selectedChannel.name}
                </h3>
                {selectedChannel.type === "dm" && (
                  <span
                    className={cn(
                      "w-2 h-2 rounded-full",
                      statusColors[
                        directMessages.find((d) => d.name === selectedChannel.name)
                          ?.status as keyof typeof statusColors
                      ] || "bg-slate-500"
                    )}
                  />
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                {selectedChannel.type === "dm" ? "Direct Message" : "Project Channel"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="p-2 rounded-lg hover:bg-white/10 transition-colors">
              <Users className="w-5 h-5 text-muted-foreground" />
            </button>
            <button className="p-2 rounded-lg hover:bg-white/10 transition-colors">
              <Phone className="w-5 h-5 text-muted-foreground" />
            </button>
            <button className="p-2 rounded-lg hover:bg-white/10 transition-colors">
              <Video className="w-5 h-5 text-muted-foreground" />
            </button>
            <button className="p-2 rounded-lg hover:bg-white/10 transition-colors">
              <Star className="w-5 h-5 text-muted-foreground" />
            </button>
            <button className="p-2 rounded-lg hover:bg-white/10 transition-colors">
              <MoreHorizontal className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((message, index) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-start gap-4 group"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                {message.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-foreground">
                    {message.user}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {message.time}
                  </span>
                </div>
                <p className="text-foreground mt-0.5">{message.content}</p>
                {message.type === "file" && message.file && (
                  <div className="mt-2 p-3 rounded-lg bg-white/5 border border-white/10 inline-flex items-center gap-3">
                    <File className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm text-foreground font-medium">
                        {message.file.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {message.file.size}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <div className="p-4 border-t border-white/10">
          <div className="flex items-end gap-3">
            <div className="flex-1 bg-white/5 border border-white/10 rounded-xl overflow-hidden">
              <textarea
                placeholder={`Message #${selectedChannel.name}`}
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="w-full px-4 py-3 bg-transparent text-foreground placeholder:text-muted-foreground resize-none focus:outline-none"
                rows={1}
              />
              <div className="px-4 py-2 flex items-center gap-2 border-t border-white/10">
                <button className="p-1.5 rounded hover:bg-white/10 transition-colors">
                  <Paperclip className="w-4 h-4 text-muted-foreground" />
                </button>
                <button className="p-1.5 rounded hover:bg-white/10 transition-colors">
                  <AtSign className="w-4 h-4 text-muted-foreground" />
                </button>
                <button className="p-1.5 rounded hover:bg-white/10 transition-colors">
                  <Smile className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>
            </div>
            <button
              disabled={!newMessage.trim()}
              className={cn(
                "p-3 rounded-xl transition-colors",
                newMessage.trim()
                  ? "bg-primary hover:bg-primary/90 text-white"
                  : "bg-white/5 text-muted-foreground cursor-not-allowed"
              )}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
