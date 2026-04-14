/**
 * JBLM QS Pro - Feature Flags Configuration
 * 
 * Toggle PRO features by setting IS_ENABLED to true/false
 * These flags control which features appear in the application
 */

export interface FeatureToggle {
  IS_ENABLED: boolean;
  DESCRIPTION: string;
}

export const FEATURE_FLAGS = {
  PRO: {
    IS_ENABLED: true,
    ADVANCED_CHARTS: {
      IS_ENABLED: true,
      DESCRIPTION: "Advanced analytics and custom charts on dashboard",
    } as FeatureToggle,
    AI_MEASUREMENT_CAPTURE: {
      IS_ENABLED: false,
      DESCRIPTION: "AI-powered measurement extraction from images",
    } as FeatureToggle,
    REAL_TIME_COLLABORATION: {
      IS_ENABLED: true,
      DESCRIPTION: "Live multiplayer editing in BOQ and documents",
    } as FeatureToggle,
    CLIENT_PORTAL: {
      IS_ENABLED: true,
      DESCRIPTION: "Client-facing portal for project visibility",
    } as FeatureToggle,
    VIDEO_CALLS: {
      IS_ENABLED: true,
      DESCRIPTION: "Built-in video conferencing for team meetings",
    } as FeatureToggle,
    AUTOMATED_REPORTS: {
      IS_ENABLED: true,
      DESCRIPTION: "Scheduled automated report generation",
    } as FeatureToggle,
    COST_DATABASE: {
      IS_ENABLED: true,
      DESCRIPTION: "Industry rate library and cost estimates",
    } as FeatureToggle,
    FINANCIAL_FORECASTING: {
      IS_ENABLED: true,
      DESCRIPTION: "Cost-to-complete and cash flow projections",
    } as FeatureToggle,
    RESOURCE_PLANNER: {
      IS_ENABLED: true,
      DESCRIPTION: "Team workload and Gantt chart planning",
    } as FeatureToggle,
    E_SIGNATURE: {
      IS_ENABLED: false,
      DESCRIPTION: "Electronic signature for document approvals",
    } as FeatureToggle,
  },

  FREE: {
    BASIC_DASHBOARD: {
      IS_ENABLED: true,
      DESCRIPTION: "Core dashboard with project overview",
    } as FeatureToggle,
    TEAM_CHAT: {
      IS_ENABLED: true,
      DESCRIPTION: "Team messaging and discussions",
    } as FeatureToggle,
    ISSUE_TRACKER: {
      IS_ENABLED: true,
      DESCRIPTION: "Task and defect management",
    } as FeatureToggle,
    FILE_SHARING: {
      IS_ENABLED: true,
      DESCRIPTION: "Document upload and sharing",
    } as FeatureToggle,
    PROJECT_TIMELINE: {
      IS_ENABLED: true,
      DESCRIPTION: "Basic project milestone tracking",
    } as FeatureToggle,
  },

  UI: {
    DARK_MODE: {
      IS_ENABLED: true,
      DESCRIPTION: "Dark theme option",
    } as FeatureToggle,
    ANIMATIONS: {
      IS_ENABLED: true,
      DESCRIPTION: "Scroll animations and transitions",
    } as FeatureToggle,
    NOTIFICATIONS: {
      IS_ENABLED: true,
      DESCRIPTION: "Real-time notification system",
    } as FeatureToggle,
    QUICK_ACTIONS: {
      IS_ENABLED: true,
      DESCRIPTION: "Keyboard shortcuts and quick actions",
    } as FeatureToggle,
  },
} as const;

type ProFeature = 'ADVANCED_CHARTS' | 'AI_MEASUREMENT_CAPTURE' | 'REAL_TIME_COLLABORATION' | 'CLIENT_PORTAL' | 'VIDEO_CALLS' | 'AUTOMATED_REPORTS' | 'COST_DATABASE' | 'FINANCIAL_FORECASTING' | 'RESOURCE_PLANNER' | 'E_SIGNATURE';
type FreeFeature = 'BASIC_DASHBOARD' | 'TEAM_CHAT' | 'ISSUE_TRACKER' | 'FILE_SHARING' | 'PROJECT_TIMELINE';
type UiFeature = 'DARK_MODE' | 'ANIMATIONS' | 'NOTIFICATIONS' | 'QUICK_ACTIONS';

export function isProFeatureEnabled(feature: ProFeature): boolean {
  const masterEnabled = FEATURE_FLAGS.PRO.IS_ENABLED;
  const featureEnabled = (FEATURE_FLAGS.PRO[feature] as FeatureToggle).IS_ENABLED;
  return masterEnabled && featureEnabled;
}

export function isFreeFeatureEnabled(feature: FreeFeature): boolean {
  return (FEATURE_FLAGS.FREE[feature] as FeatureToggle).IS_ENABLED;
}

export function isUiFeatureEnabled(feature: UiFeature): boolean {
  return (FEATURE_FLAGS.UI[feature] as FeatureToggle).IS_ENABLED;
}

export function getEnabledProFeatures(): string[] {
  const enabled: string[] = [];
  if (!FEATURE_FLAGS.PRO.IS_ENABLED) return enabled;
  
  const proFeatures: ProFeature[] = [
    'ADVANCED_CHARTS', 'AI_MEASUREMENT_CAPTURE', 'REAL_TIME_COLLABORATION',
    'CLIENT_PORTAL', 'VIDEO_CALLS', 'AUTOMATED_REPORTS', 'COST_DATABASE',
    'FINANCIAL_FORECASTING', 'RESOURCE_PLANNER', 'E_SIGNATURE'
  ];
  
  proFeatures.forEach(key => {
    if ((FEATURE_FLAGS.PRO[key] as FeatureToggle).IS_ENABLED) {
      enabled.push(key);
    }
  });
  
  return enabled;
}

export function getProBadgeColor(feature: ProFeature): 'amber' | 'emerald' | 'blue' {
  const priorityFeatures: ProFeature[] = ['AI_MEASUREMENT_CAPTURE', 'REAL_TIME_COLLABORATION', 'VIDEO_CALLS', 'E_SIGNATURE'];
  if (priorityFeatures.includes(feature)) return 'amber';
  
  const importantFeatures: ProFeature[] = ['CLIENT_PORTAL', 'ADVANCED_CHARTS', 'AUTOMATED_REPORTS', 'FINANCIAL_FORECASTING'];
  if (importantFeatures.includes(feature)) return 'emerald';
  
  return 'blue';
}
