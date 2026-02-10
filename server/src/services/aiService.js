import Groq from 'groq-sdk';
import { config } from '../config/env.js';

const groq = new Groq({
  apiKey: config.groqApiKey,
});

export const aiService = {
  /**
   * Parse natural language expense input
   */
  parseExpense: async (text) => {
    try {
      const today = new Date().toISOString().split('T')[0];
      
      const prompt = `You are an expense parser. Extract the following from the user input:
- amount (number only, no currency symbol)
- merchant (business name if mentioned, otherwise null)
- category (one of: Groceries, Bills, Rent, Transport, Healthcare, Dining, Entertainment, Shopping, Travel, Electronics, Premium Services)
- date (in YYYY-MM-DD format, relative to today: ${today})
- description (brief summary)

User input: "${text}"

Respond ONLY with valid JSON in this exact format:
{
  "amount": number,
  "merchant": "string or null",
  "category": "string",
  "date": "YYYY-MM-DD",
  "description": "string"
}`;

      const response = await groq.chat.completions.create({
        messages: [{ role: 'user', content: prompt }],
        model: 'llama-3.1-70b-versatile',
        temperature: 0.1,
        response_format: { type: 'json_object' },
      });

      const parsed = JSON.parse(response.choices[0].message.content);
      return parsed;
    } catch (error) {
      console.error('AI parsing error:', error);
      throw new Error('Failed to parse expense with AI');
    }
  },

  /**
   * Suggest category based on merchant/description
   */
  suggestCategory: async (merchant, description, amount) => {
    try {
      const prompt = `Based on this purchase information, suggest the most appropriate category:

Merchant: ${merchant || 'Unknown'}
Description: ${description || 'No description'}
Amount: ₹${amount}

Categories:
- Groceries (food stores, supermarkets)
- Bills (utilities, phone, internet)
- Rent (housing payments)
- Transport (fuel, uber, public transport)
- Healthcare (medicine, doctor, hospital)
- Dining (restaurants, cafes)
- Entertainment (movies, games, subscriptions)
- Shopping (clothes, accessories, general retail)
- Travel (flights, hotels, tourism)
- Electronics (gadgets, computers)
- Premium Services (spa, salon, luxury)

Respond with ONLY the category name, nothing else.`;

      const response = await groq.chat.completions.create({
        messages: [{ role: 'user', content: prompt }],
        model: 'llama-3.1-70b-versatile',
        temperature: 0.2,
      });

      const category = response.choices[0].message.content.trim();
      return category;
    } catch (error) {
      console.error('Category suggestion error:', error);
      return 'Shopping'; // Default fallback
    }
  },

  /**
   * Extract structured data from OCR text
   */
  extractFromOCR: async (ocrText) => {
    try {
      const prompt = `Extract expense details from this receipt OCR text:

"${ocrText}"

Respond ONLY with valid JSON:
{
  "amount": number,
  "merchant": "string",
  "date": "YYYY-MM-DD",
  "items": ["item1", "item2"]
}

If date is not found, use today's date. If amount is not clear, return null.`;

      const response = await groq.chat.completions.create({
        messages: [{ role: 'user', content: prompt }],
        model: 'llama-3.1-70b-versatile',
        temperature: 0.1,
        response_format: { type: 'json_object' },
      });

      const extracted = JSON.parse(response.choices[0].message.content);
      return extracted;
    } catch (error) {
      console.error('OCR extraction error:', error);
      throw new Error('Failed to extract data from receipt');
    }
  },
};