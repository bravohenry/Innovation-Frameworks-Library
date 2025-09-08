// Export utility functions for interactive components

import { ExportData } from './types';

// Convert data to CSV format
export const convertToCSV = (data: any[]): string => {
  if (!data || data.length === 0) return '';
  
  const headers = Object.keys(data[0]);
  const csvHeaders = headers.join(',');
  
  const csvRows = data.map(row => 
    headers.map(header => {
      const value = row[header];
      if (value === null || value === undefined) return '';
      if (typeof value === 'string' && (value.includes(',') || value.includes('"') || value.includes('\n'))) {
        return `"${value.replace(/"/g, '""')}"`;
      }
      return String(value);
    }).join(',')
  );
  
  return [csvHeaders, ...csvRows].join('\n');
};

// Trigger file download
export const downloadFile = (content: string, filename: string, mimeType: string = 'text/plain') => {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

// Export to PNG using html2canvas
export const exportToPNG = async (elementId: string, filename: string): Promise<void> => {
  try {
    const html2canvas = (await import('html2canvas')).default;
    const element = document.getElementById(elementId);
    
    if (!element) {
      throw new Error(`Element with ID '${elementId}' not found`);
    }

    // Configure html2canvas options for better quality
    const canvas = await html2canvas(element, {
      useCORS: true,
      allowTaint: true,
      scale: 2, // Higher resolution
      backgroundColor: '#ffffff',
      logging: false,
      onclone: (clonedDoc) => {
        // Ensure fonts are loaded
        const clonedElement = clonedDoc.getElementById(elementId);
        if (clonedElement) {
          clonedElement.style.fontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
        }
      }
    });

    // Convert canvas to blob and download
    canvas.toBlob((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = generateFilename(filename, 'png');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }
    }, 'image/png', 1.0);

  } catch (error) {
    console.error('Error exporting to PNG:', error);
    // Fallback notification
    alert('PNG导出失败，请稍后重试 / PNG export failed, please try again');
    throw error;
  }
};

// Export to CSV
export const exportToCSV = (data: any[], filename: string): void => {
  try {
    const csvContent = convertToCSV(data);
    const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
    const fullFilename = `${filename}_${timestamp}.csv`;
    downloadFile(csvContent, fullFilename, 'text/csv');
  } catch (error) {
    console.error('Error exporting to CSV:', error);
    throw error;
  }
};

// Generate filename with timestamp
export const generateFilename = (baseName: string, extension: string): string => {
  const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
  return `${baseName}_${timestamp}.${extension}`;
};

// Color palette for consistent theming
export const CHART_COLORS = {
  primary: '#006FEE',
  secondary: '#7828c8',
  success: '#17c964',
  warning: '#f5a524',
  danger: '#f31260',
  default: '#71717a',
  background: '#f4f4f5',
  foreground: '#11181c'
};

// Common chart configurations
export const CHART_CONFIG = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom' as const,
      labels: {
        padding: 20,
        usePointStyle: true
      }
    },
    tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      titleColor: '#ffffff',
      bodyColor: '#ffffff',
      cornerRadius: 8,
      padding: 12
    }
  },
  elements: {
    point: {
      radius: 6,
      hoverRadius: 8
    },
    line: {
      tension: 0.3
    }
  }
};

// Utility functions for data validation
export const validateRACIMatrix = (assignments: any[], tasks: any[]): string[] => {
  const issues: string[] = [];
  
  for (const task of tasks) {
    const taskAssignments = assignments.filter(a => a.taskId === task.id);
    const accountableCount = taskAssignments.filter(a => a.responsibility === 'A').length;
    
    if (accountableCount === 0) {
      issues.push(`Task "${task.name}" has no Accountable person (A)`);
    } else if (accountableCount > 1) {
      issues.push(`Task "${task.name}" has multiple Accountable persons (A)`);
    }
    
    const responsibleCount = taskAssignments.filter(a => a.responsibility === 'R').length;
    if (responsibleCount === 0) {
      issues.push(`Task "${task.name}" has no Responsible person (R)`);
    }
  }
  
  return issues;
};

// Utility for SWOT matrix validation
export const validateSWOTMatrix = (factors: any[], strategies: any[]): string[] => {
  const issues: string[] = [];
  
  const factorCounts = {
    strength: factors.filter(f => f.type === 'strength').length,
    weakness: factors.filter(f => f.type === 'weakness').length,
    opportunity: factors.filter(f => f.type === 'opportunity').length,
    threat: factors.filter(f => f.type === 'threat').length
  };
  
  Object.entries(factorCounts).forEach(([type, count]) => {
    if (count === 0) {
      issues.push(`No ${type} factors identified`);
    }
  });
  
  const strategyCounts = {
    SO: strategies.filter(s => s.type === 'SO').length,
    ST: strategies.filter(s => s.type === 'ST').length,
    WO: strategies.filter(s => s.type === 'WO').length,
    WT: strategies.filter(s => s.type === 'WT').length
  };
  
  Object.entries(strategyCounts).forEach(([type, count]) => {
    if (count === 0) {
      issues.push(`No ${type} strategies defined`);
    }
  });
  
  return issues;
};

// Format number with locale support
export const formatNumber = (value: number, locale: 'zh' | 'en' = 'zh'): string => {
  return new Intl.NumberFormat(locale === 'zh' ? 'zh-CN' : 'en-US').format(value);
};

// Format percentage
export const formatPercentage = (value: number, decimals: number = 1): string => {
  return `${value.toFixed(decimals)}%`;
};

// Generate unique ID
export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};

// Deep clone object
export const deepClone = <T>(obj: T): T => {
  return JSON.parse(JSON.stringify(obj));
};

// Debounce function for performance optimization
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Mobile detection
export const isMobile = (): boolean => {
  return window.innerWidth < 768;
};

// Get responsive chart height
export const getChartHeight = (baseHeight: number = 400): number => {
  if (isMobile()) {
    return Math.max(baseHeight * 0.7, 300);
  }
  return baseHeight;
};

// Color utilities
export const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
};

export const rgbToHex = (r: number, g: number, b: number): string => {
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
};

export const addAlpha = (hex: string, alpha: number): string => {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;
  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`;
};