"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Globe, MapPin, TrendingUp, Users } from 'lucide-react';
import { GeographicData } from '@/lib/advancedData';

interface GeographicMapProps {
  data: GeographicData[];
}

export function GeographicMap({ data }: GeographicMapProps) {
  const totalRevenue = data.reduce((acc, item) => acc + item.revenue, 0);
  const totalUsers = data.reduce((acc, item) => acc + item.users, 0);
  
  const getMarkerSize = (revenue: number) => {
    const maxRevenue = Math.max(...data.map(d => d.revenue));
    const minSize = 8;
    const maxSize = 24;
    return minSize + (revenue / maxRevenue) * (maxSize - minSize);
  };

  const getGrowthColor = (growth: number) => {
    if (growth > 15) return 'text-green-600 dark:text-green-400';
    if (growth > 5) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  return (
    <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-violet-50/50 via-purple-50/30 to-fuchsia-50/20 dark:from-violet-950/20 dark:via-purple-950/10 dark:to-fuchsia-950/10 backdrop-blur-xl">
      <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-purple-500/5 to-fuchsia-500/5"></div>
      <CardHeader className="relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 shadow-lg">
              <Globe className="h-6 w-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 bg-clip-text text-transparent">
                Global Performance
              </CardTitle>
              <CardDescription className="text-base font-medium flex items-center gap-2">
                <MapPin className="h-4 w-4 text-blue-500" />
                Revenue distribution by geography
              </CardDescription>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="bg-violet-100 text-violet-800 dark:bg-violet-900/20 dark:text-violet-400">
              <Globe className="h-3 w-3 mr-1" />
              8 Markets
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="relative z-10">
        {/* World Map Visualization */}
        <div className="relative h-64 mb-6 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950/30 dark:to-indigo-950/30 border border-white/20 overflow-hidden">
          {/* Simplified world map background */}
          <div className="absolute inset-0 opacity-20 dark:opacity-10">
            <svg viewBox="0 0 1000 500" className="w-full h-full">
              {/* Simplified continent shapes */}
              <path d="M150,200 L300,180 L350,220 L320,280 L200,300 Z" fill="currentColor" opacity="0.3" />
              <path d="M400,150 L600,140 L650,200 L580,250 L450,240 Z" fill="currentColor" opacity="0.3" />
              <path d="M700,180 L850,170 L880,220 L820,270 L720,260 Z" fill="currentColor" opacity="0.3" />
            </svg>
          </div>
          
          {/* Data points */}
          {data.map((country, index) => (
            <div
              key={country.code}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
              style={{
                left: `${(country.coordinates[0] + 180) * (100 / 360)}%`,
                top: `${(90 - country.coordinates[1]) * (100 / 180)}%`,
                animationDelay: `${index * 200}ms`,
                animation: 'slideInUp 0.8s ease-out forwards'
              }}
            >
              <div
                className="rounded-full bg-gradient-to-br from-violet-500 to-purple-600 shadow-lg group-hover:scale-125 transition-all duration-300 flex items-center justify-center text-white font-bold text-xs border-2 border-white/50"
                style={{
                  width: `${getMarkerSize(country.revenue)}px`,
                  height: `${getMarkerSize(country.revenue)}px`
                }}
              >
                {country.code}
              </div>
              
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-20 pointer-events-none shadow-xl">
                <div className="font-semibold">{country.country}</div>
                <div>Revenue: ${country.revenue.toLocaleString()}</div>
                <div>Users: {country.users.toLocaleString()}</div>
                <div className={getGrowthColor(country.growth)}>
                  Growth: {country.growth > 0 ? '+' : ''}{country.growth}%
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Top Markets List */}
        <div className="space-y-3">
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-violet-500" />
            Top Markets
          </h3>
          {data.slice(0, 5).map((country, index) => (
            <div
              key={country.code}
              className="flex items-center justify-between p-3 rounded-xl bg-white/40 dark:bg-gray-900/40 backdrop-blur-sm border border-white/20 hover:bg-white/60 dark:hover:bg-gray-900/60 transition-all duration-200 group"
              style={{
                animationDelay: `${index * 100}ms`,
                animation: 'fadeInUp 0.4s ease-out forwards'
              }}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white font-bold text-xs shadow-md">
                  {country.code}
                </div>
                <div>
                  <div className="font-semibold text-gray-900 dark:text-gray-100 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                    {country.country}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
                    <Users className="h-3 w-3" />
                    {country.users.toLocaleString()} users
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="font-bold text-gray-900 dark:text-gray-100">
                  ${country.revenue.toLocaleString()}
                </div>
                <div className={`text-sm font-medium ${getGrowthColor(country.growth)}`}>
                  {country.growth > 0 ? '+' : ''}{country.growth}%
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Stats */}
        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="text-center p-4 rounded-xl bg-white/40 dark:bg-gray-900/40 backdrop-blur-sm border border-white/20">
            <div className="text-2xl font-bold text-violet-600 dark:text-violet-400">
              ${totalRevenue.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300 font-medium">
              Total Revenue
            </div>
          </div>
          <div className="text-center p-4 rounded-xl bg-white/40 dark:bg-gray-900/40 backdrop-blur-sm border border-white/20">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {totalUsers.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300 font-medium">
              Global Users
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}