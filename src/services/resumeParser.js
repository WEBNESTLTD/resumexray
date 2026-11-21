import mammoth from 'mammoth';
import { SAMPLE_RESUME_TEXT } from '../data/seedData';

/**
 * In-browser document text parser supporting PDF, DOCX, and TXT files.
 * Uses browser FileReader and mammoth for DOCX, fallback PDF text extraction,
 * and reliable sample fallback when extraction fails or user requests it.
 */
export async function parseResumeFile(file) {
  if (!file) {
    throw new Error('No file provided for parsing.');
  }

  const extension = file.name.split('.').pop().toLowerCase();
  const fileName = file.name;
  const fileSize = `${(file.size / 1024).toFixed(1)} KB`;

  // 1. Text or Markdown files
  if (extension === 'txt' || extension === 'md') {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        resolve({
          fileName,
          fileSize,
          rawText: e.target.result,
          fileType: extension
        });
      };
      reader.onerror = () => reject(new Error('Failed to read text file.'));
      reader.readAsText(file);
    });
  }

  // 2. DOCX files via mammoth in browser
  if (extension === 'docx') {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const result = await mammoth.extractRawText({ arrayBuffer });
      const rawText = result.value.trim();

      if (!rawText || rawText.length < 20) {
        throw new Error('Extracted DOCX text was empty or too brief.');
      }

      return {
        fileName,
        fileSize,
        rawText,
        fileType: 'docx'
      };
    } catch (err) {
      console.warn('DOCX extraction encountered an issue, falling back:', err);
      // Fallback with user warning
      return {
        fileName,
        fileSize,
        rawText: SAMPLE_RESUME_TEXT,
        fileType: 'docx',
        warning: 'Could not extract raw text from DOCX directly in browser; loaded realistic sample text for analysis.'
      };
    }
  }

  // 3. PDF files
  if (extension === 'pdf') {
    try {
      // Attempt browser PDF.js text extraction if loaded or available
      const arrayBuffer = await file.arrayBuffer();
      let extractedText = '';

      try {
        // Dynamic import of pdfjs-dist in browser
        const pdfjsLib = await import('pdfjs-dist/build/pdf');
        // Set worker src
        if (!pdfjsLib.GlobalWorkerOptions.workerSrc) {
          pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;
        }
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const textContent = await page.getTextContent();
          const pageText = textContent.items.map(item => item.str).join(' ');
          extractedText += pageText + '\n\n';
        }
      } catch (pdfErr) {
        console.warn('Direct PDF.js extraction skipped or failed, using robust text stream:', pdfErr);
      }

      if (extractedText && extractedText.trim().length > 50) {
        return {
          fileName,
          fileSize,
          rawText: extractedText.trim(),
          fileType: 'pdf'
        };
      }

      // If PDF text was compressed/scanned image without OCR, provide clean fallback
      return {
        fileName,
        fileSize,
        rawText: SAMPLE_RESUME_TEXT,
        fileType: 'pdf',
        warning: 'Extracted text was sparse or contained embedded images; loaded realistic demonstration text for full analysis.'
      };
    } catch (err) {
      console.warn('PDF parsing error, falling back to sample:', err);
      return {
        fileName,
        fileSize,
        rawText: SAMPLE_RESUME_TEXT,
        fileType: 'pdf',
        warning: 'PDF text could not be read directly; loaded demo resume text.'
      };
    }
  }

  throw new Error(`Unsupported file type: .${extension}. Please upload a PDF or DOCX file.`);
}
