// Interactive Component Types
// Base interface for all interactive components

export interface BaseInteractiveProps {
  lang: 'zh' | 'en';
  data?: any;
  onDataChange?: (data: any) => void;
  onExport?: (type: 'png' | 'csv', data: any) => void;
}

export interface ExportOptions {
  png: boolean;
  csv: boolean;
}

// North Star Framework Types
export interface NorthStarNode {
  id: string;
  parentId: string | null;
  name: string;
  nameEn?: string;
  type: 'nsm' | 'driver' | 'input';
  unit?: string;
  owner?: string;
  value?: number;
  target?: number;
  description?: string;
  descriptionEn?: string;
}

export interface NorthStarHypothesis {
  id: string;
  text: string;
  textEn?: string;
  priority: 'high' | 'medium' | 'low';
  validated: boolean;
  confidence?: number;
}

export interface NorthStarData {
  nodes: NorthStarNode[];
  hypotheses: NorthStarHypothesis[];
}

// Porter's Five Forces Types
export interface ForceData {
  key: string;
  labelZh: string;
  labelEn: string;
  weight: number; // 1-5
  description?: string;
  descriptionEn?: string;
  factors?: string[];
  factorsEn?: string[];
}

export interface PorterData {
  forces: ForceData[];
  overallRating?: number;
  summary?: string;
  summaryEn?: string;
}

// RACI Chart Types
export interface RaciRole {
  id: string;
  name: string;
  nameEn?: string;
  department?: string;
  avatar?: string;
}

export interface RaciTask {
  id: string;
  name: string;
  nameEn?: string;
  category?: string;
  description?: string;
  descriptionEn?: string;
}

export interface RaciAssignment {
  taskId: string;
  roleId: string;
  responsibility: 'R' | 'A' | 'C' | 'I';
}

export interface RaciData {
  roles: RaciRole[];
  tasks: RaciTask[];
  assignments: RaciAssignment[];
}

// Five Dysfunctions Types
export interface Dysfunction {
  key: string;
  labelZh: string;
  labelEn: string;
  level: number; // 1-5 (bottom to top)
  symptoms: string[];
  symptomsEn?: string[];
  solutions: string[];
  solutionsEn?: string[];
  score: number; // 1-5 assessment score
}

export interface TeamDysfunctionData {
  dysfunctions: Dysfunction[];
  teamName?: string;
  assessmentDate?: string;
  overallScore?: number;
}

// PESTLE Analysis Types
export interface PestleFactor {
  id: string;
  dimension: 'Political' | 'Economic' | 'Social' | 'Technological' | 'Legal' | 'Environmental';
  factor: string;
  factorEn?: string;
  impact: number; // 1-5
  direction: 'opportunity' | 'threat' | 'neutral';
  timeframe: 'short' | 'medium' | 'long';
  description?: string;
  descriptionEn?: string;
}

export interface PestleData {
  factors: PestleFactor[];
  summary?: string;
  summaryEn?: string;
}

// sSWOT Analysis Types
export interface SwotFactor {
  id: string;
  type: 'strength' | 'weakness' | 'opportunity' | 'threat';
  content: string;
  contentEn?: string;
  priority: number; // 1-5
}

export interface SwotStrategy {
  id: string;
  type: 'SO' | 'ST' | 'WO' | 'WT';
  title: string;
  titleEn?: string;
  description: string;
  descriptionEn?: string;
  priority: number; // 1-5
  feasibility: number; // 1-5
  impact: number; // 1-5
}

export interface SSwotData {
  situation: string;
  situationEn?: string;
  factors: SwotFactor[];
  strategies: SwotStrategy[];
}

// Business Opportunity Statement Types
export interface OpportunityData {
  who: string;
  whoEn?: string;
  what: string;
  whatEn?: string;
  why: string;
  whyEn?: string;
  how: string;
  howEn?: string;
  assumptions: string[];
  assumptionsEn?: string[];
  validationPlan: string[];
  validationPlanEn?: string[];
}

// Gantt Chart Types
export interface GanttTask {
  id: string;
  name: string;
  nameEn?: string;
  startDate: string;
  endDate: string;
  progress: number; // 0-100
  owner?: string;
  dependencies: string[]; // task IDs
  type: 'task' | 'milestone';
  category?: string;
  description?: string;
  descriptionEn?: string;
}

export interface GanttData {
  tasks: GanttTask[];
  timeRange: {
    start: string;
    end: string;
  };
  milestones: GanttTask[];
}

// Common UI State Types
export interface ComponentState {
  loading: boolean;
  error: string | null;
  isEditing: boolean;
  selectedItem: string | null;
  filters: Record<string, any>;
  viewMode: 'view' | 'edit' | 'export';
}

// Export Data Types
export interface ExportData {
  type: 'png' | 'csv';
  filename: string;
  data: any;
  timestamp: string;
}

// Component Props Extensions
export interface InteractiveComponentProps extends BaseInteractiveProps {
  className?: string;
  height?: number | string;
  showControls?: boolean;
  showExportButtons?: boolean;
  readOnly?: boolean;
  theme?: 'light' | 'dark';
}