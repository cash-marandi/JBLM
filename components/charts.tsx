"use client"

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedChartProps {
  data: number[];
  labels: string[];
  height?: number;
  color?: string;
  showLabels?: boolean;
  delay?: number;
}

export function AnimatedBarChart({
  data,
  labels,
  height = 200,
  color = "hsl(var(--primary))",
  showLabels = true,
  delay = 0,
}: AnimatedChartProps) {
  const maxValue = Math.max(...data);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="w-full">
      <div className="flex items-end justify-between gap-2" style={{ height }}>
        {data.map((value, index) => {
          const percentage = (value / maxValue) * 100;
          
          return (
            <div key={index} className="flex-1 flex flex-col items-center gap-2">
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: isVisible ? `${percentage}%` : 0 }}
                transition={{
                  duration: 0.8,
                  delay: delay + index * 0.1,
                  ease: [0.4, 0, 0.2, 1],
                }}
                className="w-full rounded-t-lg"
                style={{ backgroundColor: color }}
              />
              {showLabels && (
                <span className="text-[10px] text-muted-foreground">
                  {labels[index]}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

interface ProgressRingProps {
  progress: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  bgColor?: string;
  label?: string;
  sublabel?: string;
  delay?: number;
}

export function ProgressRing({
  progress,
  size = 120,
  strokeWidth = 8,
  color = "hsl(var(--primary))",
  bgColor = "rgba(255,255,255,0.1)",
  label,
  sublabel,
  delay = 0,
}: ProgressRingProps) {
  const [animatedProgress, setAnimatedProgress] = useState(0);
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (animatedProgress / 100) * circumference;

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedProgress(Math.min(progress, 100));
    }, delay * 1000);
    return () => clearTimeout(timer);
  }, [progress, delay]);

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={bgColor}
          strokeWidth={strokeWidth}
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, delay, ease: "easeOut" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {label && (
          <span className="text-2xl font-bold text-foreground">{label}</span>
        )}
        {sublabel && (
          <span className="text-xs text-muted-foreground">{sublabel}</span>
        )}
      </div>
    </div>
  );
}

interface LineChartProps {
  data: number[];
  labels: string[];
  height?: number;
  color?: string;
  gradientOpacity?: number;
  delay?: number;
}

export function AnimatedLineChart({
  data,
  labels,
  height = 200,
  color = "hsl(var(--primary))",
  gradientOpacity = 0.3,
  delay = 0,
}: LineChartProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const maxValue = Math.max(...data);
  const minValue = Math.min(...data);
  const range = maxValue - minValue || 1;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * 100;
    const y = 100 - ((value - minValue) / range) * 100;
    return { x, y };
  });

  const pathD = points.reduce((acc, point, index) => {
    if (index === 0) return `M ${point.x} ${point.y}`;
    
    const prev = points[index - 1];
    const cp1x = prev.x + (point.x - prev.x) / 3;
    const cp2x = prev.x + ((point.x - prev.x) * 2) / 3;
    
    return `${acc} C ${cp1x} ${prev.y}, ${cp2x} ${point.y}, ${point.x} ${point.y}`;
  }, "");

  const areaD = `${pathD} L 100 100 L 0 100 Z`;

  return (
    <div ref={ref} className="w-full" style={{ height }}>
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="w-full h-full"
      >
        <defs>
          <linearGradient id={`gradient-${color}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop
              offset="0%"
              stopColor={color}
              stopOpacity={gradientOpacity}
            />
            <stop
              offset="100%"
              stopColor={color}
              stopOpacity={0}
            />
          </linearGradient>
        </defs>
        
        {/* Area */}
        <motion.path
          d={areaD}
          fill={`url(#gradient-${color})`}
          initial={{ opacity: 0 }}
          animate={{ opacity: isVisible ? 1 : 0 }}
          transition={{ duration: 0.8, delay }}
        />
        
        {/* Line */}
        <motion.path
          d={pathD}
          fill="none"
          stroke={color}
          strokeWidth="0.5"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: isVisible ? 1 : 0 }}
          transition={{ duration: 1.5, delay, ease: "easeInOut" }}
        />
        
        {/* Points */}
        {points.map((point, index) => (
          <motion.circle
            key={index}
            cx={point.x}
            cy={point.y}
            r="1"
            fill={color}
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: isVisible ? 1 : 0,
              opacity: isVisible ? 1 : 0,
            }}
            transition={{
              duration: 0.3,
              delay: delay + (index / data.length) * 1.5,
            }}
          />
        ))}
      </svg>
      
      {/* Labels */}
      <div className="flex justify-between mt-2">
        {labels.slice(0, 6).map((label, index) => (
          <span key={index} className="text-[10px] text-muted-foreground">
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}

interface DonutChartProps {
  data: { value: number; color: string; label: string }[];
  size?: number;
  strokeWidth?: number;
  delay?: number;
}

export function DonutChart({
  data,
  size = 160,
  strokeWidth = 20,
  delay = 0,
}: DonutChartProps) {
  const [animatedData, setAnimatedData] = useState<typeof data>([]);
  const total = data.reduce((sum, item) => sum + item.value, 0);
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedData(data);
    }, delay * 1000);
    return () => clearTimeout(timer);
  }, [data, delay]);

  let accumulatedOffset = 0;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth={strokeWidth}
        />
        {animatedData.map((item, index) => {
          const percentage = item.value / total;
          const strokeDasharray = `${circumference * percentage} ${circumference * (1 - percentage)}`;
          const strokeDashoffset = -accumulatedOffset * circumference;
          accumulatedOffset += percentage;

          return (
            <motion.circle
              key={index}
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke={item.color}
              strokeWidth={strokeWidth}
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              initial={{ strokeDasharray: `0 ${circumference}` }}
              animate={{
                strokeDasharray: `${circumference * percentage} ${circumference * (1 - percentage)}`,
              }}
              transition={{ duration: 1, delay: delay + index * 0.2 }}
              strokeLinecap="round"
            />
          );
        })}
      </svg>
    </div>
  );
}
