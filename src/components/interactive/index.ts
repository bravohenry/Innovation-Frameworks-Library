// Interactive Components Index
// Centralized export for all interactive components

export { default as BaseInteractiveLayout } from './BaseInteractiveLayout';
export { default as NorthStarFrameworkDiagram } from './NorthStarFrameworkDiagram';
export { default as PortersFiveForcesDiagram } from './PortersFiveForcesDiagram2';
export { default as RaciChartDiagram } from './RaciChartDiagram';
export { default as FiveDysfunctionsDiagram } from './FiveDysfunctionsDiagram';
export { default as PestleAnalysisDiagram } from './PestleAnalysisDiagram';
export { default as SSwotAnalysisDiagram } from './SSwotAnalysisDiagram';
export { default as BusinessOpportunityDiagram } from './BusinessOpportunityDiagram';
export { default as GanttChartDiagram } from './GanttChartDiagram';

// Export types
export type {
  BaseInteractiveProps,
  InteractiveComponentProps,
  ExportOptions,
  NorthStarData,
  NorthStarNode,
  NorthStarHypothesis,
  PorterData,
  ForceData,
  RaciData,
  RaciRole,
  RaciTask,
  RaciAssignment,
  TeamDysfunctionData,
  Dysfunction,
  PestleData,
  PestleFactor,
  SSwotData,
  SwotFactor,
  SwotStrategy,
  OpportunityData,
  GanttData,
  GanttTask,
  ComponentState,
  ExportData
} from './types';

// Export utilities
export {
  convertToCSV,
  downloadFile,
  exportToPNG,
  exportToCSV,
  generateFilename,
  validateRACIMatrix,
  validateSWOTMatrix,
  formatNumber,
  formatPercentage,
  generateId,
  deepClone,
  debounce,
  isMobile,
  getChartHeight,
  hexToRgb,
  rgbToHex,
  addAlpha,
  CHART_COLORS,
  CHART_CONFIG
} from './utils';

// Component lazy loading helpers
export const lazyLoadComponents = {
  NorthStarFrameworkDiagram: () => import('./NorthStarFrameworkDiagram'),
  PortersFiveForcesDiagram: () => import('./PortersFiveForcesDiagram2'),
  RaciChartDiagram: () => import('./RaciChartDiagram'),
  FiveDysfunctionsDiagram: () => import('./FiveDysfunctionsDiagram'),
  PestleAnalysisDiagram: () => import('./PestleAnalysisDiagram'),
  SSwotAnalysisDiagram: () => import('./SSwotAnalysisDiagram'),
  BusinessOpportunityDiagram: () => import('./BusinessOpportunityDiagram'),
  GanttChartDiagram: () => import('./GanttChartDiagram'),
};

// Component type mapping
export const COMPONENT_TYPE_MAP = {
  'tree': 'NorthStarFrameworkDiagram',
  'radar': 'PortersFiveForcesDiagram', 
  'table': 'RaciChartDiagram',
  'viz': 'FiveDysfunctionsDiagram',
  'matrix': 'PestleAnalysisDiagram',
  'swot': 'SSwotAnalysisDiagram',
  'canvas': 'BusinessOpportunityDiagram',
  'gantt': 'GanttChartDiagram',
} as const;

// Framework slug to component mapping
export const FRAMEWORK_COMPONENT_MAP = {
  'north-star-framework': 'NorthStarFrameworkDiagram',
  'porters-five-forces': 'PortersFiveForcesDiagram',
  'raci-chart': 'RaciChartDiagram',
  'five-dysfunctions-team': 'FiveDysfunctionsDiagram',
  'pestle-analysis': 'PestleAnalysisDiagram',
  'sswot-analysis': 'SSwotAnalysisDiagram',
  'business-opportunity-statement': 'BusinessOpportunityDiagram',
  'gantt-chart': 'GanttChartDiagram',
} as const;