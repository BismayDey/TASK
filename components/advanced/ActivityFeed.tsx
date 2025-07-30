"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Activity, 
  DollarSign, 
  Target, 
  AlertTriangle, 
  Zap,
  Clock,
  TrendingUp
} from 'lucide-react';

interface ActivityItem {
  id: string;
  type: 'conversion' | 'campaign' | 'alert' | 'optimization';
  message: string;
  value?: string;
  time: string;
}

interface ActivityFeedProps {
  activities: ActivityItem[];
}

export function ActivityFeed({ activities: initialActivities }: ActivityFeedProps) {
  const [activities, setActivities] = useState(initialActivities);

  useEffect(() => {
    // Simulate real-time activity updates
    const interval = setInterval(() => {
      if (Math.random() > 0.6) { // 40% chance every 5 seconds
        const newActivity: ActivityItem = {
          id: Date.now().toString(),
          type: (['conversion', 'campaign', 'alert', 'optimization'] as const)[Math.floor(Math.random() * 4)],
          message: [
            'New high-value conversion detected',
            'Campaign performance milestone reached',
            'Budget threshold alert triggered',
            'AI optimization applied successfully',
            'Audience engagement spike detected',
            'New lead captured from organic search',
            'Social media campaign went viral',
            'Email campaign achieved high open rate'
          ][Math.floor(Math.random() * 8)],
          value: Math.random() > 0.5 ? `$${(Math.random() * 5000 + 100).toFixed(0)}` : undefined,
          time: 'Just now'
        };
        
        setActivities(prev => [newActivity, ...prev.slice(0, 19)]); // Keep only 20 activities
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'conversion': return <DollarSign className="h-4 w-4 text-green-500" />;
      case 'campaign': return <Target className="h-4 w-4 text-blue-500" />;
      case 'alert': return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'optimization': return <Zap className="h-4 w-4 text-purple-500" />;
      default: return <Activity className="h-4 w-4 text-gray-500" />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'conversion': return 'border-green-200 dark:border-green-800 bg-green-50/50 dark:bg-green-950/20';
      case 'campaign': return 'border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-950/20';
      case 'alert': return 'border-yellow-200 dark:border-yellow-800 bg-yellow-50/50 dark:bg-yellow-950/20';
      case 'optimization': return 'border-purple-200 dark:border-purple-800 bg-purple-50/50 dark:bg-purple-950/20';
      default: return 'border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-950/20';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'conversion': return 'Conversion';
      case 'campaign': return 'Campaign';
      case 'alert': return 'Alert';
      case 'optimization': return 'AI Optimization';
      default: return 'Activity';
    }
  };

  return (
    <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-slate-50/50 via-gray-50/30 to-zinc-50/20 dark:from-slate-950/20 dark:via-gray-950/10 dark:to-zinc-950/10 backdrop-blur-xl">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-500/5 via-gray-500/5 to-zinc-500/5"></div>
      <CardHeader className="relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-br from-slate-500 to-gray-600 shadow-lg">
              <Activity className="h-6 w-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-slate-600 via-gray-600 to-zinc-600 bg-clip-text text-transparent">
                Live Activity Feed
              </CardTitle>
              <CardDescription className="text-base font-medium flex items-center gap-2">
                <Clock className="h-4 w-4 text-blue-500" />
                Real-time business events
              </CardDescription>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="bg-slate-100 text-slate-800 dark:bg-slate-900/20 dark:text-slate-400">
              <TrendingUp className="h-3 w-3 mr-1" />
              Live
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="relative z-10 p-0">
        <ScrollArea className="h-96 px-6 pb-6">
          <div className="space-y-3">
            {activities.map((activity, index) => (
              <div
                key={activity.id}
                className={`relative p-4 rounded-xl border transition-all duration-300 hover:shadow-lg group ${getActivityColor(activity.type)} backdrop-blur-sm hover:scale-[1.02]`}
                style={{
                  animationDelay: `${index * 50}ms`,
                  animation: 'slideInUp 0.4s ease-out forwards'
                }}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 p-2 rounded-lg bg-white/60 dark:bg-gray-800/60 group-hover:scale-110 transition-transform duration-200">
                    {getActivityIcon(activity.type)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <Badge 
                        variant="outline" 
                        className="text-xs font-medium"
                      >
                        {getTypeLabel(activity.type)}
                      </Badge>
                      <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                        {activity.time}
                      </span>
                    </div>
                    
                    <p className="text-sm text-gray-700 dark:text-gray-300 font-medium leading-relaxed">
                      {activity.message}
                    </p>
                    
                    {activity.value && (
                      <div className="mt-2 inline-flex items-center px-2 py-1 rounded-full bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400 text-xs font-bold">
                        {activity.value}
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Pulse animation for new items */}
                {activity.time === 'Just now' && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-ping"></div>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}