// Created by Atharv Hatwar
import { GoogleGenerativeAI } from '@google/generative-ai';

// Created by Atharv Hatwar
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

// Created by Atharv Hatwar
export async function generateReport(topic: string): Promise<string> {
  // Created by Atharv Hatwar
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

  // Created by Atharv Hatwar
  const sections = [
    {
      title: 'Executive Summary and Introduction',
      prompt: `Generate a detailed executive summary and introduction for a project report on "${topic}".
      Include background information, project objectives, and scope. (Aim for 1,500 words)`
    },
    {
      title: 'Literature Review',
      prompt: `Generate a comprehensive literature review for a project on "${topic}".
      Cover current state of the field, related work, and theoretical framework. (Aim for 1,500 words)`
    },
    {
      title: 'Methodology',
      prompt: `Generate a detailed methodology section for a project on "${topic}".
      Include research design, data collection methods, and analysis approaches. (Aim for 1,500 words)`
    },
    {
      title: 'Results and Analysis',
      prompt: `Generate detailed results and analysis for a project on "${topic}".
      Include key findings, data analysis, and interpretation. (Aim for 1,500 words)`
    },
    {
      title: 'Discussion and Implications',
      prompt: `Generate a thorough discussion and implications section for a project on "${topic}".
      Cover theoretical and practical implications, limitations, and future directions. (Aim for 1,500 words)`
    }
  ];

  // Created by Atharv Hatwar
  try {
    let fullReport = '# Project Report\n\n';

    // Created by Atharv Hatwar
    for (const section of sections) {
      const result = await model.generateContent(
        `${section.prompt}\n\nFormat the response in proper Markdown with appropriate headings (#, ##, ###) and paragraphs.
        Make it professional and academic. Include relevant technical details and citations.`
      );
      const response = await result.response;
      const text = response.text();
      fullReport += text + '\n\n';
    }

    // Created by Atharv Hatwar
    return fullReport;
  } catch (error) {
    // Created by Atharv Hatwar
    console.error('Error generating report:', error);
    throw error;
  }
}