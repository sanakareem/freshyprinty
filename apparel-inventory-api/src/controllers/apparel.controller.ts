import { Request, Response } from 'express';
import ApparelService from '../services/apparel.service';

class ApparelController {
  // Update single apparel stock
  static async updateStock(req: Request, res: Response): Promise<void> {
    try {
      const { code, size } = req.params;
      const { quality, price } = req.body;

      const updated = await ApparelService.updateApparelStock(code, size, {
        quality,
        price,
      });

      res.json(updated);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update stock' });
    }
  }

  // Bulk update apparel stock
  static async bulkUpdate(req: Request, res: Response): Promise<void> {
    try {
      const { updates } = req.body;
      const result = await ApparelService.bulkUpdateApparelStock(updates);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: 'Failed to perform bulk update' });
    }
  }

  // Check order fulfillment
  static async checkFulfillment(req: Request, res: Response): Promise<void> {
    try {
      const result = await ApparelService.checkOrderFulfillment(req.body);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: 'Failed to check order fulfillment' });
    }
  }

  // Calculate order cost
  static async calculateCost(req: Request, res: Response): Promise<void> {
    try {
      const result = await ApparelService.calculateOrderCost(req.body);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: 'Failed to calculate order cost' });
    }
  }
}

export default ApparelController;