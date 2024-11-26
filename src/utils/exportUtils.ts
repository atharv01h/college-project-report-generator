// Created by Atharv Hatwar
import { saveAs } from 'file-saver';
import { Document, Packer, Paragraph, TextRun, ImageRun, HeadingLevel, AlignmentType } from 'docx';
import { jsPDF } from 'jspdf';

// Created by Atharv Hatwar
const formatMarkdownToSections = (content: string) => {
  const sections = content.split('\n\n');
  return sections.map(section => {
    if (section.startsWith('# ')) {
      return { type: 'h1', content: section.replace('# ', '') };
    } else if (section.startsWith('## ')) {
      return { type: 'h2', content: section.replace('## ', '') };
    } else if (section.startsWith('### ')) {
      return { type: 'h3', content: section.replace('### ', '') };
    } else {
      return { type: 'paragraph', content: section };
    }
  });
};

// Created by Atharv Hatwar
async function fetchImageAsBase64(url: string): Promise<string> {
  const response = await fetch(url);
  const blob = await response.blob();
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.readAsDataURL(blob);
  });
}

// Created by Atharv Hatwar
export async function exportToWord(content: string, images: string[]) {
  const sections = formatMarkdownToSections(content);
  const children: any[] = [];

  // Add title
  children.push(
    new Paragraph({
      text: "Project Report",
      heading: HeadingLevel.TITLE,
      alignment: AlignmentType.CENTER,
      spacing: { after: 400 }
    })
  );

  // Add content sections
  for (const section of sections) {
    if (section.type.startsWith('h')) {
      children.push(
        new Paragraph({
          text: section.content,
          heading: section.type === 'h1' ? HeadingLevel.HEADING_1 : 
                  section.type === 'h2' ? HeadingLevel.HEADING_2 : HeadingLevel.HEADING_3,
          spacing: { before: 400, after: 200 }
        })
      );
    } else {
      children.push(
        new Paragraph({
          children: [new TextRun(section.content)],
          spacing: { before: 200, after: 200 }
        })
      );
    }
  }

  // Add images
  if (images.length > 0) {
    children.push(
      new Paragraph({
        text: "Related Images",
        heading: HeadingLevel.HEADING_1,
        spacing: { before: 400, after: 200 }
      })
    );

    for (const [index, imageUrl] of images.entries()) {
      try {
        const base64Image = await fetchImageAsBase64(imageUrl);
        children.push(
          new Paragraph({
            children: [
              new ImageRun({
                data: base64Image.split(',')[1],
                transformation: {
                  width: 500,
                  height: 300
                }
              })
            ],
            spacing: { before: 200, after: 200 }
          })
        );
      } catch (error) {
        console.error('Error adding image to Word document:', error);
      }
    }
  }

  const doc = new Document({
    sections: [{
      properties: {},
      children: children
    }]
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, 'project-report.docx');
}

// Created by Atharv Hatwar
export async function exportToPDF(content: string, images: string[]) {
  const doc = new jsPDF();
  doc.setFont('times', 'normal');
  
  // Add title
  doc.setFontSize(24);
  doc.text('Project Report', doc.internal.pageSize.width / 2, 20, { align: 'center' });
  
  let yPosition = 40;
  const sections = formatMarkdownToSections(content);

  for (const section of sections) {
    if (yPosition > 280) {
      doc.addPage();
      yPosition = 20;
    }

    if (section.type.startsWith('h')) {
      doc.setFontSize(section.type === 'h1' ? 18 : section.type === 'h2' ? 16 : 14);
      doc.setFont('times', 'bold');
      doc.text(section.content, 15, yPosition);
      yPosition += 10;
    } else {
      doc.setFontSize(12);
      doc.setFont('times', 'normal');
      const splitText = doc.splitTextToSize(section.content, 180);
      splitText.forEach((text: string) => {
        if (yPosition > 280) {
          doc.addPage();
          yPosition = 20;
        }
        doc.text(text, 15, yPosition);
        yPosition += 7;
      });
    }
    yPosition += 5;
  }

  // Add images
  if (images.length > 0) {
    doc.addPage();
    yPosition = 20;
    doc.setFontSize(18);
    doc.setFont('times', 'bold');
    doc.text('Related Images', 15, yPosition);
    yPosition += 20;

    for (const [index, imageUrl] of images.entries()) {
      try {
        if (yPosition > 200) {
          doc.addPage();
          yPosition = 20;
        }
        const base64Image = await fetchImageAsBase64(imageUrl);
        doc.addImage(base64Image, 'JPEG', 15, yPosition, 180, 100);
        yPosition += 110;
      } catch (error) {
        console.error('Error adding image to PDF:', error);
      }
    }
  }

  doc.save('project-report.pdf');
}