"use client"

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Calendar as CalendarIcon,
  Clock,
  Users,
  MapPin,
  MoreHorizontal,
  Filter,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ProBadge } from "@/components/pro-badge";
import { isProFeatureEnabled } from "@/lib/feature-flags";

const events = [
  {
    id: 1,
    title: "Client Meeting - Riverside Tower",
    time: "10:00 AM - 11:00 AM",
    date: new Date(2024, 2, 15),
    type: "meeting",
    color: "bg-blue-500",
  },
  {
    id: 2,
    title: "BOQ Review Session",
    time: "2:00 PM - 3:30 PM",
    date: new Date(2024, 2, 15),
    type: "task",
    color: "bg-emerald-500",
  },
  {
    id: 3,
    title: "Team Standup",
    time: "9:00 AM - 9:30 AM",
    date: new Date(2024, 2, 16),
    type: "meeting",
    color: "bg-blue-500",
  },
  {
    id: 4,
    title: "Project Deadline - Metro Station",
    time: "All Day",
    date: new Date(2024, 2, 18),
    type: "deadline",
    color: "bg-red-500",
  },
  {
    id: 5,
    title: "Training Session - New QS Tools",
    time: "3:00 PM - 5:00 PM",
    date: new Date(2024, 2, 20),
    type: "event",
    color: "bg-purple-500",
  },
  {
    id: 6,
    title: "Client Presentation",
    time: "11:00 AM - 12:00 PM",
    date: new Date(2024, 2, 22),
    type: "meeting",
    color: "bg-blue-500",
  },
];

const teamWorkload = [
  { name: "Sarah Mitchell", tasks: 4, capacity: 80, avatar: "SM" },
  { name: "James Davis", tasks: 6, capacity: 95, avatar: "JD" },
  { name: "Anna Kowalski", tasks: 3, capacity: 60, avatar: "AK" },
  { name: "Michael Chen", tasks: 5, capacity: 75, avatar: "MC" },
  { name: "Emily Rodriguez", tasks: 2, capacity: 40, avatar: "ER" },
];

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 2, 1));
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  
  const showResourcePlanner = isProFeatureEnabled("RESOURCE_PLANNER");

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    return { firstDay, daysInMonth };
  };

  const { firstDay, daysInMonth } = getDaysInMonth(currentDate);

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const getEventsForDate = (day: number) => {
    return events.filter(
      (event) =>
        event.date.getDate() === day &&
        event.date.getMonth() === currentDate.getMonth() &&
        event.date.getFullYear() === currentDate.getFullYear()
    );
  };

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
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
            <h1 className="text-3xl font-bold text-foreground">Calendar</h1>
            {showResourcePlanner && (
              <ProBadge feature="RESOURCE_PLANNER" size="sm" />
            )}
          </div>
          <p className="text-muted-foreground mt-1">
            Schedule and manage your team&apos;s time
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-sm font-medium flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Filters
          </button>
          <button className="px-4 py-2 rounded-xl bg-primary hover:bg-primary/90 transition-colors text-sm font-medium flex items-center gap-2 text-white">
            <Plus className="w-4 h-4" />
            New Event
          </button>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2 card-glass"
        >
          {/* Calendar Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-foreground">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>
            <div className="flex items-center gap-2">
              <button
                onClick={prevMonth}
                className="p-2 rounded-lg hover:bg-white/10 transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-muted-foreground" />
              </button>
              <button
                onClick={() => setCurrentDate(new Date(2024, 2, 1))}
                className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-sm font-medium"
              >
                Today
              </button>
              <button
                onClick={nextMonth}
                className="p-2 rounded-lg hover:bg-white/10 transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1">
            {dayNames.map((day) => (
              <div
                key={day}
                className="text-center text-xs font-semibold text-muted-foreground py-2"
              >
                {day}
              </div>
            ))}
            
            {Array.from({ length: firstDay }).map((_, i) => (
              <div key={`empty-${i}`} className="p-2" />
            ))}
            
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const dayEvents = getEventsForDate(day);
              const isSelected = selectedDate === day;
              const isToday = day === 15 && currentDate.getMonth() === 2;

              return (
                <motion.div
                  key={day}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setSelectedDate(day)}
                  className={cn(
                    "p-2 min-h-[80px] rounded-xl border transition-colors cursor-pointer",
                    isSelected
                      ? "bg-primary/10 border-primary"
                      : "bg-white/5 border-transparent hover:bg-white/5",
                    isToday && "ring-2 ring-primary ring-offset-2 ring-offset-background"
                  )}
                >
                  <span
                    className={cn(
                      "text-sm font-medium",
                      isToday ? "text-primary" : "text-foreground"
                    )}
                  >
                    {day}
                  </span>
                  {dayEvents.length > 0 && (
                    <div className="mt-1 space-y-1">
                      {dayEvents.slice(0, 2).map((event) => (
                        <div
                          key={event.id}
                          className={cn(
                            "px-1.5 py-0.5 rounded text-[10px] font-medium truncate",
                            event.color,
                            "text-white"
                          )}
                        >
                          {event.title}
                        </div>
                      ))}
                      {dayEvents.length > 2 && (
                        <span className="text-[10px] text-muted-foreground">
                          +{dayEvents.length - 2} more
                        </span>
                      )}
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Selected Date Events */}
          {selectedDate && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="card-glass"
            >
              <h3 className="font-semibold text-foreground mb-4">
                {monthNames[currentDate.getMonth()]} {selectedDate}, {currentDate.getFullYear()}
              </h3>
              <div className="space-y-3">
                {getEventsForDate(selectedDate).length > 0 ? (
                  getEventsForDate(selectedDate).map((event) => (
                    <div
                      key={event.id}
                      className="p-3 rounded-lg bg-white/5 border border-white/10"
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={cn(
                            "w-1 h-12 rounded-full",
                            event.color
                          )}
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-foreground">
                            {event.title}
                          </h4>
                          <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                            <Clock className="w-3 h-3" />
                            {event.time}
                          </div>
                        </div>
                        <button className="p-1 rounded hover:bg-white/10">
                          <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    No events scheduled
                  </p>
                )}
              </div>
            </motion.div>
          )}

          {/* Team Workload */}
          {showResourcePlanner && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="card-glass"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-foreground">
                  Team Workload
                </h3>
                <span className="text-xs text-muted-foreground">This Week</span>
              </div>
              
              <div className="space-y-4">
                {teamWorkload.map((member, index) => (
                  <div key={member.name}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-xs font-bold">
                          {member.avatar}
                        </div>
                        <span className="text-sm text-foreground">
                          {member.name.split(" ")[0]}
                        </span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {member.tasks} tasks
                      </span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${member.capacity}%` }}
                        transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
                        className={cn(
                          "h-full rounded-full",
                          member.capacity > 80
                            ? "bg-red-500"
                            : member.capacity > 60
                            ? "bg-amber-500"
                            : "bg-emerald-500"
                        )}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Upcoming */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="card-glass"
          >
            <h3 className="font-semibold text-foreground mb-4">
              Upcoming Events
            </h3>
            <div className="space-y-3">
              {events.slice(0, 3).map((event) => (
                <div
                  key={event.id}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <div className={cn("w-2 h-2 rounded-full", event.color)} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground truncate">
                      {event.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {event.date.toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
