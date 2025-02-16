import FileUtils from '../utils/file.utils';
import { ApparelItem, ApparelUpdate, CustomerOrder } from '../models/apparel.model';

class ApparelService {
  // Update single apparel item
  static async updateApparelStock(
    code: string,
    size: string,
    update: ApparelUpdate
  ): Promise<ApparelItem> {
    const inventory = await FileUtils.readInventory();
    const key = `${code}-${size}`;

    if (!inventory[key]) {
      inventory[key] = {
        code,
        size,
        quality: 0,
        price: 0,
      };
    }

    inventory[key] = {
      ...inventory[key],
      ...update,
    };

    await FileUtils.writeInventory(inventory);
    return inventory[key];
  }

  // Bulk update apparel items
  static async bulkUpdateApparelStock(
    updates: { code: string; size: string; quality?: number; price?: number }[]
  ): Promise<Record<string, ApparelItem>> {
    const inventory = await FileUtils.readInventory();

    for (const update of updates) {
      const key = `${update.code}-${update.size}`;
      if (!inventory[key]) {
        inventory[key] = {
          code: update.code,
          size: update.size,
          quality: 0,
          price: 0,
        };
      }
      
      if (update.quality !== undefined) inventory[key].quality = update.quality;
      if (update.price !== undefined) inventory[key].price = update.price;
    }

    await FileUtils.writeInventory(inventory);
    return inventory;
  }

  // Check order fulfillment
  static async checkOrderFulfillment(order: CustomerOrder): Promise<{
    canFulfill: boolean;
    missingItems: string[];
  }> {
    const inventory = await FileUtils.readInventory();
    const missingItems: string[] = [];

    for (const item of order.items) {
      const key = `${item.code}-${item.size}`;
      if (!inventory[key] || inventory[key].quality < item.quantity) {
        missingItems.push(`${item.code} (${item.size})`);
      }
    }

    return {
      canFulfill: missingItems.length === 0,
      missingItems,
    };
  }

  // Calculate lowest cost
  static async calculateOrderCost(order: CustomerOrder): Promise<{
    totalCost: number;
    breakdown: Record<string, number>;
  }> {
    const inventory = await FileUtils.readInventory();
    let totalCost = 0;
    const breakdown: Record<string, number> = {};

    for (const item of order.items) {
      const key = `${item.code}-${item.size}`;
      if (!inventory[key]) {
        throw new Error(`Item not available: ${item.code} (${item.size})`);
      }

      const itemCost = inventory[key].price * item.quantity;
      totalCost += itemCost;
      breakdown[key] = itemCost;
    }

    return { totalCost, breakdown };
  }
}

export default ApparelService;