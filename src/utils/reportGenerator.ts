import { GoogleGenerativeAI } from '@google/generative-ai';
import { REPORT_SECTIONS } from '../constants/sections';
import type { GenerationProgress } from '../types';

/**
 * Validates that the Gemini API key is configured.
 * Throws a user-friendly error if not.
 */
function getApiKey(): string {
  const key = import.meta.env.VITE_GEMINI_API_KEY;
  if (!key || key === 'your_gemini_api_key_here') {
    throw new Error(
      'Gemini API key is not configured. Please create a .env file with VITE_GEMINI_API_KEY set to your API key. ' +
      'Get a free key at https://aistudio.google.com/app/apikey'
    );
  }
  return key;
}

/**
 * Generates a comprehensive academic project report using Google Gemini AI.
 *
 * @param topic - The project topic to generate a report for
 * @param onProgress - Optional callback called after each section completes
 * @returns Full report content in Markdown format
 */
export async function generateReport(
  topic: string,
  onProgress?: (progress: GenerationProgress) => void
): Promise<string> {
  const trimmedTopic = topic.trim();
  if (!trimmedTopic) {
    throw new Error('Please enter a valid project topic.');
  }

  const apiKey = getApiKey();
  const genAI = new GoogleGenerativeAI(apiKey);

  // Use gemini-1.5-flash: fast, accurate, available on free tier
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  const total = REPORT_SECTIONS.length;
  let fullReport = `# Project Report: ${trimmedTopic}\n\n`;

  // Build a table of contents header
  fullReport += `## Table of Contents\n\n`;
  REPORT_SECTIONS.forEach((section, i) => {
    fullReport += `${i + 1}. ${section.title}\n`;
  });
  fullReport += '\n---\n\n';

  for (let i = 0; i < total; i++) {
    const section = REPORT_SECTIONS[i];
    const prompt = section.prompt.replace('{topic}', trimmedTopic);

    // Report progress before starting each section
    onProgress?.({
      current: i,
      total,
      sectionTitle: section.title,
      percentage: Math.round((i / total) * 100),
    });

    const result = await model.generateContent(
      `${prompt}\n\n` +
      `Format the response in proper Markdown with appropriate headings (##, ###) and paragraphs.\n` +
      `Be professional, academic, and technically detailed. Do not include a top-level title — ` +
      `start directly with a ## heading for the section title.\n` +
      `Include concrete examples, technical terminology, and well-structured arguments.`
    );

    const text = result.response.text();
    fullReport += text + '\n\n';

    // Report progress after section completes
    onProgress?.({
      current: i + 1,
      total,
      sectionTitle: section.title,
      percentage: Math.round(((i + 1) / total) * 100),
    });
  }

  return fullReport;
}

/**
 * Counts the approximate number of words in a markdown string.
 */
export function countWords(content: string): number {
  return content
    .replace(/#{1,6}\s/g, '')  // strip heading markers
    .replace(/[*_`~]/g, '')     // strip formatting chars
    .split(/\s+/)
    .filter(Boolean)
    .length;
}