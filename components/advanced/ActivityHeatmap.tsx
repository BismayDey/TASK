"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Activity, Calendar, Clock } from 'lucide-react';
import { HeatmapData } from '@/lib/advancedData';

interface ActivityHeatmapProps {
  data: HeatmapData[];
}

export function ActivityHeatmap({ data }: ActivityHeatmapProps) {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const hours = Array.from({ length: 24 }, (_, i) => i);
  
  const getIntensityColor = (value: number) => {
    if (value < 20) return 'bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700';
    if (value < 40) return 'bg-blue-100 dark:bg-blue-900/30 border-blue-200 dark:border-blue-700';
    if (value < 60) return 'bg-blue-300 dark:bg-blue-700/50 border-blue-400 dark:border-blue-600';
    if (value < 80) return 'bg-blue-500 dark:bg-blue-600 border-blue-600 dark:border-blue-500';
    return 'bg-blue-700 dark:bg-blue-500 border-blue-800 dark:border-blue-400';
  };

  const getHeatmapData = (day: string, hour: number) => {
    return data.find(d => d.day === day && d.hour === hour);
  };

  const maxValue = Math.max(...data.map(d => d.value));
  const avgValue = data.reduce((acc, d) => acc + d.value, 0) / data.length;

  return (
    <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-emerald-50/50 via-teal-50/30 to-cyan-50/20 dark:from-emerald-950/20 dark:via-teal-950/10 dark:to-cyan-950/10 backdrop-blur-xl">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-teal-500/5 to-cyan-500/5"></div>
      <CardHeader className="relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg">
              <Activity className="h-6 w-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
                Activity Heatmap
              </CardTitle>
              <CardDescription className="text-base font-medium flex items-center gap-2">
                <Clock className="h-4 w-4 text-orange-500" />
                User engagement patterns by time
              </CardDescription>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400">
              <Calendar className="h-3 w-3 mr-1" />
              7-Day View
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="relative z-10">
        <div className="space-y-4">
          {/* Time labels */}
          <div className="flex items-center gap-1 ml-12">
            {[0, 6, 12, 18].map(hour => (
              <div key={hour} className="flex-1 text-xs text-gray-500 dark:text-gray-400 font-medium">
                {hour}:00
              </div>
            ))}
          </div>
          
          {/* Heatmap grid */}
          <div className="space-y-1">
            {days.map((day, dayIndex) => (
              <div key={day} className="flex items-center gap-1">
                <div className="w-10 text-xs font-medium text-gray-600 dark:text-gray-300">
                  {day}
                </div>
                <div className="flex gap-1">
                  {hours.map(hour => {
                    const cellData = getHeatmapData(day, hour);
                    const value = cellData?.value || 0;
                    return (
                      <div
                        key={`${day}-${hour}`}
                        className={`w-3 h-3 rounded-sm border transition-all duration-200 hover:scale-150 hover:z-10 relative cursor-pointer group ${getIntensityColor(value)}`}
                        title={`${day} ${hour}:00 - ${value}% activity (${cellData?.conversions || 0} conversions)`}
                        style={{
                          animationDelay: `${(dayIndex * 24 + hour) * 10}ms`,
                          animation: 'fadeInUp 0.3s ease-out forwards'
                        }}
                      >
                        {/* Tooltip */}
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-20 pointer-events-none">
                          {day} {hour}:00<br/>
                          {value}% activity<br/>
                          {cellData?.conversions || 0} conversions
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
          
          {/* Legend */}
          <div className="flex items-center justify-between pt-4 border-t border-white/20">
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">Less</span>
              <div className="flex gap-1">
                {[0, 25, 50, 75, 100].map(value => (
                  <div
                    key={value}
                    className={`w-3 h-3 rounded-sm border ${getIntensityColor(value)}`}
                  />
                ))}
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">More</span>
            </div>
            
            <div className="flex items-center gap-4 text-xs">
              <div className="text-center">
                <div className="font-bold text-emerald-600 dark:text-emerald-400">{maxValue}%</div>
                <div className="text-gray-500 dark:text-gray-400">Peak</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-teal-600 dark:text-teal-400">{avgValue.toFixed(1)}%</div>
                <div className="text-gray-500 dark:text-gray-400">Average</div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}