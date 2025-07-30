"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Brain, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Target,
  Sparkles,
  ArrowRight,
  Lightbulb
} from 'lucide-react';
import { AIInsight } from '@/lib/advancedData';

interface AIInsightsProps {
  insights: AIInsight[];
}

export function AIInsights({ insights }: AIInsightsProps) {
  const [expandedInsight, setExpandedInsight] = useState<string | null>(null);

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'opportunity': return <Target className="h-5 w-5 text-green-500" />;
      case 'warning': return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'success': return <CheckCircle className="h-5 w-5 text-blue-500" />;
      case 'trend': return <TrendingUp className="h-5 w-5 text-purple-500" />;
      default: return <Lightbulb className="h-5 w-5 text-gray-500" />;
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  return (
    <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-indigo-50/50 via-purple-50/30 to-pink-50/20 dark:from-indigo-950/20 dark:via-purple-950/10 dark:to-pink-950/10 backdrop-blur-xl">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-pink-500/5"></div>
      <CardHeader className="relative z-10">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg">
            <Brain className="h-6 w-6 text-white" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              AI-Powered Insights
            </CardTitle>
            <CardDescription className="text-base font-medium flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-yellow-500" />
              Smart recommendations powered by machine learning
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="relative z-10 space-y-4">
        {insights.map((insight, index) => (
          <div
            key={insight.id}
            className="group relative p-4 rounded-xl border border-white/20 bg-white/40 dark:bg-gray-900/40 backdrop-blur-sm hover:bg-white/60 dark:hover:bg-gray-900/60 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10 hover:-translate-y-1 cursor-pointer"
            style={{
              animationDelay: `${index * 100}ms`,
              animation: 'slideInUp 0.6s ease-out forwards'
            }}
            onClick={() => setExpandedInsight(expandedInsight === insight.id ? null : insight.id)}
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 p-2 rounded-lg bg-white/60 dark:bg-gray-800/60 group-hover:scale-110 transition-transform duration-200">
                {getInsightIcon(insight.type)}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {insight.title}
                  </h3>
                  <Badge className={getImpactColor(insight.impact)}>
                    {insight.impact} impact
                  </Badge>
                </div>
                
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 leading-relaxed">
                  {insight.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                        {insight.confidence}% confidence
                      </span>
                    </div>
                    <div className="w-20 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-green-500 to-blue-500 rounded-full transition-all duration-1000"
                        style={{ width: `${insight.confidence}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  {insight.action && (
                    <Button 
                      size="sm" 
                      variant="ghost"
                      className="text-xs hover:bg-indigo-100 dark:hover:bg-indigo-900/20 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-200 group/btn"
                    >
                      Take Action
                      <ArrowRight className="h-3 w-3 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  )}
                </div>
                
                {expandedInsight === insight.id && insight.action && (
                  <div className="mt-4 p-3 rounded-lg bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800 animate-fadeInUp">
                    <div className="flex items-center gap-2 mb-2">
                      <Target className="h-4 w-4 text-indigo-600" />
                      <span className="font-medium text-indigo-900 dark:text-indigo-100">Recommended Action</span>
                    </div>
                    <p className="text-sm text-indigo-700 dark:text-indigo-300">{insight.action}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}