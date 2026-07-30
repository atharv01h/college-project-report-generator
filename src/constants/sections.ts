import type { ReportSection } from '../types';

/**
 * Ordered list of academic report sections.
 * Each section is generated as a separate AI call for better quality and real-time progress.
 */
export const REPORT_SECTIONS: ReportSection[] = [
  {
    title: 'Executive Summary & Introduction',
    prompt: `Generate a detailed executive summary and introduction for a project report on "{topic}".
Include: project background, problem statement, objectives, scope, and significance of the study. (Aim for 1,500 words)`,
  },
  {
    title: 'Literature Review',
    prompt: `Generate a comprehensive literature review for a project on "{topic}".
Cover: current state of the field, key theories and frameworks, related prior work, research gaps, and theoretical foundation. (Aim for 1,500 words)`,
  },
  {
    title: 'Methodology',
    prompt: `Generate a detailed methodology section for a project on "{topic}".
Include: research design and philosophy, data collection approach, analysis techniques, tools and technologies used, ethical considerations, and justification for chosen methods. (Aim for 1,500 words)`,
  },
  {
    title: 'Results & Analysis',
    prompt: `Generate detailed results and analysis for a project on "{topic}".
Include: key findings, data interpretation, comparative analysis, statistical insights where applicable, and visual descriptions of data. (Aim for 1,500 words)`,
  },
  {
    title: 'Discussion, Conclusions & Future Work',
    prompt: `Generate a thorough discussion, conclusion, and future work section for a project on "{topic}".
Cover: interpretation of results in context, theoretical and practical implications, study limitations, recommendations, future research directions, and a strong conclusion. (Aim for 1,500 words)`,
  },
];

export const MIN_TOPIC_LENGTH = 3;
export const MAX_TOPIC_LENGTH = 200;
export const MAX_RECENT_TOPICS = 5;
export const RECENT_TOPICS_KEY = 'report_generator_recent_topics';
