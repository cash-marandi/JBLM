"use client"

import { getProBadgeColor } from "@/lib/feature-flags";

interface ProBadgeProps {
  feature?: string;
  size?: "sm" | "md" | "lg";
  variant?: "amber" | "emerald" | "blue";
  showIcon?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: "px-1.5 py-0.5 text-[10px]",
  md: "px-2 py-1 text-xs",
  lg: "px-3 py-1.5 text-sm",
};

const colorClasses = {
  amber: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  emerald: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  blue: "bg-blue-500/20 text-blue-400 border-blue-500/30",
};

const iconSizes = {
  sm: "w-3 h-3",
  md: "w-3.5 h-3.5",
  lg: "w-4 h-4",
};

export function ProBadge({
  feature,
  size = "sm",
  variant,
  showIcon = true,
  className = "",
}: ProBadgeProps) {
  const colorVariant = variant || (feature ? getProBadgeColor(feature as Parameters<typeof getProBadgeColor>[0]) : "amber");
  
  return (
    <span
      className={`
        inline-flex items-center gap-1 font-semibold uppercase tracking-wider
        border rounded-full backdrop-blur-sm
        ${sizeClasses[size]}
        ${colorClasses[colorVariant]}
        ${className}
      `}
    >
      {showIcon && (
        <svg
          className={iconSizes[size]}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      )}
      <span>PRO</span>
    </span>
  );
}

interface ProGateProps {
  children: React.ReactNode;
  feature: string;
  fallback?: React.ReactNode;
  showBadge?: boolean;
}

export function ProGate({
  children,
  feature,
  fallback,
  showBadge = true,
}: ProGateProps) {
  const isEnabled = feature.startsWith("PRO.") 
    ? require("@/lib/feature-flags").isProFeatureEnabled(feature.replace("PRO.", "") as any)
    : require("@/lib/feature-flags").isFreeFeatureEnabled(feature as any);
  
  if (!isEnabled) {
    return fallback ? <>{fallback}</> : null;
  }
  
  return (
    <div className="relative inline-flex">
      {children}
      {showBadge && (
        <div className="absolute -top-2 -right-2">
          <ProBadge feature={feature.replace("PRO.", "")} />
        </div>
      )}
    </div>
  );
}
