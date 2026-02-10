import Tesseract from 'tesseract.js';
import { aiService } from './aiService.js';

export const ocrService = {
  /**
   * Process receipt image and extract text
   */
  processReceipt: async (imagePath) => {
    try {
      // Step 1: Run OCR with Tesseract
      const { data: { text } } = await Tesseract.recognize(imagePath, 'eng', {
        logger: (m) => console.log(m),
      });

      console.log('OCR Text:', text);

      // Step 2: Use AI to extract structured data
      const extractedData = await aiService.extractFromOCR(text);

      return {
        rawText: text,
        extractedData,
      };
    } catch (error) {
      console.error('OCR processing error:', error);
      throw new Error('Failed to process receipt image');
    }
  },
};