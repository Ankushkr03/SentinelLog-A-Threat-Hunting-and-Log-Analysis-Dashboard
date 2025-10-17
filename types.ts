
export type LogType = 'Apache' | 'Nginx' | 'SSH';

export interface Threat {
  timestamp: string;
  sourceIp: string;
  threatType: string;
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  description: string;
  logEntry: string;
}

export interface TimelineDataPoint {
  time: string;
  count: number;
}

export interface AttackTypeDistributionPoint {
  name: string;
  value: number;
}

export interface TopAttacker {
  ip: string;
  count: number;
}

export interface AnalysisResult {
  summary: {
    totalLogEntries: number;
    threatsDetected: number;
    highSeverityAlerts: number;
  };
  threats: Threat[];
  timelineData: TimelineDataPoint[];
  attackTypeDistribution: AttackTypeDistributionPoint[];
  topAttackers: TopAttacker[];
}
