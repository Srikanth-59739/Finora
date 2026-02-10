import { aiService } from '../services/aiService.js';
import { ocrService } from '../services/ocrService.js';
import { supabase } from '../config/database.js';

export const aiController = {
  /**
   * Parse natural language expense
   */
  parse: async (req, res, next) => {
    try {
      const { text } = req.body;

      if (!text) {
        return res.status(400).json({ error: 'Text is required' });
      }

      const parsed = await aiService.parseExpense(text);

      // Find category ID
      const { data: category } = await supabase
        .from('categories')
        .select('id')
        .ilike('name', parsed.category)
        .single();

      res.json({
        ...parsed,
        category_id: category?.id || null,
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * Suggest category
   */
  suggestCategory: async (req, res, next) => {
    try {
      const { merchant, description, amount } = req.body;

      const suggestedCategory = await aiService.suggestCategory(
        merchant,
        description,
        amount
      );

      // Find category ID
      const { data: category } = await supabase
        .from('categories')
        .select('id, name, parent_category, icon, color')
        .ilike('name', suggestedCategory)
        .single();

      res.json({
        category: category || null,
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * OCR receipt processing
   */
  processReceipt: async (req, res, next) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'Image file is required' });
      }

      const result = await ocrService.processReceipt(req.file.path);

      res.json({
        message: 'Receipt processed successfully',
        ...result,
      });
    } catch (error) {
      next(error);
    }
  },
};