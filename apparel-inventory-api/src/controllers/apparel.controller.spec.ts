import { Request, Response } from 'express';
import ApparelController from './apparel.controller';
import ApparelService from '../services/apparel.service';

jest.mock('../services/apparel.service');

describe('ApparelController', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockJson: jest.Mock;
  let mockStatus: jest.Mock;

  beforeEach(() => {
    mockJson = jest.fn();
    mockStatus = jest.fn().mockReturnThis();
    mockResponse = {
      json: mockJson,
      status: mockStatus,
    };
  });

  describe('updateStock', () => {
    it('should update single item stock', async () => {
      const mockUpdated = {
        code: 'TEST001',
        size: 'M',
        quality: 10,
        price: 29.99
      };

      mockRequest = {
        params: { code: 'TEST001', size: 'M' },
        body: { quality: 10, price: 29.99 }
      };

      jest.spyOn(ApparelService, 'updateApparelStock').mockResolvedValue(mockUpdated);

      await ApparelController.updateStock(mockRequest as Request, mockResponse as Response);

      expect(mockJson).toHaveBeenCalledWith(mockUpdated);
    });

    it('should handle errors when updating stock', async () => {
      mockRequest = {
        params: { code: 'TEST001', size: 'M' },
        body: { quality: 10, price: 29.99 }
      };

      jest.spyOn(ApparelService, 'updateApparelStock').mockRejectedValue(new Error('Update failed'));

      await ApparelController.updateStock(mockRequest as Request, mockResponse as Response);

      expect(mockStatus).toHaveBeenCalledWith(500);
      expect(mockJson).toHaveBeenCalledWith({ error: 'Failed to update stock' });
    });
  });

  describe('checkFulfillment', () => {
    it('should check order fulfillment', async () => {
      const mockResult = {
        canFulfill: true,
        missingItems: []
      };

      mockRequest = {
        body: {
          items: [
            { code: 'TEST001', size: 'M', quantity: 2 }
          ]
        }
      };

      jest.spyOn(ApparelService, 'checkOrderFulfillment').mockResolvedValue(mockResult);

      await ApparelController.checkFulfillment(mockRequest as Request, mockResponse as Response);

      expect(mockJson).toHaveBeenCalledWith(mockResult);
    });
  });
});