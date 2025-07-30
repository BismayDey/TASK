"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import { 
  Target, 
  TrendingUp, 
  TrendingDown, 
  Minus,
  Award,
  Eye
} from 'lucide-react';
import { CompetitorData } from '@/lib/advancedData';

interface CompetitorAnalysisProps {
  data: CompetitorData[];
}

export function CompetitorAnalysis({ data }: CompetitorAnalysisProps) {
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'down': return <TrendingDown className="h-4 w-4 text-red-500" />;
      case 'stable': return <Minus className="h-4 w-4 text-gray-500" />;
      default: return <Minus className="h-4 w-4 text-gray-500" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return 'text-green-600 dark:text-green-400';
      case 'down': return 'text-red-600 dark:text-red-400';
      case 'stable': return 'text-gray-600 dark:text-gray-400';
      default: return 'text-gray-600 dark:text-gray-400';
    }
  };

  const getBarColor = (name: string) => {
    if (name === 'Your Brand') return '#8B5CF6';
    return '#6B7280';
  };

  const yourBrand = data.find(item => item.name === 'Your Brand');
  const position = data.findIndex(item => item.name === 'Your Brand') + 1;

  return (
    <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-rose-50/50 via-pink-50/30 to-purple-50/20 dark:from-rose-950/20 dark:via-pink-950/10 dark:to-purple-950/10 backdrop-blur-xl">
      <div className="absolute inset-0 bg-gradient-to-br from-rose-500/5 via-pink-500/5 to-purple-500/5"></div>
      <CardHeader className="relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-br from-rose-500 to-pink-600 shadow-lg">
              <Target className="h-6 w-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
                Competitor Analysis
              </CardTitle>
              <CardDescription className="text-base font-medium flex items-center gap-2">
                <Eye className="h-4 w-4 text-blue-500" />
                Market position and competitive landscape
              </CardDescription>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="bg-rose-100 text-rose-800 dark:bg-rose-900/20 dark:text-rose-400">
              <Award className="h-3 w-3 mr-1" />
              #{position} Position
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="relative z-10">
        {/* Market Share Chart */}
        <div className="mb-6">
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
            <Target className="h-4 w-4 text-rose-500" />
            Market Share Distribution
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" className="opacity-30" />
                <XAxis 
                  dataKey="name" 
                  tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                  axisLine={{ stroke: 'hsl(var(--border))' }}
                  tickLine={{ stroke: 'hsl(var(--border))' }}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis 
                  tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                  axisLine={{ stroke: 'hsl(var(--border))' }}
                  tickLine={{ stroke: 'hsl(var(--border))' }}
                  tickFormatter={(value) => `${value}%`}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--background))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '12px',
                    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -2px rgb(0 0 0 / 0.05)',
                    color: 'hsl(var(--foreground))'
                  }}
                  formatter={(value: number) => [`${value}%`, 'Market Share']}
                />
                <Bar dataKey="marketShare" radius={[6, 6, 0, 0]}>
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={getBarColor(entry.name)} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Competitor List */}
        <div className="space-y-3">
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-rose-500" />
            Competitive Landscape
          </h3>
          {data.map((competitor, index) => (
            <div
              key={competitor.name}
              className={`p-4 rounded-xl border transition-all duration-300 hover:shadow-lg group ${
                competitor.name === 'Your Brand' 
                  ? 'border-purple-200 dark:border-purple-800 bg-purple-50/50 dark:bg-purple-950/20 ring-2 ring-purple-200 dark:ring-purple-800' 
                  : 'border-white/20 bg-white/40 dark:bg-gray-900/40 hover:bg-white/60 dark:hover:bg-gray-900/60'
              } backdrop-blur-sm`}
              style={{
                animationDelay: `${index * 100}ms`,
                animation: 'fadeInUp 0.4s ease-out forwards'
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-md ${
                    competitor.name === 'Your Brand' 
                      ? 'bg-gradient-to-br from-purple-500 to-pink-600' 
                      : 'bg-gradient-to-br from-gray-500 to-gray-600'
                  }`}>
                    {competitor.name === 'Your Brand' ? 'YOU' : competitor.name.charAt(0)}
                  </div>
                  <div>
                    <div className={`font-semibold ${
                      competitor.name === 'Your Brand' 
                        ? 'text-purple-900 dark:text-purple-100' 
                        : 'text-gray-900 dark:text-gray-100 group-hover:text-rose-600 dark:group-hover:text-rose-400'
                    } transition-colors`}>
                      {competitor.name}
                      {competitor.name === 'Your Brand' && (
                        <Badge className="ml-2 bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400">
                          You
                        </Badge>
                      )}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Market position #{index + 1}
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                      {competitor.marketShare}%
                    </span>
                    <div className="flex items-center gap-1">
                      {getTrendIcon(competitor.trend)}
                      <span className={`text-sm font-medium ${getTrendColor(competitor.trend)}`}>
                        {competitor.change > 0 ? '+' : ''}{competitor.change}%
                      </span>
                    </div>
                  </div>
                  <Progress 
                    value={competitor.marketShare} 
                    className="w-24 h-2"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Your Performance Summary */}
        {yourBrand && (
          <div className="mt-6 p-4 rounded-xl bg-gradient-to-br from-purple-100/50 to-pink-100/50 dark:from-purple-950/30 dark:to-pink-950/30 border border-purple-200 dark:border-purple-800">
            <h4 className="font-semibold text-purple-900 dark:text-purple-100 mb-3 flex items-center gap-2">
              <Award className="h-4 w-4 text-purple-600" />
              Your Performance Summary
            </h4>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  #{position}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300 font-medium">
                  Market Position
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  {yourBrand.marketShare}%
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300 font-medium">
                  Market Share
                </div>
              </div>
              <div>
                <div className={`text-2xl font-bold ${getTrendColor(yourBrand.trend)}`}>
                  {yourBrand.change > 0 ? '+' : ''}{yourBrand.change}%
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300 font-medium">
                  Growth Rate
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}