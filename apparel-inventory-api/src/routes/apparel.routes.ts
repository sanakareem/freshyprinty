import { Router } from 'express';
import ApparelController from '../controllers/apparel.controller';

const router = Router();

// 1. Update single apparel stock (Vendor)
router.put('/:code/:size', ApparelController.updateStock);

// 2. Bulk update multiple apparel stock (Vendor)
router.put('/bulk', ApparelController.bulkUpdate);

// 3. Check order fulfillment (User)
router.post('/check-fulfillment', ApparelController.checkFulfillment);

// 4. Calculate lowest cost (User)
router.post('/calculate-cost', ApparelController.calculateCost);

export default router;