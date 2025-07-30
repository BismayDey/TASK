"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowUpIcon, ArrowDownIcon } from 'lucide-react';
import { MetricData } from '@/lib/mockData';
import * as Icons from 'lucide-react';

interface MetricsCardsProps {
  metrics: MetricData[];
  isLoading?: boolean;
}

export function MetricsCards({ metrics, isLoading }: MetricsCardsProps) {
  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <div className="h-4 bg-muted rounded-md w-24 animate-shimmer"></div>
              <div className="h-5 w-5 bg-muted rounded animate-shimmer"></div>
            </CardHeader>
            <CardContent>
              <div className="h-8 bg-muted rounded-md w-32 mb-3 animate-shimmer"></div>
              <div className="h-4 bg-muted rounded-md w-20 animate-shimmer"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric, index) => {
        const IconComponent = Icons[metric.icon as keyof typeof Icons] as React.ComponentType<any>;
        
        return (
          <Card 
            key={metric.label}
            className="relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 group cursor-pointer border-border/50 hover:border-primary/30 bg-card/50 backdrop-blur-sm"
            style={{
              animationDelay: `${index * 100}ms`,
              animation: 'slideInUp 0.6s ease-out forwards'
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-primary/3 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 relative z-10">
              <CardTitle className="text-sm font-semibold text-muted-foreground group-hover:text-foreground transition-colors duration-200">
                {metric.label}
              </CardTitle>
              <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors duration-200">
                <IconComponent className="h-4 w-4 text-primary group-hover:text-primary transition-colors duration-200" />
              </div>
            </CardHeader>
            
            <CardContent className="relative z-10">
              <div className="text-3xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-200 tracking-tight">
                {metric.value}
              </div>
              
              <div className="flex items-center text-sm">
                {metric.trend === 'up' ? (
                  <div className="flex items-center text-green-600 dark:text-green-400">
                    <ArrowUpIcon className="h-4 w-4 mr-1" />
                    <span className="font-semibold">+{Math.abs(metric.change)}%</span>
                  </div>
                ) : (
                  <div className="flex items-center text-red-600 dark:text-red-400">
                    <ArrowDownIcon className="h-4 w-4 mr-1" />
                    <span className="font-semibold">-{Math.abs(metric.change)}%</span>
                  </div>
                )}
                <span className="text-muted-foreground ml-2 font-medium">vs last month</span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}