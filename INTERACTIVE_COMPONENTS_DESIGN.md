# DMGT Toolkit - Interactive Components Design Specification

## Overview

This document outlines the comprehensive design and implementation of interactive components for the DMGT (Digital Management Growth Toolkit) project. The components are designed to be production-ready, mobile-responsive, and fully bilingual (Chinese/English).

## Design Principles

### 1. **Unified Visual System**
- **Framework**: HeroUI + Tailwind CSS
- **Theme**: Light theme with consistent color palette
- **Typography**: Clear hierarchy with mobile-first responsive scaling
- **Spacing**: 8px grid system for consistent spacing
- **Corner Radius**: 8-16px for modern, friendly appearance

### 2. **Bilingual Experience**
- Full Chinese/English language support
- Context-aware language switching using `useI18n()` hook
- Culturally appropriate formatting and number systems
- Right-to-left friendly layouts where applicable

### 3. **Mobile-First Responsive Design**
- **Desktop**: Full interactive functionality with editing capabilities
- **Tablet**: Optimized layouts with touch-friendly controls
- **Mobile**: Read-only preview mode with essential information
- **Breakpoints**: 
  - Mobile: < 768px
  - Tablet: 768px - 1024px  
  - Desktop: > 1024px

### 4. **Accessibility & Performance**
- WCAG 2.1 AA compliance
- Keyboard navigation support
- Screen reader compatible
- Lazy loading with React.Suspense
- Optimized re-renders with proper state management

## Component Architecture

### Base Components

#### `BaseInteractiveLayout`
**Purpose**: Provides consistent layout and functionality across all interactive components.

**Features**:
- Standardized header with title and controls
- Path breadcrumb navigation (Chapter X → X.Y Subsection)
- Export functionality (PNG/CSV)
- Loading and error states
- Mobile responsiveness notices

**Props**:
```typescript
interface BaseInteractiveLayoutProps {
  title: string;
  titleEn?: string;
  children: React.ReactNode;
  loading?: boolean;
  error?: string | null;
  controls?: React.ReactNode;
  pathLabels?: { chapter: string; subsection?: string };
  // ... extends InteractiveComponentProps
}
```

### Interactive Components

## 1. North Star Framework Diagram (`NorthStarFrameworkDiagram.tsx`)

**Type**: Tree visualization with hierarchical metric decomposition
**Path**: Chapter 1 → 1.3 Opportunity Space

### Design Features:
- **Expandable Tree Structure**: Collapsible nodes showing NSM → Drivers → Inputs hierarchy
- **Progress Visualization**: Visual progress bars showing current vs target values
- **Hypothesis Management**: Separate section for tracking and validating key assumptions
- **Real-time Editing**: In-place editing of metrics, targets, and descriptions
- **Role Assignment**: Clear ownership indicators for each metric

### Key Interactions:
- Click to expand/collapse node branches
- Edit mode toggle for metric updates
- Hypothesis validation checkboxes
- Modal editing for detailed node properties

### Data Structure:
```typescript
interface NorthStarData {
  nodes: NorthStarNode[];        // Hierarchical metrics
  hypotheses: NorthStarHypothesis[];  // Validation assumptions
}
```

### Visual Hierarchy:
- **NSM (North Star Metric)**: Large, prominent with primary color
- **Drivers**: Medium size with secondary color coding
- **Inputs**: Smaller, supporting visual weight
- **Progress Bars**: Color-coded (green/yellow/red) based on achievement

## 2. Porter's Five Forces Diagram (`PortersFiveForcesDiagram.tsx`)

**Type**: Radar chart with interactive weight sliders
**Path**: Chapter 1 → 1.2 Industry Structure

### Design Features:
- **Force Cards Layout**: Grid of 5 cards representing each competitive force
- **Interactive Sliders**: 1-5 scale sliders for threat level assessment
- **Dynamic Scoring**: Real-time overall industry attractiveness calculation
- **Factor Management**: Expandable lists of influencing factors per force
- **Visual Intensity**: Color-coded threat levels (green=low, yellow=medium, red=high)

### Key Interactions:
- Slider adjustment for threat levels
- Card selection for detailed factor editing
- Textarea inputs for factor descriptions
- Overall summary editing

### Data Structure:
```typescript
interface PorterData {
  forces: ForceData[];           // 5 competitive forces
  overallRating?: number;        // Calculated average
  summary?: string;              // Analysis summary
}
```

