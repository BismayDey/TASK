export interface MetricData {
  label: string;
  value: string;
  change: number;
  trend: 'up' | 'down';
  icon: string;
}

export interface ChartDataPoint {
  name: string;
  value: number;
  revenue?: number;
  users?: number;
  conversions?: number;
}

export interface TableDataRow {
  id: string;
  campaign: string;
  platform: string;
  impressions: number;
  clicks: number;
  ctr: number;
  spend: number;
  conversions: number;
  roas: number;
  status: 'active' | 'paused' | 'completed';
  date: string;
}

export const metricsData: MetricData[] = [
  {
    label: 'Total Revenue',
    value: '$2,847,950',
    change: 12.5,
    trend: 'up',
    icon: 'DollarSign'
  },
  {
    label: 'Active Users',
    value: '94,582',
    change: 8.2,
    trend: 'up',
    icon: 'Users'
  },
  {
    label: 'Conversions',
    value: '12,847',
    change: -2.4,
    trend: 'down',
    icon: 'Target'
  },
  {
    label: 'Growth Rate',
    value: '23.4%',
    change: 5.7,
    trend: 'up',
    icon: 'TrendingUp'
  }
];

export const lineChartData: ChartDataPoint[] = [
  { name: 'Jan', revenue: 65000, users: 12400, conversions: 2100 },
  { name: 'Feb', revenue: 78000, users: 14800, conversions: 2400 },
  { name: 'Mar', revenue: 90000, users: 16200, conversions: 2800 },
  { name: 'Apr', revenue: 81000, users: 15600, conversions: 2650 },
  { name: 'May', revenue: 95000, users: 18200, conversions: 3100 },
  { name: 'Jun', revenue: 110000, users: 20800, conversions: 3500 },
  { name: 'Jul', revenue: 125000, users: 22400, conversions: 3800 },
  { name: 'Aug', revenue: 140000, users: 24600, conversions: 4200 },
  { name: 'Sep', revenue: 155000, users: 26800, conversions: 4600 },
  { name: 'Oct', revenue: 170000, users: 29200, conversions: 5000 },
  { name: 'Nov', revenue: 185000, users: 31600, conversions: 5400 },
  { name: 'Dec', revenue: 200000, users: 34000, conversions: 5800 }
];

export const barChartData: ChartDataPoint[] = [
  { name: 'Facebook', value: 4500 },
  { name: 'Google', value: 6200 },
  { name: 'Instagram', value: 3800 },
  { name: 'LinkedIn', value: 2100 },
  { name: 'Twitter', value: 1900 },
  { name: 'TikTok', value: 2800 }
];

export const donutChartData: ChartDataPoint[] = [
  { name: 'Organic', value: 45 },
  { name: 'Paid Search', value: 25 },
  { name: 'Social Media', value: 15 },
  { name: 'Email', value: 10 },
  { name: 'Direct', value: 5 }
];

export const tableData: TableDataRow[] = [
  {
    id: '1',
    campaign: 'Summer Sale 2024',
    platform: 'Google Ads',
    impressions: 125000,
    clicks: 8750,
    ctr: 7.0,
    spend: 12500,
    conversions: 385,
    roas: 4.2,
    status: 'active',
    date: '2024-01-15'
  },
  {
    id: '2',
    campaign: 'Brand Awareness Q1',
    platform: 'Facebook',
    impressions: 98000,
    clicks: 5880,
    ctr: 6.0,
    spend: 8900,
    conversions: 220,
    roas: 3.1,
    status: 'active',
    date: '2024-01-14'
  },
  {
    id: '3',
    campaign: 'Product Launch',
    platform: 'Instagram',
    impressions: 156000,
    clicks: 12480,
    ctr: 8.0,
    spend: 15600,
    conversions: 520,
    roas: 5.8,
    status: 'completed',
    date: '2024-01-13'
  },
  {
    id: '4',
    campaign: 'Holiday Promo',
    platform: 'LinkedIn',
    impressions: 42000,
    clicks: 2100,
    ctr: 5.0,
    spend: 6800,
    conversions: 95,
    roas: 2.4,
    status: 'paused',
    date: '2024-01-12'
  },
  {
    id: '5',
    campaign: 'Retargeting Campaign',
    platform: 'Google Ads',
    impressions: 78000,
    clicks: 7020,
    ctr: 9.0,
    spend: 9500,
    conversions: 310,
    roas: 6.2,
    status: 'active',
    date: '2024-01-11'
  },
  {
    id: '6',
    campaign: 'Video Ad Series',
    platform: 'YouTube',
    impressions: 89000,
    clicks: 4450,
    ctr: 5.0,
    spend: 7200,
    conversions: 180,
    roas: 3.8,
    status: 'active',
    date: '2024-01-10'
  },
  {
    id: '7',
    campaign: 'Local Awareness',
    platform: 'Facebook',
    impressions: 65000,
    clicks: 3250,
    ctr: 5.0,
    spend: 4800,
    conversions: 125,
    roas: 2.9,
    status: 'paused',
    date: '2024-01-09'
  },
  {
    id: '8',
    campaign: 'Mobile App Install',
    platform: 'TikTok',
    impressions: 112000,
    clicks: 8960,
    ctr: 8.0,
    spend: 11200,
    conversions: 420,
    roas: 4.8,
    status: 'active',
    date: '2024-01-08'
  }
];

// Simulate real-time data updates
export const generateRandomMetrics = (): MetricData[] => {
  return metricsData.map(metric => ({
    ...metric,
    value: metric.label === 'Total Revenue' 
      ? `$${(2847950 + Math.random() * 100000).toLocaleString()}`
      : metric.label === 'Active Users'
      ? `${(94582 + Math.floor(Math.random() * 1000)).toLocaleString()}`
      : metric.label === 'Conversions'
      ? `${(12847 + Math.floor(Math.random() * 100)).toLocaleString()}`
      : `${(23.4 + (Math.random() - 0.5) * 2).toFixed(1)}%`,
    change: Number((metric.change + (Math.random() - 0.5) * 2).toFixed(1))
  }));
};