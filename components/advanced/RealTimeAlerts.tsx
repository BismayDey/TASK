"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Bell, 
  AlertTriangle, 
  Info, 
  AlertCircle, 
  X, 
  Check,
  Clock,
  Zap
} from 'lucide-react';
import { AlertData } from '@/lib/advancedData';

interface RealTimeAlertsProps {
  alerts: AlertData[];
}

export function RealTimeAlerts({ alerts: initialAlerts }: RealTimeAlertsProps) {
  const [alerts, setAlerts] = useState(initialAlerts);
  const [newAlertCount, setNewAlertCount] = useState(0);

  useEffect(() => {
    // Simulate new alerts coming in
    const interval = setInterval(() => {
      if (Math.random() > 0.7) { // 30% chance every 10 seconds
        const newAlert: AlertData = {
          id: Date.now().toString(),
          type: ['critical', 'warning', 'info'][Math.floor(Math.random() * 3)] as 'critical' | 'warning' | 'info',
          title: [
            'High Traffic Spike Detected',
            'Campaign Budget Alert',
            'New Conversion Milestone',
            'Performance Anomaly',
            'Audience Engagement Peak'
          ][Math.floor(Math.random() * 5)],
          message: [
            'Traffic increased by 150% in the last 5 minutes',
            'Daily budget utilization at 85%',
            'Reached 1000 conversions this month',
            'CTR dropped below normal range',
            'Social media engagement up 200%'
          ][Math.floor(Math.random() * 5)],
          timestamp: new Date(),
          isRead: false
        };
        
        setAlerts(prev => [newAlert, ...prev.slice(0, 9)]); // Keep only 10 alerts
        setNewAlertCount(prev => prev + 1);
      }
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'critical': return <AlertCircle className="h-4 w-4 text-red-500" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'info': return <Info className="h-4 w-4 text-blue-500" />;
      default: return <Bell className="h-4 w-4" />;
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'critical': return 'border-red-200 dark:border-red-800 bg-red-50/50 dark:bg-red-950/20';
      case 'warning': return 'border-yellow-200 dark:border-yellow-800 bg-yellow-50/50 dark:bg-yellow-950/20';
      case 'info': return 'border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-950/20';
      default: return 'border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-950/20';
    }
  };

  const markAsRead = (id: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === id ? { ...alert, isRead: true } : alert
    ));
  };

  const dismissAlert = (id: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id));
  };

  const markAllAsRead = () => {
    setAlerts(prev => prev.map(alert => ({ ...alert, isRead: true })));
    setNewAlertCount(0);
  };

  const formatTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  const unreadCount = alerts.filter(alert => !alert.isRead).length;

  return (
    <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-orange-50/50 via-red-50/30 to-pink-50/20 dark:from-orange-950/20 dark:via-red-950/10 dark:to-pink-950/10 backdrop-blur-xl">
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-red-500/5 to-pink-500/5"></div>
      <CardHeader className="relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative p-2 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 shadow-lg">
              <Bell className="h-6 w-6 text-white" />
              {unreadCount > 0 && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold animate-pulse">
                  {unreadCount}
                </div>
              )}
            </div>
            <div>
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent">
                Real-Time Alerts
              </CardTitle>
              <CardDescription className="text-base font-medium flex items-center gap-2">
                <Zap className="h-4 w-4 text-yellow-500" />
                Live monitoring and notifications
              </CardDescription>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <Button
                size="sm"
                variant="ghost"
                onClick={markAllAsRead}
                className="text-xs hover:bg-orange-100 dark:hover:bg-orange-900/20"
              >
                <Check className="h-3 w-3 mr-1" />
                Mark all read
              </Button>
            )}
            <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400">
              <Clock className="h-3 w-3 mr-1" />
              Live
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="relative z-10">
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {alerts.length === 0 ? (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <Bell className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p className="font-medium">No alerts at the moment</p>
              <p className="text-sm">We'll notify you of any important updates</p>
            </div>
          ) : (
            alerts.map((alert, index) => (
              <div
                key={alert.id}
                className={`relative p-4 rounded-xl border transition-all duration-300 hover:shadow-lg group ${getAlertColor(alert.type)} ${
                  !alert.isRead ? 'ring-2 ring-orange-200 dark:ring-orange-800' : ''
                }`}
                style={{
                  animationDelay: `${index * 100}ms`,
                  animation: 'slideInUp 0.4s ease-out forwards'
                }}
              >
                {!alert.isRead && (
                  <div className="absolute top-2 right-2 w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                )}
                
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 p-1.5 rounded-lg bg-white/60 dark:bg-gray-800/60">
                    {getAlertIcon(alert.type)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100 text-sm">
                        {alert.title}
                      </h4>
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        {!alert.isRead && (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => markAsRead(alert.id)}
                            className="h-6 w-6 p-0 hover:bg-green-100 dark:hover:bg-green-900/20"
                          >
                            <Check className="h-3 w-3 text-green-600" />
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => dismissAlert(alert.id)}
                          className="h-6 w-6 p-0 hover:bg-red-100 dark:hover:bg-red-900/20"
                        >
                          <X className="h-3 w-3 text-red-600" />
                        </Button>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-2 leading-relaxed">
                      {alert.message}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                        {formatTimeAgo(alert.timestamp)}
                      </span>
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${
                          alert.type === 'critical' ? 'border-red-300 text-red-700 dark:border-red-700 dark:text-red-300' :
                          alert.type === 'warning' ? 'border-yellow-300 text-yellow-700 dark:border-yellow-700 dark:text-yellow-300' :
                          'border-blue-300 text-blue-700 dark:border-blue-700 dark:text-blue-300'
                        }`}
                      >
                        {alert.type}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}