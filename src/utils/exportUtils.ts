/**
 * Fetches a remote image URL and converts it to a base64 data URL.
 * Handles CORS errors gracefully by returning null instead of throwing.
 */
async function fetchImageAsBase64(url: string): Promise<string | null> {
  try {
    const response = await fetch(url);
    if (!response.ok) return null;
    const blob = await response.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = () => resolve(null);
      reader.readAsDataURL(blob);
    });
  } catch {
    return null;
  }
}

/**
 * Parses markdown content into structured sections for export.
 * Handles multi-line paragraphs correctly (unlike the previous naive string split).
 */
export function parseMarkdownToSections(content: string) {
  const lines = content.split('\n');
  const sections: Array<{ type: 'h1' | 'h2' | 'h3' | 'paragraph'; content: string }> = [];
  let paragraphBuffer: string[] = [];

  const flushParagraph = () => {
    const text = paragraphBuffer.join(' ').trim();
    if (text) {
      sections.push({ type: 'paragraph', content: text });
    }
    paragraphBuffer = [];
  };

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      flushParagraph();
      continue;
    }
    if (trimmed.startsWith('### ')) {
      flushParagraph();
      sections.push({ type: 'h3', content: trimmed.slice(4) });
    } else if (trimmed.startsWith('## ')) {
      flushParagraph();
      sections.push({ type: 'h2', content: trimmed.slice(3) });
    } else if (trimmed.startsWith('# ')) {
      flushParagraph();
      sections.push({ type: 'h1', content: trimmed.slice(2) });
    } else if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      flushParagraph();
      paragraphBuffer.push(trimmed.slice(2));
    } else {
      // Strip inline markdown formatting for plain-text exports
      const clean = trimmed
        .replace(/\*\*(.+?)\*\*/g, '$1')
        .replace(/\*(.+?)\*/g, '$1')
        .replace(/`(.+?)`/g, '$1')
        .replace(/\[(.+?)\]\(.+?\)/g, '$1');
      paragraphBuffer.push(clean);
    }
  }
  flushParagraph();
  return sections;
}

/**
 * Exports the report to a .docx Word document.
 */
export async function exportToWord(content: string, images: string[]): Promise<void> {
  const { Document, Packer, Paragraph, TextRun, ImageRun, HeadingLevel, AlignmentType } =
    await import('docx');
  const { saveAs } = await import('file-saver');

  const sections = parseMarkdownToSections(content);
  const children: InstanceType<typeof Paragraph>[] = [];

  // Title
  children.push(
    new Paragraph({
      text: 'Project Report',
      heading: HeadingLevel.TITLE,
      alignment: AlignmentType.CENTER,
      spacing: { after: 400 },
    })
  );

  // Content sections
  for (const section of sections) {
    if (section.type === 'h1' || section.type === 'h2' || section.type === 'h3') {
      children.push(
        new Paragraph({
          text: section.content,
          heading:
            section.type === 'h1'
              ? HeadingLevel.HEADING_1
              : section.type === 'h2'
              ? HeadingLevel.HEADING_2
              : HeadingLevel.HEADING_3,
          spacing: { before: 400, after: 200 },
        })
      );
    } else {
      children.push(
        new Paragraph({
          children: [new TextRun({ text: section.content, size: 24, font: 'Times New Roman' })],
          spacing: { before: 200, after: 200 },
        })
      );
    }
  }

  // Images section
  if (images.length > 0) {
    children.push(
      new Paragraph({
        text: 'Related Images',
        heading: HeadingLevel.HEADING_1,
        spacing: { before: 400, after: 200 },
      })
    );

    for (const imageUrl of images) {
      const base64Image = await fetchImageAsBase64(imageUrl);
      if (!base64Image) continue;

      try {
        const base64Data = base64Image.split(',')[1];
        children.push(
          new Paragraph({
            children: [
              new ImageRun({
                data: base64Data,
                transformation: { width: 500, height: 300 },
                type: 'jpg',
              }),
            ],
            spacing: { before: 200, after: 200 },
          })
        );
      } catch {
        // Skip images that fail to embed
      }
    }
  }

  const doc = new Document({
    sections: [{ properties: {}, children }],
    styles: {
      default: {
        document: {
          run: { font: 'Times New Roman', size: 24 },
        },
      },
    },
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, 'project-report.docx');
}

/**
 * Exports the report to a PDF file using jsPDF.
 */
export async function exportToPDF(content: string, images: string[]): Promise<void> {
  const { jsPDF } = await import('jspdf');
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

  const pageWidth = doc.internal.pageSize.width;
  const pageHeight = doc.internal.pageSize.height;
  const margin = 20;
  const contentWidth = pageWidth - margin * 2;
  let y = margin;

  const checkPageBreak = (needed: number) => {
    if (y + needed > pageHeight - margin) {
      doc.addPage();
      y = margin;
    }
  };

  // Title page
  doc.setFont('times', 'bold');
  doc.setFontSize(24);
  doc.text('Project Report', pageWidth / 2, y + 20, { align: 'center' });
  y += 40;

  const sections = parseMarkdownToSections(content);

  for (const section of sections) {
    if (section.type === 'h1') {
      checkPageBreak(16);
      doc.setFontSize(18);
      doc.setFont('times', 'bold');
      const lines = doc.splitTextToSize(section.content, contentWidth);
      doc.text(lines, margin, y);
      y += lines.length * 8 + 4;
    } else if (section.type === 'h2') {
      checkPageBreak(14);
      doc.setFontSize(15);
      doc.setFont('times', 'bold');
      const lines = doc.splitTextToSize(section.content, contentWidth);
      doc.text(lines, margin, y);
      y += lines.length * 7 + 3;
    } else if (section.type === 'h3') {
      checkPageBreak(12);
      doc.setFontSize(13);
      doc.setFont('times', 'bolditalic');
      const lines = doc.splitTextToSize(section.content, contentWidth);
      doc.text(lines, margin, y);
      y += lines.length * 6 + 2;
    } else {
      doc.setFontSize(11);
      doc.setFont('times', 'normal');
      const lines = doc.splitTextToSize(section.content, contentWidth);
      for (const line of lines) {
        checkPageBreak(6);
        doc.text(line, margin, y);
        y += 6;
      }
      y += 3;
    }
  }

  // Images
  if (images.length > 0) {
    doc.addPage();
    y = margin;
    doc.setFontSize(18);
    doc.setFont('times', 'bold');
    doc.text('Related Images', margin, y);
    y += 15;

    for (const imageUrl of images) {
      const base64Image = await fetchImageAsBase64(imageUrl);
      if (!base64Image) continue;
      try {
        checkPageBreak(110);
        doc.addImage(base64Image, 'JPEG', margin, y, contentWidth, 100);
        y += 110;
      } catch {
        // Skip images that fail to embed
      }
    }
  }

  doc.save('project-report.pdf');
}

/**
 * Exports the report as a plain Markdown .md file.
 */
export function exportToMarkdown(content: string): void {
  const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'project-report.md';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}