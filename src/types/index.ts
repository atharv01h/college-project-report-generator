// Shared TypeScript types and interfaces

export interface ReportSection {
  title: string;
  prompt: string;
}

export interface GenerationProgress {
  current: number;    // 0–5
  total: number;      // always 5
  sectionTitle: string;
  percentage: number; // 0–100
}

export type ExportFormat = 'md' | 'docx' | 'pdf';

export interface ReportState {
  topic: string;
  content: string;
  images: string[];
  isLoading: boolean;
  error: string | null;
  progress: GenerationProgress | null;
  wordCount: number;
}

export interface ParsedSection {
  type: 'h1' | 'h2' | 'h3' | 'paragraph' | 'listItem' | 'empty';
  content: string;
}

export interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}