### Color System:
- **Low Threat (1-2)**: Success green (#17c964)
- **Medium Threat (3)**: Warning amber (#f5a524)  
- **High Threat (4-5)**: Danger red (#f31260)

## 3. RACI Chart Diagram (`RaciChartDiagram.tsx`)

**Type**: Editable responsibility matrix table
**Path**: Chapter 1 → 1.1 Team & Mission

### Design Features:
- **Interactive Data Table**: Clean, scannable matrix layout
- **Role-Task Intersections**: Dropdown selectors for R/A/C/I assignments
- **Validation System**: Real-time checking for proper RACI rules
- **Legend Toggle**: Expandable explanation of RACI roles
- **Summary Statistics**: Quick overview cards showing metrics

### Key Interactions:
- Dropdown selection for responsibility assignment
- Toggle legend for RACI explanation
- Validation warnings for missing/duplicate assignments
- Export to structured CSV format

### Data Structure:
```typescript
interface RaciData {
  roles: RaciRole[];             // Team roles/people
  tasks: RaciTask[];             // Project tasks
  assignments: RaciAssignment[]; // Role-task mappings
}
```

### Validation Rules:
- Each task must have exactly one 'A' (Accountable)
- Each task should have at least one 'R' (Responsible)
- Warnings for tasks with no clear ownership
- Alerts for responsibility conflicts

## 4. Five Dysfunctions Team Diagram (`FiveDysfunctionsDiagram.tsx`)

**Type**: Pyramid visualization with assessment scoring
**Path**: Chapter 1 → 1.1 Team & Mission

### Design Features:
- **Pyramid Structure**: Visual representation of dysfunction hierarchy
- **Assessment Scores**: 1-5 scoring system for each dysfunction level
- **Symptoms & Solutions**: Expandable sections with actionable insights  
- **Progress Tracking**: Visual indicators of improvement over time
- **Team Context**: Customizable team information and assessment dates

### Key Interactions:
- Scoring sliders for dysfunction assessment
- Expandable cards for symptoms/solutions
- Team information editing
- Progress comparison over time

### Data Structure:
```typescript
interface TeamDysfunctionData {
  dysfunctions: Dysfunction[];   // 5 levels with scores
  teamName?: string;            // Team context
  overallScore?: number;        // Average assessment
}
```

## 5. PESTLE Analysis (`PestleAnalysisDiagram.tsx`)

**Type**: Six-dimension matrix with impact assessment
**Path**: Chapter 1 → 1.2 Industry Structure

### Design Features:
- **Six-Panel Layout**: Grid showing Political, Economic, Social, Technological, Legal, Environmental
- **Impact Scoring**: 1-5 scale with direction (opportunity/threat/neutral)
- **Timeframe Indicators**: Short/medium/long-term impact classification
- **Factor Management**: Add/edit/remove factors within each dimension
- **Visual Summary**: Overview dashboard showing key insights

### Key Interactions:
- Impact level sliders
- Direction selection (opportunity/threat/neutral)
- Timeframe classification
- Factor description editing

### Data Structure:
```typescript
interface PestleData {
  factors: PestleFactor[];       // Cross-dimensional factors
  summary?: string;              // Analysis summary
}
```

## 6. sSWOT Analysis (`SSwotAnalysisDiagram.tsx`)

**Type**: Strategic 2x2 matrix with strategy generation
**Path**: Chapter 1 → 1.2 Industry Structure  

### Design Features:
- **Situational Context**: Clear problem/opportunity framing
- **Four-Quadrant Matrix**: Visual S/W vs O/T positioning
- **Strategy Generation**: SO/ST/WO/WT strategic options
- **Priority Ranking**: Feasibility vs impact assessment
- **Action Planning**: Concrete next steps for each strategy

### Key Interactions:
- Factor categorization (S/W/O/T)
- Strategy priority ranking
- Feasibility and impact scoring
- Situational context editing

### Data Structure:
```typescript
interface SSwotData {
  situation: string;             // Context framing
  factors: SwotFactor[];         // SWOT elements
  strategies: SwotStrategy[];    // Generated strategies
}
```

## 7. Business Opportunity Statement (`BusinessOpportunityDiagram.tsx`)

**Type**: One-page canvas visualization
**Path**: Chapter 1 → 1.3 Opportunity Space

### Design Features:
- **Four-Section Canvas**: Who/What/Why/How structure
- **Assumption Tracking**: Clear identification of key hypotheses
- **Validation Planning**: Structured approach to testing assumptions
- **Visual Layout**: Clean, scannable one-page format
- **Export Ready**: Designed for sharing and presentation

### Key Interactions:
- Section-by-section editing
- Assumption management
- Validation planning
- Export to presentation format

### Data Structure:
```typescript
interface OpportunityData {
  who: string;                   // Target audience
  what: string;                  // Core pain point  
  why: string;                   // Value proposition
  how: string;                   // Success criteria
  assumptions: string[];         // Key hypotheses
}
```

## 8. Gantt Chart (`GanttChartDiagram.tsx`)

**Type**: Timeline visualization with dependencies
**Path**: Chapter 1 → 1.1 Team & Mission

### Design Features:
- **Timeline Visualization**: Horizontal bar chart showing task duration
- **Dependency Mapping**: Visual connections between related tasks
- **Milestone Markers**: Key checkpoint visualization
- **Progress Tracking**: Current completion status
- **Resource Allocation**: Owner assignment and workload visualization

### Key Interactions:
- Task duration editing
- Dependency management
- Milestone setting
- Progress updates
- Resource assignment

### Data Structure:
```typescript
interface GanttData {
  tasks: GanttTask[];            // Project tasks
  timeRange: { start: string; end: string };
  milestones: GanttTask[];       // Key milestones
}
```

## Export System

### PNG Export
- **Technology**: html2canvas integration (placeholder implemented)
- **Quality**: High-resolution chart snapshots
- **Naming**: Automatic timestamping
- **Format**: Standard PNG for presentations and sharing

### CSV Export  
- **Structure**: Tabular data export for analysis
- **Encoding**: UTF-8 with proper Chinese character support
- **Format**: Standard CSV compatible with Excel/Google Sheets
- **Content**: All relevant data points with proper headers

### Export Utilities:
```typescript
// Export functions in utils.ts
export const exportToPNG = async (elementId: string, filename: string): Promise<void>
export const exportToCSV = (data: any[], filename: string): void
export const generateFilename = (baseName: string, extension: string): string
```

## State Management

### Component State Pattern:
```typescript
interface ComponentState {
  loading: boolean;              // Async operation status
  error: string | null;          // Error messaging  
  isEditing: boolean;            // Edit mode toggle
  selectedItem: string | null;   // Current selection
  filters: Record<string, any>;  // View filters
  viewMode: 'view' | 'edit' | 'export'; // Current mode
}
```

### Data Flow:
1. **Initial Load**: Component receives data via props
2. **User Interaction**: Local state updates for immediate feedback
3. **Change Propagation**: `onDataChange` callback updates parent state
4. **Export Trigger**: `onExport` callback handles data export requests

## Responsive Design Strategy

### Desktop (>1024px):
- Full functionality with all interactive elements
- Multi-column layouts for efficient space usage
- Hover states and detailed tooltips
- Complex editing interfaces

### Tablet (768-1024px):
- Touch-optimized controls with larger hit targets
- Simplified layouts with priority-based hiding
- Swipe gestures where appropriate
- Modal interfaces for complex editing

### Mobile (<768px):
- Read-only preview mode with essential information
- Single-column layouts for easy scrolling
- Clear visual hierarchy with important data highlighted
- "Use desktop for full functionality" messaging

## Performance Optimizations

### Code Splitting:
- Lazy loading with React.Suspense for each component
- Dynamic imports to reduce initial bundle size
- Progressive loading of complex visualizations

### Memory Management:
- Proper cleanup of event listeners
- Efficient re-rendering with React.memo where appropriate
- Debounced input handling for real-time updates

### Network Optimization:
- Compressed data structures
- Efficient serialization for export functions
- Minimal external dependencies

## Implementation Progress

### Completed Components:
✅ `types.ts` - Complete TypeScript interfaces
✅ `BaseInteractiveLayout.tsx` - Shared layout component  
✅ `utils.ts` - Export and utility functions
✅ `PortersFiveForcesDiagram.tsx` - Full implementation
✅ `NorthStarFrameworkDiagram.tsx` - Complete with tree structure
✅ `RaciChartDiagram.tsx` - Matrix table with validation

### Next Steps:
🔲 Implement remaining 5 components
🔲 Add html2canvas for PNG export functionality
🔲 Integrate chart libraries for enhanced visualizations
🔲 Add unit tests for critical functionality
🔲 Performance testing and optimization

## Integration Notes

### Existing Codebase:
- Components integrate with existing `FrameworkDetail.tsx`
- Uses established `useI18n()` context for language switching
- Maintains consistency with current HeroUI component usage
- Follows existing file structure and naming conventions

### Required Dependencies:
```json
{
  "html2canvas": "^1.4.1",      // For PNG export
  "chart.js": "^4.2.1",         // For advanced charts  
  "react-chartjs-2": "^5.2.0",  // React Chart.js wrapper
  "date-fns": "^2.29.3"         // Date formatting utilities
}
```

This comprehensive design ensures a cohesive, professional, and highly functional interactive experience that elevates the DMGT toolkit beyond basic static content into engaging, educational tools that help users learn and apply business frameworks effectively.