export interface AIInsight {
  id: string;
  type: 'opportunity' | 'warning' | 'success' | 'trend';
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  confidence: number;
  action?: string;
  timestamp: Date;
}

export interface PredictiveData {
  period: string;
  predicted: number;
  actual?: number;
  confidence: number;
}

export interface HeatmapData {
  hour: number;
  day: string;
  value: number;
  conversions: number;
}

export interface GeographicData {
  country: string;
  code: string;
  revenue: number;
  users: number;
  growth: number;
  coordinates: [number, number];
}

export interface CompetitorData {
  name: string;
  marketShare: number;
  trend: 'up' | 'down' | 'stable';
  change: number;
}

export interface AlertData {
  id: string;
  type: 'critical' | 'warning' | 'info';
  title: string;
  message: string;
  timestamp: Date;
  isRead: boolean;
}

// AI-Generated Insights
export const aiInsights: AIInsight[] = [
  {
    id: '1',
    type: 'opportunity',
    title: 'Instagram Campaign Optimization',
    description: 'Your Instagram campaigns show 34% higher engagement on weekends. Consider increasing weekend budget allocation.',
    impact: 'high',
    confidence: 92,
    action: 'Increase weekend budget by 25%',
    timestamp: new Date()
  },
  {
    id: '2',
    type: 'warning',
    title: 'Google Ads Performance Drop',
    description: 'CTR decreased by 15% in the last 7 days. Quality score may be affected by recent keyword changes.',
    impact: 'medium',
    confidence: 87,
    action: 'Review keyword relevance',
    timestamp: new Date()
  },
  {
    id: '3',
    type: 'success',
    title: 'TikTok ROI Breakthrough',
    description: 'TikTok campaigns achieved 6.2x ROAS, 40% above target. Consider scaling similar creative formats.',
    impact: 'high',
    confidence: 95,
    action: 'Scale successful creatives',
    timestamp: new Date()
  },
  {
    id: '4',
    type: 'trend',
    title: 'Mobile Traffic Surge',
    description: 'Mobile conversions increased 28% this month. Mobile-first strategy showing strong results.',
    impact: 'medium',
    confidence: 89,
    timestamp: new Date()
  }
];

// Predictive Analytics Data
export const predictiveData: PredictiveData[] = [
  { period: 'Jan 2025', predicted: 220000, confidence: 94 },
  { period: 'Feb 2025', predicted: 245000, confidence: 91 },
  { period: 'Mar 2025', predicted: 268000, confidence: 88 },
  { period: 'Apr 2025', predicted: 285000, confidence: 85 },
  { period: 'May 2025', predicted: 310000, confidence: 82 },
  { period: 'Jun 2025', predicted: 335000, confidence: 79 }
];

// Heatmap Data (24 hours x 7 days)
export const heatmapData: HeatmapData[] = [
  // Generate realistic heatmap data
  ...Array.from({ length: 168 }, (_, i) => {
    const hour = i % 24;
    const day = Math.floor(i / 24);
    const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    
    // Simulate realistic patterns
    let baseValue = 50;
    if (hour >= 9 && hour <= 17) baseValue += 30; // Business hours
    if (day >= 5) baseValue += 20; // Weekends
    if (hour >= 19 && hour <= 22) baseValue += 25; // Evening peak
    
    const randomVariation = Math.random() * 20 - 10;
    const value = Math.max(0, Math.min(100, baseValue + randomVariation));
    
    return {
      hour,
      day: dayNames[day],
      value: Math.round(value),
      conversions: Math.round(value * 2.5)
    };
  })
];

// Geographic Data
export const geographicData: GeographicData[] = [
  { country: 'United States', code: 'US', revenue: 1250000, users: 45000, growth: 12.5, coordinates: [-95.7129, 37.0902] },
  { country: 'United Kingdom', code: 'GB', revenue: 680000, users: 28000, growth: 8.3, coordinates: [-3.4360, 55.3781] },
  { country: 'Germany', code: 'DE', revenue: 520000, users: 22000, growth: 15.7, coordinates: [10.4515, 51.1657] },
  { country: 'France', code: 'FR', revenue: 445000, users: 19000, growth: 6.9, coordinates: [2.2137, 46.2276] },
  { country: 'Canada', code: 'CA', revenue: 380000, users: 16000, growth: 18.2, coordinates: [-106.3468, 56.1304] },
  { country: 'Australia', code: 'AU', revenue: 295000, users: 12000, growth: 22.1, coordinates: [133.7751, -25.2744] },
  { country: 'Japan', code: 'JP', revenue: 275000, users: 11000, growth: 4.8, coordinates: [138.2529, 36.2048] },
  { country: 'Netherlands', code: 'NL', revenue: 185000, users: 8500, growth: 11.3, coordinates: [5.2913, 52.1326] }
];

// Competitor Analysis
export const competitorData: CompetitorData[] = [
  { name: 'Competitor A', marketShare: 28.5, trend: 'down', change: -2.3 },
  { name: 'Your Brand', marketShare: 24.8, trend: 'up', change: 4.7 },
  { name: 'Competitor B', marketShare: 18.2, trend: 'stable', change: 0.5 },
  { name: 'Competitor C', marketShare: 15.1, trend: 'up', change: 1.8 },
  { name: 'Others', marketShare: 13.4, trend: 'down', change: -1.2 }
];

// Real-time Alerts
export const alertsData: AlertData[] = [
  {
    id: '1',
    type: 'critical',
    title: 'Campaign Budget Exceeded',
    message: 'Summer Sale campaign has exceeded daily budget by 15%',
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
    isRead: false
  },
  {
    id: '2',
    type: 'warning',
    title: 'Low Conversion Rate',
    message: 'Facebook campaign CVR dropped below 2% threshold',
    timestamp: new Date(Date.now() - 15 * 60 * 1000),
    isRead: false
  },
  {
    id: '3',
    type: 'info',
    title: 'New Audience Segment',
    message: 'AI identified high-value audience segment for targeting',
    timestamp: new Date(Date.now() - 30 * 60 * 1000),
    isRead: true
  }
];

// Advanced Metrics
export const advancedMetrics = {
  customerLifetimeValue: 2847,
  customerAcquisitionCost: 127,
  churnRate: 3.2,
  netPromoterScore: 72,
  brandSentiment: 8.4,
  marketShare: 24.8,
  competitiveIndex: 87.3,
  predictiveAccuracy: 94.2
};

// Real-time Activity Feed
export const activityFeed = [
  { id: '1', type: 'conversion' as const, message: 'New conversion from Google Ads', value: '$1,250', time: '2 min ago' },
  { id: '2', type: 'campaign' as const, message: 'Instagram campaign reached 10K impressions', time: '5 min ago' },
  { id: '3', type: 'alert' as const, message: 'Budget threshold reached for TikTok ads', time: '8 min ago' },
  { id: '4', type: 'optimization' as const, message: 'AI optimized bid strategy for Facebook', time: '12 min ago' },
  { id: '5', type: 'conversion' as const, message: 'High-value customer acquired', value: '$2,890', time: '15 min ago' }
];

// Performance Benchmarks
export const benchmarkData = {
  industry: {
    ctr: 2.1,
    cpc: 1.85,
    roas: 3.2,
    conversionRate: 2.8
  },
  yourPerformance: {
    ctr: 3.4,
    cpc: 1.42,
    roas: 4.7,
    conversionRate: 4.1
  }
};