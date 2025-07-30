"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';
import { ChartDataPoint } from '@/lib/mockData';

interface ChartsSectionProps {
  lineData: ChartDataPoint[];
  barData: ChartDataPoint[];
  donutData: ChartDataPoint[];
  isLoading?: boolean;
}

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4'];

export function ChartsSection({ lineData, barData, donutData, isLoading }: ChartsSectionProps) {
  if (isLoading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="relative overflow-hidden">
            <CardHeader>
              <div className="h-5 bg-muted rounded-md w-32 mb-2 animate-shimmer"></div>
              <div className="h-4 bg-muted rounded-md w-48 animate-shimmer"></div>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-muted rounded-lg animate-shimmer"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {/* Revenue Trend Chart */}
      <Card className="md:col-span-2 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 border-border/50 hover:border-primary/30 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-xl font-bold">
            Revenue Trend
            <div className="flex items-center gap-1">
              <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs font-medium text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950/30 px-2 py-1 rounded-full">Live</span>
            </div>
          </CardTitle>
          <CardDescription className="text-base font-medium">
            Monthly revenue growth over the past year
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-2">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" className="opacity-30" />
              <XAxis 
                dataKey="name" 
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
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(var(--background))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '12px',
                  boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -2px rgb(0 0 0 / 0.05)',
                  color: 'hsl(var(--foreground))'
                }}
                formatter={(value: number) => [`$${value.toLocaleString()}`, 'Revenue']}
              />
              <Line 
                type="monotone" 
                dataKey="revenue" 
                stroke="hsl(var(--primary))" 
                strokeWidth={4}
                dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 5 }}
                activeDot={{ r: 7, stroke: 'hsl(var(--primary))', strokeWidth: 3, fill: 'hsl(var(--background))' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Traffic Sources Chart */}
      <Card className="transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 border-border/50 hover:border-primary/30 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Traffic Sources</CardTitle>
          <CardDescription className="text-base font-medium">
            Distribution of traffic by source
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-2">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={donutData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {donutData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[index % COLORS.length]}
                    className="hover:opacity-80 transition-opacity duration-200"
                  />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(var(--background))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '12px',
                  boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -2px rgb(0 0 0 / 0.05)',
                  color: 'hsl(var(--foreground))'
                }}
                formatter={(value: number) => [`${value}%`, 'Share']}
              />
              <Legend 
                verticalAlign="bottom" 
                height={36}
                wrapperStyle={{ fontSize: '12px' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Platform Performance Chart */}
      <Card className="md:col-span-2 lg:col-span-3 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 border-border/50 hover:border-primary/30 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Platform Performance</CardTitle>
          <CardDescription className="text-base font-medium">
            Conversions by advertising platform
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-2">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" className="opacity-30" />
              <XAxis 
                dataKey="name" 
                tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                axisLine={{ stroke: 'hsl(var(--border))' }}
                tickLine={{ stroke: 'hsl(var(--border))' }}
              />
              <YAxis 
                tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                axisLine={{ stroke: 'hsl(var(--border))' }}
                tickLine={{ stroke: 'hsl(var(--border))' }}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(var(--background))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '12px',
                  boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -2px rgb(0 0 0 / 0.05)',
                  color: 'hsl(var(--foreground))'
                }}
                formatter={(value: number) => [value.toLocaleString(), 'Conversions']}
              />
              <Bar 
                dataKey="value" 
                fill="hsl(var(--primary))"
                radius={[6, 6, 0, 0]}
                className="hover:opacity-80 transition-opacity duration-200"
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}