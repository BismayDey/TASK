"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  ReferenceLine,
  Area,
  ComposedChart
} from 'recharts';
import { Italic as Crystal, TrendingUp, Zap } from 'lucide-react';
import { PredictiveData } from '@/lib/advancedData';

interface PredictiveAnalyticsProps {
  data: PredictiveData[];
}

export function PredictiveAnalytics({ data }: PredictiveAnalyticsProps) {
  const averageConfidence = data.reduce((acc, item) => acc + item.confidence, 0) / data.length;

  return (
    <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-cyan-50/50 via-blue-50/30 to-indigo-50/20 dark:from-cyan-950/20 dark:via-blue-950/10 dark:to-indigo-950/10 backdrop-blur-xl">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-blue-500/5 to-indigo-500/5"></div>
      <CardHeader className="relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg">
              <Crystal className="h-6 w-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Predictive Analytics
              </CardTitle>
              <CardDescription className="text-base font-medium flex items-center gap-2">
                <Zap className="h-4 w-4 text-yellow-500" />
                AI-powered revenue forecasting
              </CardDescription>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
              <TrendingUp className="h-3 w-3 mr-1" />
              {averageConfidence.toFixed(0)}% Accuracy
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="relative z-10">
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <defs>
                <linearGradient id="predictiveGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#06B6D4" stopOpacity={0.05}/>
                </linearGradient>
                <linearGradient id="confidenceGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0.05}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" className="opacity-30" />
              <XAxis 
                dataKey="period" 
                tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                axisLine={{ stroke: 'hsl(var(--border))' }}
                tickLine={{ stroke: 'hsl(var(--border))' }}
              />
              <YAxis 
                tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                axisLine={{ stroke: 'hsl(var(--border))' }}
                tickLine={{ stroke: 'hsl(var(--border))' }}
                tickFormatter={(value) => `$${value / 1000}k`}
              />
              <YAxis 
                yAxisId="confidence"
                orientation="right"
                tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                axisLine={{ stroke: 'hsl(var(--border))' }}
                tickLine={{ stroke: 'hsl(var(--border))' }}
                tickFormatter={(value) => `${value}%`}
                domain={[0, 100]}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(var(--background))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '12px',
                  boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -2px rgb(0 0 0 / 0.05)',
                  color: 'hsl(var(--foreground))'
                }}
                formatter={(value: number, name: string) => [
                  name === 'predicted' ? `$${value.toLocaleString()}` : `${value}%`,
                  name === 'predicted' ? 'Predicted Revenue' : 'Confidence'
                ]}
              />
              <Area
                type="monotone"
                dataKey="confidence"
                fill="url(#confidenceGradient)"
                stroke="none"
                yAxisId="confidence"
              />
              <Line 
                type="monotone" 
                dataKey="predicted" 
                stroke="#06B6D4" 
                strokeWidth={4}
                dot={{ fill: '#06B6D4', strokeWidth: 2, r: 6 }}
                activeDot={{ r: 8, stroke: '#06B6D4', strokeWidth: 3, fill: 'hsl(var(--background))' }}
              />
              <ReferenceLine 
                y={200000} 
                stroke="#EF4444" 
                strokeDasharray="5 5" 
                label={{ value: "Target", position: "topRight" }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-6 grid grid-cols-3 gap-4">
          <div className="text-center p-4 rounded-xl bg-white/40 dark:bg-gray-900/40 backdrop-blur-sm border border-white/20">
            <div className="text-2xl font-bold text-cyan-600 dark:text-cyan-400">
              ${data[data.length - 1]?.predicted.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300 font-medium">
              6-Month Forecast
            </div>
          </div>
          <div className="text-center p-4 rounded-xl bg-white/40 dark:bg-gray-900/40 backdrop-blur-sm border border-white/20">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {averageConfidence.toFixed(1)}%
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300 font-medium">
              Avg. Confidence
            </div>
          </div>
          <div className="text-center p-4 rounded-xl bg-white/40 dark:bg-gray-900/40 backdrop-blur-sm border border-white/20">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              +24.5%
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300 font-medium">
              Growth Rate
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}