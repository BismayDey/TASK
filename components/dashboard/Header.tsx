"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MoonIcon, SunIcon, Download, RefreshCw } from 'lucide-react';
import { useTheme } from 'next-themes';

interface HeaderProps {
  onRefresh: () => void;
  onExport: () => void;
  isRefreshing: boolean;
}

export function Header({ onRefresh, onExport, isRefreshing }: HeaderProps) {
  const { theme, setTheme } = useTheme();

  return (
    <header className="border-b border-border/40 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-6 py-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-blue-700 to-purple-600 bg-clip-text text-transparent">
                  ADmyBRAND Insights
                </h1>
                <p className="text-sm text-muted-foreground font-medium">
                  Advanced Analytics Dashboard
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={onRefresh}
              disabled={isRefreshing}
              className="transition-all duration-200 hover:scale-105 hover:bg-primary/10 hover:text-primary border border-border/50 hover:border-primary/30"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={onExport}
              className="transition-all duration-200 hover:scale-105 hover:bg-primary/10 hover:text-primary border border-border/50 hover:border-primary/30"
            >
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              className="transition-all duration-200 hover:scale-105 hover:bg-primary/10 hover:text-primary border border-border/50 hover:border-primary/30"
            >
              <SunIcon className="h-4 w-4 rotate-0 scale-100 transition-all duration-300 dark:-rotate-90 dark:scale-0" />
              <MoonIcon className="absolute h-4 w-4 rotate-90 scale-0 transition-all duration-300 dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}