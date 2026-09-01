export type CategoryType = 
  | 'Foundation Model'
  | 'Agentic AI'
  | 'Vision & Video'
  | 'Code & Reasoning'
  | 'Voice & Audio'
  | 'Infrastructure & Tooling'
  | 'Research & Benchmark'
  | 'N/A';

export interface Company {
  id: string;
  name: string;
  shortName: string;
  tagline: string;
  brandColor: string;
  accentColor: string;
  country: string;
  website: string;
  logoKey: string;
  section?: 'frontier' | 'thinking-machines';
  isCustom?: boolean;
}

export interface LaunchUpdate {
  id: string;
  companyId: string;
  date: string; // ISO format: YYYY-MM-DD
  title: string;
  summary: string;
  category: CategoryType;
  links?: {
    label: string;
    url: string;
  }[];
  tags?: string[];
  isHighlight?: boolean;
  createdAt: string;
}

export interface DateRange {
  startDate: string;
  endDate: string;
}

export type ViewMode = 'grid' | 'timeline' | 'feed';

export type GridOrientation = 'dates-vertical' | 'dates-horizontal';
