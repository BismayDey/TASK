"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Gauge, 
  DollarSign, 
  Users, 
  TrendingDown, 
  Heart,
  Share2,
  Target,
  Brain,
  ArrowUp,
  ArrowDown
} from 'lucide-react';

interface AdvancedMetricsProps {
  metrics: {
    customerLifetimeValue: number;
    customerAcquisitionCost: number;
    churnRate: number;
    netPromoterScore: number;
    brandSentiment: number;
    marketShare: number;
    competitiveIndex: number;
    predictiveAccuracy: number;
  };
}

export function AdvancedMetrics({ metrics }: AdvancedMetricsProps) {
  const getScoreColor = (score: number, max: number = 100) => {
    const percentage = (score / max) * 100;
    if (percentage >= 80) return 'text-green-600 dark:text-green-400';
    if (percentage >= 60) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getProgressColor = (score: number, max: number = 100) => {
    const percentage = (score / max) * 100;
    if (percentage >= 80) return 'bg-green-500';
    if (percentage >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const metricCards = [
    {
      title: 'Customer Lifetime Value',
      value: `$${metrics.customerLifetimeValue.toLocaleString()}`,
      icon: DollarSign,
      description: 'Average revenue per customer',
      trend: '+12.5%',
      trendUp: true,
      color: 'from-green-500 to-emerald-600',
      bgColor: 'from-green-50/50 via-emerald-50/30 to-teal-50/20 dark:from-green-950/20 dark:via-emerald-950/10 dark:to-teal-950/10'
    },
    {
      title: 'Customer Acquisition Cost',
      value: `$${metrics.customerAcquisitionCost}`,
      icon: Users,
      description: 'Cost to acquire new customer',
      trend: '-8.3%',
      trendUp: false,
      color: 'from-blue-500 to-cyan-600',
      bgColor: 'from-blue-50/50 via-cyan-50/30 to-sky-50/20 dark:from-blue-950/20 dark:via-cyan-950/10 dark:to-sky-950/10'
    },
    {
      title: 'Churn Rate',
      value: `${metrics.churnRate}%`,
      icon: TrendingDown,
      description: 'Monthly customer churn',
      trend: '-2.1%',
      trendUp: false,
      color: 'from-red-500 to-pink-600',
      bgColor: 'from-red-50/50 via-pink-50/30 to-rose-50/20 dark:from-red-950/20 dark:via-pink-950/10 dark:to-rose-950/10'
    },
    {
      title: 'Net Promoter Score',
      value: metrics.netPromoterScore.toString(),
      icon: Heart,
      description: 'Customer satisfaction score',
      trend: '+5.7%',
      trendUp: true,
      color: 'from-purple-500 to-violet-600',
      bgColor: 'from-purple-50/50 via-violet-50/30 to-indigo-50/20 dark:from-purple-950/20 dark:via-violet-950/10 dark:to-indigo-950/10',
      progress: metrics.netPromoterScore,
      maxProgress: 100
    },
    {
      title: 'Brand Sentiment',
      value: `${metrics.brandSentiment}/10`,
      icon: Share2,
      description: 'Social media sentiment',
      trend: '+1.2%',
      trendUp: true,
      color: 'from-orange-500 to-amber-600',
      bgColor: 'from-orange-50/50 via-amber-50/30 to-yellow-50/20 dark:from-orange-950/20 dark:via-amber-950/10 dark:to-yellow-950/10',
      progress: metrics.brandSentiment * 10,
      maxProgress: 100
    },
    {
      title: 'Market Share',
      value: `${metrics.marketShare}%`,
      icon: Target,
      description: 'Industry market position',
      trend: '+3.4%',
      trendUp: true,
      color: 'from-teal-500 to-cyan-600',
      bgColor: 'from-teal-50/50 via-cyan-50/30 to-blue-50/20 dark:from-teal-950/20 dark:via-cyan-950/10 dark:to-blue-950/10',
      progress: metrics.marketShare,
      maxProgress: 100
    },
    {
      title: 'Competitive Index',
      value: `${metrics.competitiveIndex}/100`,
      icon: Gauge,
      description: 'Overall competitive strength',
      trend: '+7.8%',
      trendUp: true,
      color: 'from-indigo-500 to-purple-600',
      bgColor: 'from-indigo-50/50 via-purple-50/30 to-violet-50/20 dark:from-indigo-950/20 dark:via-purple-950/10 dark:to-violet-950/10',
      progress: metrics.competitiveIndex,
      maxProgress: 100
    },
    {
      title: 'AI Prediction Accuracy',
      value: `${metrics.predictiveAccuracy}%`,
      icon: Brain,
      description: 'ML model performance',
      trend: '+2.1%',
      trendUp: true,
      color: 'from-pink-500 to-rose-600',
      bgColor: 'from-pink-50/50 via-rose-50/30 to-red-50/20 dark:from-pink-950/20 dark:via-rose-950/10 dark:to-red-950/10',
      progress: metrics.predictiveAccuracy,
      maxProgress: 100
    }
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {metricCards.map((metric, index) => {
        const IconComponent = metric.icon;
        return (
          <Card 
            key={metric.title}
            className={`relative overflow-hidden border-0 bg-gradient-to-br ${metric.bgColor} backdrop-blur-xl transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 group cursor-pointer`}
            style={{
              animationDelay: `${index * 100}ms`,
              animation: 'slideInUp 0.6s ease-out forwards'
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-transparent"></div>
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <CardHeader className="relative z-10 pb-3">
              <div className="flex items-center justify-between">
                <div className={`p-2 rounded-xl bg-gradient-to-br ${metric.color} shadow-lg group-hover:scale-110 transition-transform duration-200`}>
                  <IconComponent className="h-5 w-5 text-white" />
                </div>
                <div className="flex items-center gap-1">
                  {metric.trendUp ? (
                    <ArrowUp className="h-3 w-3 text-green-500" />
                  ) : (
                    <ArrowDown className="h-3 w-3 text-red-500" />
                  )}
                  <span className={`text-xs font-semibold ${
                    metric.trendUp ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                  }`}>
                    {metric.trend}
                  </span>
                </div>
              </div>
              <CardTitle className="text-sm font-semibold text-muted-foreground group-hover:text-foreground transition-colors duration-200">
                {metric.title}
              </CardTitle>
            </CardHeader>
            
            <CardContent className="relative z-10 pt-0">
              <div className="text-3xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-200 tracking-tight">
                {metric.value}
              </div>
              
              <CardDescription className="text-sm font-medium mb-3">
                {metric.description}
              </CardDescription>

              {metric.progress !== undefined && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Performance</span>
                    <span className={`font-semibold ${getScoreColor(metric.progress, metric.maxProgress)}`}>
                      {((metric.progress / (metric.maxProgress || 100)) * 100).toFixed(0)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-1000 ${getProgressColor(metric.progress, metric.maxProgress)}`}
                      style={{ width: `${(metric.progress / (metric.maxProgress || 100)) * 100}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}