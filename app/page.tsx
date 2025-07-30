"use client";

import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Header } from '@/components/dashboard/Header';
import { MetricsCards } from '@/components/dashboard/MetricsCards';
import { ChartsSection } from '@/components/dashboard/ChartsSection';  
import { DataTable } from '@/components/dashboard/DataTable';
import { AIInsights } from '@/components/advanced/AIInsights';
import { PredictiveAnalytics } from '@/components/advanced/PredictiveAnalytics';
import { ActivityHeatmap } from '@/components/advanced/ActivityHeatmap';
import { GeographicMap } from '@/components/advanced/GeographicMap';
import { RealTimeAlerts } from '@/components/advanced/RealTimeAlerts';
import { CompetitorAnalysis } from '@/components/advanced/CompetitorAnalysis';
import { AdvancedMetrics } from '@/components/advanced/AdvancedMetrics';
import { ActivityFeed } from '@/components/advanced/ActivityFeed';
import { 
  metricsData, 
  lineChartData, 
  barChartData, 
  donutChartData, 
  tableData,
  generateRandomMetrics,
  MetricData
} from '@/lib/mockData';
import {
  aiInsights,
  predictiveData,
  heatmapData,
  geographicData,
  alertsData,
  competitorData,
  advancedMetrics,
  activityFeed
} from '@/lib/advancedData';

export default function Dashboard() {
  const [currentMetrics, setCurrentMetrics] = useState<MetricData[]>(metricsData);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  // Simulate initial loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isLoading) {
        setCurrentMetrics(generateRandomMetrics());
      }
    }, 10000); // Update every 10 seconds

    return () => clearInterval(interval);
  }, [isLoading]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    setCurrentMetrics(generateRandomMetrics());
    setIsRefreshing(false);
  };

  const handleExport = () => {
    // Simulate export functionality
    const csvContent = "data:text/csv;charset=utf-8," + 
      "Campaign,Platform,Impressions,CTR,Spend,ROAS,Status\n" +
      tableData.map(row => 
        `${row.campaign},${row.platform},${row.impressions},${row.ctr},${row.spend},${row.roas},${row.status}`
      ).join('\n');
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "campaign_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50/80 via-blue-50/40 to-purple-50/40 dark:from-gray-950/95 dark:via-blue-950/30 dark:to-purple-950/30 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] dark:opacity-[0.08]"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-background/90"></div>
      
      {/* Animated background elements */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-br from-blue-400/10 to-purple-600/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-br from-purple-400/10 to-pink-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-indigo-400/5 to-cyan-600/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      
      <Header 
        onRefresh={handleRefresh} 
        onExport={handleExport}
        isRefreshing={isRefreshing}
      />
      
      <main className="container mx-auto px-6 py-8 space-y-8 relative z-10">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          {/* Header with tabs */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-5xl font-bold tracking-tight bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                Advanced Analytics Hub
              </h2>
              <p className="text-muted-foreground text-xl font-medium">
                AI-powered insights and real-time performance monitoring
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950/30 px-4 py-2 rounded-full border border-green-200 dark:border-green-800 shadow-lg backdrop-blur-sm">
                <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse shadow-sm"></div>
                <span>Live Data</span>
              </div>
            </div>
          </div>

          <TabsList className="grid w-full grid-cols-4 lg:w-fit lg:grid-cols-4 bg-white/50 dark:bg-gray-900/50 backdrop-blur-xl border border-white/20 shadow-xl rounded-2xl p-2">
            <TabsTrigger 
              value="overview" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-xl font-semibold transition-all duration-300"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger 
              value="analytics" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-600 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-xl font-semibold transition-all duration-300"
            >
              AI Analytics
            </TabsTrigger>
            <TabsTrigger 
              value="insights" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-red-600 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-xl font-semibold transition-all duration-300"
            >
              Insights
            </TabsTrigger>
            <TabsTrigger 
              value="monitoring" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-teal-600 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-xl font-semibold transition-all duration-300"
            >
              Monitoring
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            {/* Advanced Metrics */}
            <AdvancedMetrics metrics={advancedMetrics} />
            
            {/* Traditional Metrics Cards */}
            <MetricsCards metrics={currentMetrics} isLoading={isLoading} />

            {/* Charts Section */}
            <ChartsSection 
              lineData={lineChartData}
              barData={barChartData}
              donutData={donutChartData}
              isLoading={isLoading}
            />


            {/* Data Table */}
            <DataTable data={tableData} isLoading={isLoading} />
          </TabsContent>

          <TabsContent value="analytics" className="space-y-8">
            <div className="grid gap-8 lg:grid-cols-2">
              {/* AI Insights */}
              <AIInsights insights={aiInsights} />
              
              {/* Predictive Analytics */}
              <PredictiveAnalytics data={predictiveData} />
            </div>
            
            <div className="grid gap-8 lg:grid-cols-2">
              {/* Activity Heatmap */}
              <ActivityHeatmap data={heatmapData} />
              
              {/* Geographic Map */}
              <GeographicMap data={geographicData} />
            </div>
          </TabsContent>

          <TabsContent value="insights" className="space-y-8">
            <div className="grid gap-8 lg:grid-cols-2">
              {/* Competitor Analysis */}
              <CompetitorAnalysis data={competitorData} />
              
              {/* Activity Feed */}
              <ActivityFeed activities={activityFeed} />
            </div>
          </TabsContent>

          <TabsContent value="monitoring" className="space-y-8">
            <div className="grid gap-8 lg:grid-cols-2">
              {/* Real-time Alerts */}
              <RealTimeAlerts alerts={alertsData} />
              
              {/* Activity Feed */}
              <ActivityFeed activities={activityFeed} />
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* Background grid pattern */}
      <style jsx global>{`
        .bg-grid-pattern {
          background-image: 
            linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px);
          background-size: 40px 40px;
        }
        
        .dark .bg-grid-pattern {
          background-image: 
            linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px);
        }
        
        /* Enhanced scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: rgba(0,0,0,0.05);
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(45deg, #3B82F6, #8B5CF6);
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(45deg, #2563EB, #7C3AED);
        }
      `}</style>
    </div>
  );
}