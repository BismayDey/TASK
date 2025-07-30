"use client";

import { useState, useMemo } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ChevronLeftIcon, ChevronRightIcon, Search, ArrowUpDown } from 'lucide-react';
import { TableDataRow } from '@/lib/mockData';

interface DataTableProps {
  data: TableDataRow[];
  isLoading?: boolean;
}

type SortField = keyof TableDataRow;
type SortDirection = 'asc' | 'desc';

export function DataTable({ data, isLoading }: DataTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [platformFilter, setPlatformFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState<SortField>('date');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const itemsPerPage = 5;

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const filteredAndSortedData = useMemo(() => {
    let filtered = data.filter((row) => {
      const matchesSearch = row.campaign.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           row.platform.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || row.status === statusFilter;
      const matchesPlatform = platformFilter === 'all' || row.platform === platformFilter;
      
      return matchesSearch && matchesStatus && matchesPlatform;
    });

    // Sort data
    filtered.sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];

      // Handle numeric fields
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
      }

      // Handle string fields
      const aStr = String(aValue).toLowerCase();
      const bStr = String(bValue).toLowerCase();
      
      if (sortDirection === 'asc') {
        return aStr < bStr ? -1 : aStr > bStr ? 1 : 0;
      } else {
        return aStr > bStr ? -1 : aStr < bStr ? 1 : 0;
      }
    });

    return filtered;
  }, [data, searchTerm, statusFilter, platformFilter, sortField, sortDirection]);

  const totalPages = Math.ceil(filteredAndSortedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredAndSortedData.slice(startIndex, startIndex + itemsPerPage);

  const getStatusBadge = (status: string) => {
    const variants = {
      active: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
      paused: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
      completed: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
    };
    
    return (
      <Badge className={variants[status as keyof typeof variants] || variants.active}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const platforms = [...new Set(data.map(row => row.platform))];

  if (isLoading) {
    return (
      <Card className="relative overflow-hidden">
        <CardHeader>
          <div className="h-6 bg-muted rounded-md w-48 mb-2 animate-shimmer"></div>
          <div className="h-4 bg-muted rounded-md w-64 animate-shimmer"></div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="h-10 bg-muted rounded-md flex-1 animate-shimmer"></div>
              <div className="h-10 bg-muted rounded-md w-32 animate-shimmer"></div>
              <div className="h-10 bg-muted rounded-md w-32 animate-shimmer"></div>
            </div>
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-12 bg-muted rounded-md animate-shimmer"></div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 border-border/50 hover:border-primary/30 bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Campaign Performance</CardTitle>
        <CardDescription className="text-base font-medium">
          Detailed analytics for all active campaigns
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4 z-10" />
            <Input
              placeholder="Search campaigns..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 transition-all duration-200 focus:ring-2 focus:ring-primary/20 focus:border-primary bg-background/50 backdrop-blur-sm border-border/50 hover:border-primary/30"
            />
          </div>
          
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-32 bg-background/50 backdrop-blur-sm border-border/50 hover:border-primary/30 focus:ring-2 focus:ring-primary/20">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent className="bg-background/95 backdrop-blur-xl border-border/50">
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="paused">Paused</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>

          <Select value={platformFilter} onValueChange={setPlatformFilter}>
            <SelectTrigger className="w-full sm:w-32 bg-background/50 backdrop-blur-sm border-border/50 hover:border-primary/30 focus:ring-2 focus:ring-primary/20">
              <SelectValue placeholder="Platform" />
            </SelectTrigger>
            <SelectContent className="bg-background/95 backdrop-blur-xl border-border/50">
              <SelectItem value="all">All Platforms</SelectItem>
              {platforms.map((platform) => (
                <SelectItem key={platform} value={platform}>
                  {platform}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Table */}
        <div className="rounded-xl border border-border/50 overflow-hidden bg-background/30 backdrop-blur-sm">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-muted/30 border-border/50 bg-muted/20">
                <TableHead 
                  className="cursor-pointer select-none hover:bg-muted/40 transition-colors font-semibold text-foreground"
                  onClick={() => handleSort('campaign')}
                >
                  <div className="flex items-center gap-2">
                    Campaign
                    <ArrowUpDown className="h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead 
                  className="cursor-pointer select-none hover:bg-muted/40 transition-colors font-semibold text-foreground"
                  onClick={() => handleSort('platform')}
                >
                  <div className="flex items-center gap-2">
                    Platform
                    <ArrowUpDown className="h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead 
                  className="text-right cursor-pointer select-none hover:bg-muted/40 transition-colors font-semibold text-foreground"
                  onClick={() => handleSort('impressions')}
                >
                  <div className="flex items-center justify-end gap-2">
                    Impressions
                    <ArrowUpDown className="h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead 
                  className="text-right cursor-pointer select-none hover:bg-muted/40 transition-colors font-semibold text-foreground"
                  onClick={() => handleSort('ctr')}
                >
                  <div className="flex items-center justify-end gap-2">
                    CTR (%)
                    <ArrowUpDown className="h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead 
                  className="text-right cursor-pointer select-none hover:bg-muted/40 transition-colors font-semibold text-foreground"
                  onClick={() => handleSort('spend')}
                >
                  <div className="flex items-center justify-end gap-2">
                    Spend
                    <ArrowUpDown className="h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead 
                  className="text-right cursor-pointer select-none hover:bg-muted/40 transition-colors font-semibold text-foreground"
                  onClick={() => handleSort('roas')}
                >
                  <div className="flex items-center justify-end gap-2">
                    ROAS
                    <ArrowUpDown className="h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead className="font-semibold text-foreground">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.map((row, index) => (
                <TableRow 
                  key={row.id} 
                  className="hover:bg-muted/30 transition-all duration-200 border-border/30 hover:border-primary/20 group"
                  style={{
                    animationDelay: `${index * 50}ms`,
                    animation: 'fadeInUp 0.4s ease-out forwards'
                  }}
                >
                  <TableCell className="font-semibold text-foreground group-hover:text-primary transition-colors">{row.campaign}</TableCell>
                  <TableCell className="font-medium text-muted-foreground group-hover:text-foreground transition-colors">{row.platform}</TableCell>
                  <TableCell className="text-right font-medium">{row.impressions.toLocaleString()}</TableCell>
                  <TableCell className="text-right font-medium">{row.ctr.toFixed(1)}%</TableCell>
                  <TableCell className="text-right font-medium">${row.spend.toLocaleString()}</TableCell>
                  <TableCell className="text-right font-medium">{row.roas.toFixed(1)}x</TableCell>
                  <TableCell>{getStatusBadge(row.status)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between space-x-2 py-4">
          <div className="text-sm text-muted-foreground font-medium">
            Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredAndSortedData.length)} of{' '}
            {filteredAndSortedData.length} results
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="transition-all duration-200 hover:scale-105 border border-border/50 hover:border-primary/30 hover:bg-primary/10 hover:text-primary"
            >
              <ChevronLeftIcon className="h-4 w-4" />
              Previous
            </Button>
            <div className="flex items-center space-x-1">
              {[...Array(totalPages)].map((_, i) => (
                <Button
                  key={i + 1}
                  variant={currentPage === i + 1 ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-8 h-8 p-0 transition-all duration-200 hover:scale-105 ${
                    currentPage === i + 1 
                      ? 'bg-primary text-primary-foreground shadow-md' 
                      : 'border border-border/50 hover:border-primary/30 hover:bg-primary/10 hover:text-primary'
                  }`}
                >
                  {i + 1}
                </Button>
              ))}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="transition-all duration-200 hover:scale-105 border border-border/50 hover:border-primary/30 hover:bg-primary/10 hover:text-primary"
            >
              Next
              <ChevronRightIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}