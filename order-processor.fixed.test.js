/**
 * Jest Unit Tests for OrderProcessor (Fixed Version)
 * Tests aligned with business rules from businessrulesreview_orderprocessor.md
 * 
 * Test Coverage:
 * - Rule 1: Line items with unit price, quantity, tax rate
 * - Rule 2: Volume discounts (10-24=5%, 25-49=10%, 50-99=15%, 100+=20%)
 * - Rule 3: Coupons applied AFTER volume discounts and BEFORE tax
 * - Rule 4: Tax calculated on discounted prices
 * - Rule 5: Rush surcharge ($15.00 flat fee)
 * - Rule 6: Currency rounding to 2 decimal places
 * - Rule 7: Order status lifecycle and cancellation rules
 */

// Load OrderProcessor from fixed file
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'order-processor.fixed.js');
const fileContent = fs.readFileSync(filePath, 'utf8');

// Extract OrderProcessor constructor code and execute it in module scope
const codeToEval = fileContent.substring(0, fileContent.indexOf('let order = new OrderProcessor();'));
// Create in the current scope so OrderProcessor is available
eval(codeToEval);
// OrderProcessor is now defined in this file's scope

describe('OrderProcessor - Fixed Version', () => {
  let order;

  beforeEach(() => {
    order = new OrderProcessor();
  });

  // ============= Business Rule 1: Line Item Management =============
  describe('Line Item Management', () => {
    describe('addLineItem', () => {
      it('should add a single line item to the order', () => {
        order.addLineItem({ sku: 'WIDGET-A', unitPrice: 12.99, quantity: 5, taxRate: 0.08 });
        expect(order.lineItems.length).toBe(1);
        expect(order.lineItems[0].sku).toBe('WIDGET-A');
        expect(order.lineItems[0].unitPrice).toBe(12.99);
        expect(order.lineItems[0].quantity).toBe(5);
        expect(order.lineItems[0].taxRate).toBe(0.08);
      });

      it('should add multiple line items to the order', () => {
        order.addLineItem({ sku: 'WIDGET-A', unitPrice: 12.99, quantity: 5, taxRate: 0.08 });
        order.addLineItem({ sku: 'WIDGET-B', unitPrice: 24.50, quantity: 3, taxRate: 0.08 });
        order.addLineItem({ sku: 'GADGET-X', unitPrice: 7.25, quantity: 4, taxRate: 0.10 });
        expect(order.lineItems.length).toBe(3);
      });

      it('should default taxRate to 0 if not provided', () => {
        order.addLineItem({ sku: 'NO-TAX', unitPrice: 10.00, quantity: 1 });
        expect(order.lineItems[0].taxRate).toBe(0);
      });
    });

    describe('removeLineItem', () => {
      beforeEach(() => {
        order.addLineItem({ sku: 'WIDGET-A', unitPrice: 12.99, quantity: 5, taxRate: 0.08 });
        order.addLineItem({ sku: 'WIDGET-B', unitPrice: 24.50, quantity: 3, taxRate: 0.08 });
      });

      it('should remove a line item by SKU', () => {
        order.removeLineItem('WIDGET-A');
        expect(order.lineItems.length).toBe(1);
        expect(order.lineItems[0].sku).toBe('WIDGET-B');
      });

      it('should do nothing if SKU does not exist', () => {
        order.removeLineItem('NONEXISTENT');
        expect(order.lineItems.length).toBe(2);
      });
    });

    describe('updateQuantity', () => {
      beforeEach(() => {
        order.addLineItem({ sku: 'WIDGET-A', unitPrice: 12.99, quantity: 5, taxRate: 0.08 });
      });

      it('should update quantity for existing item', () => {
        order.updateQuantity('WIDGET-A', 10);
        expect(order.lineItems[0].quantity).toBe(10);
      });

      it('should do nothing if SKU does not exist', () => {
        order.updateQuantity('NONEXISTENT', 10);
        expect(order.lineItems[0].quantity).toBe(5);
      });

      it('should allow updating quantity to zero', () => {
        order.updateQuantity('WIDGET-A', 0);
        expect(order.lineItems[0].quantity).toBe(0);
      });
    });
  });

  // ============= Business Rule 2: Volume Discount Tiers =============
  describe('Volume Discount Tiers', () => {
    describe('getTotalItemCount', () => {
      it('should return 0 for empty order', () => {
        expect(order.getTotalItemCount()).toBe(0);
      });

      it('should return total quantity across all line items', () => {
        order.addLineItem({ sku: 'WIDGET-A', unitPrice: 12.99, quantity: 5, taxRate: 0.08 });
        order.addLineItem({ sku: 'WIDGET-B', unitPrice: 24.50, quantity: 3, taxRate: 0.08 });
        order.addLineItem({ sku: 'GADGET-X', unitPrice: 7.25, quantity: 4, taxRate: 0.10 });
        expect(order.getTotalItemCount()).toBe(12);
      });

      it('should handle large quantities', () => {
        order.addLineItem({ sku: 'BULK-ITEM', unitPrice: 1.00, quantity: 500, taxRate: 0.05 });
        expect(order.getTotalItemCount()).toBe(500);
      });
    });

    describe('getVolumeDiscountPercent', () => {
      it('should return 0% for less than 10 items', () => {
        order.addLineItem({ sku: 'ITEM', unitPrice: 10.00, quantity: 9, taxRate: 0 });
        expect(order.getVolumeDiscountPercent()).toBe(0);
      });

      it('should return 5% for 10-24 items', () => {
        order.addLineItem({ sku: 'ITEM', unitPrice: 10.00, quantity: 10, taxRate: 0 });
        expect(order.getVolumeDiscountPercent()).toBe(5);
      });

      it('should return 10% for 25-49 items', () => {
        order.addLineItem({ sku: 'ITEM', unitPrice: 10.00, quantity: 25, taxRate: 0 });
        expect(order.getVolumeDiscountPercent()).toBe(10);
      });

      it('should return 15% for 50-99 items', () => {
        order.addLineItem({ sku: 'ITEM', unitPrice: 10.00, quantity: 50, taxRate: 0 });
        expect(order.getVolumeDiscountPercent()).toBe(15);
      });

      it('should return 20% for 100+ items', () => {
        order.addLineItem({ sku: 'ITEM', unitPrice: 10.00, quantity: 100, taxRate: 0 });
        expect(order.getVolumeDiscountPercent()).toBe(20);
      });

      it('should calculate volume discount across multiple line items', () => {
        order.addLineItem({ sku: 'WIDGET-A', unitPrice: 10.00, quantity: 10, taxRate: 0 });
        order.addLineItem({ sku: 'WIDGET-B', unitPrice: 10.00, quantity: 15, taxRate: 0 });
        expect(order.getTotalItemCount()).toBe(25);
        expect(order.getVolumeDiscountPercent()).toBe(10);
      });
    });
  });

  // ============= Pricing & Calculation (Rules 3-6) =============
  describe('Price Calculations', () => {
    describe('calculateTotal', () => {
      it('should calculate subtotal correctly', () => {
        order.addLineItem({ sku: 'WIDGET', unitPrice: 10.00, quantity: 5, taxRate: 0 });
        const totals = order.calculateTotal();
        expect(totals.subtotal).toBe(50.00);
      });

      it('should calculate tax correctly for single item', () => {
        order.addLineItem({ sku: 'WIDGET', unitPrice: 100.00, quantity: 1, taxRate: 0.08 });
        const totals = order.calculateTotal();
        expect(totals.tax).toBe(8.00);
      });

      it('should calculate volume discounts correctly', () => {
        order.addLineItem({ sku: 'WIDGET', unitPrice: 100.00, quantity: 10, taxRate: 0 });
        const totals = order.calculateTotal();
        expect(totals.subtotal).toBe(1000.00);
        expect(totals.volumeDiscount).toBe(50.00);
      });

      it('should calculate tax on discounted prices (Rule 4)', () => {
        order.addLineItem({ sku: 'WIDGET', unitPrice: 100.00, quantity: 10, taxRate: 0.10 });
        const totals = order.calculateTotal();
        expect(totals.volumeDiscount).toBe(50.00);
        expect(totals.tax).toBe(95.00);
      });

      it('should apply coupon discount after volume discount (Rule 3)', () => {
        order.addLineItem({ sku: 'WIDGET', unitPrice: 100.00, quantity: 10, taxRate: 0 });
        order.applyCoupon({ code: 'SAVE', discountAmount: 20.00 });
        const totals = order.calculateTotal();
        expect(totals.volumeDiscount).toBe(50.00);
        expect(totals.couponDiscount).toBe(20.00);
        expect(totals.total).toBe(930.00);
      });

      it('should add rush surcharge to final total (Rule 5)', () => {
        order.addLineItem({ sku: 'WIDGET', unitPrice: 100.00, quantity: 5, taxRate: 0 });
        order.setRush(true);
        const totals = order.calculateTotal();
        expect(totals.rushSurcharge).toBe(15.00);
        expect(totals.total).toBe(515.00);
      });

      it('should round final total to 2 decimal places (Rule 6)', () => {
        order.addLineItem({ sku: 'WIDGET', unitPrice: 12.33, quantity: 3, taxRate: 0.08 });
        const totals = order.calculateTotal();
        expect(totals.total).toBe(parseFloat(totals.total.toFixed(2)));
      });

      it('should apply all discounts and surcharges together', () => {
        order.addLineItem({ sku: 'WIDGET', unitPrice: 100.00, quantity: 25, taxRate: 0.10 });
        order.applyCoupon({ code: 'SAVE50', discountAmount: 50.00 });
        order.setRush(true);
        const totals = order.calculateTotal();
        expect(totals.subtotal).toBe(2500.00);
        expect(totals.volumeDiscount).toBe(250.00);
        expect(totals.couponDiscount).toBe(50.00);
        expect(totals.tax).toBe(220.00);
        expect(totals.rushSurcharge).toBe(15.00);
        expect(totals.total).toBe(2435.00);
      });

      it('should return 0 for empty order', () => {
        const totals = order.calculateTotal();
        expect(totals.subtotal).toBe(0);
        expect(totals.total).toBe(0);
      });
    });

    describe('Coupon Management', () => {
      it('should apply a coupon to the order', () => {
        const coupon = { code: 'SAVE10', discountAmount: 10.00 };
        order.applyCoupon(coupon);
        expect(order.coupon).toEqual(coupon);
      });

      it('should overwrite existing coupon', () => {
        order.applyCoupon({ code: 'SAVE10', discountAmount: 10.00 });
        order.applyCoupon({ code: 'SAVE20', discountAmount: 20.00 });
        expect(order.coupon.code).toBe('SAVE20');
      });

      it('should remove the applied coupon', () => {
        order.applyCoupon({ code: 'SAVE10', discountAmount: 10.00 });
        order.removeCoupon();
        expect(order.coupon).toBeNull();
      });
    });

    describe('Rush Order Management', () => {
      it('should mark order as rush', () => {
        order.setRush(true);
        expect(order.isRush).toBe(true);
      });

      it('should mark order as non-rush', () => {
        order.setRush(true);
        order.setRush(false);
        expect(order.isRush).toBe(false);
      });
    });
  });

  // ============= Business Rule 7: Order Status Lifecycle =============
  describe('Order Status Management', () => {
    it('should transition from draft to submitted', () => {
      expect(order.status).toBe('draft');
      const status = order.advanceStatus();
      expect(status).toBe('submitted');
      expect(order.status).toBe('submitted');
    });

    it('should transition from submitted to processing', () => {
      order.status = 'submitted';
      const status = order.advanceStatus();
      expect(status).toBe('processing');
    });

    it('should transition from processing to shipped', () => {
      order.status = 'processing';
      const status = order.advanceStatus();
      expect(status).toBe('shipped');
    });

    it('should transition from shipped to delivered', () => {
      order.status = 'shipped';
      const status = order.advanceStatus();
      expect(status).toBe('delivered');
    });

    it('should complete full status progression', () => {
      expect(order.status).toBe('draft');
      order.advanceStatus();
      order.advanceStatus();
      order.advanceStatus();
      order.advanceStatus();
      expect(order.status).toBe('delivered');
    });

    it('should cancel order from draft status', () => {
      const result = order.cancel();
      expect(result).toBe(true);
      expect(order.status).toBe('cancelled');
    });

    it('should cancel order from submitted status', () => {
      order.status = 'submitted';
      const result = order.cancel();
      expect(result).toBe(true);
      expect(order.status).toBe('cancelled');
    });

    it('should not cancel order from processing status', () => {
      order.status = 'processing';
      const result = order.cancel();
      expect(result).toBe(false);
      expect(order.status).toBe('processing');
    });

    it('should not cancel order from shipped status', () => {
      order.status = 'shipped';
      const result = order.cancel();
      expect(result).toBe(false);
    });

    it('should not cancel order from delivered status', () => {
      order.status = 'delivered';
      const result = order.cancel();
      expect(result).toBe(false);
    });
  });

  // ============= Order Summary =============
  describe('getSummary', () => {
    it('should return summary for empty order', () => {
      const summary = order.getSummary();
      expect(summary.itemCount).toBe(0);
      expect(summary.lineItemCount).toBe(0);
      expect(summary.status).toBe('draft');
      expect(summary.isRush).toBe(false);
      expect(summary.hasCoupon).toBe(false);
    });

    it('should include all required fields in summary', () => {
      order.addLineItem({ sku: 'WIDGET', unitPrice: 100.00, quantity: 10, taxRate: 0.10 });
      order.applyCoupon({ code: 'SAVE', discountAmount: 20.00 });
      const summary = order.getSummary();
      expect(summary).toHaveProperty('itemCount');
      expect(summary).toHaveProperty('lineItemCount');
      expect(summary).toHaveProperty('status');
      expect(summary).toHaveProperty('isRush');
      expect(summary).toHaveProperty('hasCoupon');
      expect(summary).toHaveProperty('subtotal');
      expect(summary).toHaveProperty('volumeDiscount');
      expect(summary).toHaveProperty('couponDiscount');
      expect(summary).toHaveProperty('tax');
      expect(summary).toHaveProperty('rushSurcharge');
      expect(summary).toHaveProperty('total');
    });
  });

  // ============= Integration Tests =============
  describe('Integration Tests - Complete Workflows', () => {
    it('should handle complete order workflow with all features', () => {
      order.addLineItem({ sku: 'WIDGET-A', unitPrice: 12.99, quantity: 5, taxRate: 0.08 });
      order.addLineItem({ sku: 'WIDGET-B', unitPrice: 24.50, quantity: 3, taxRate: 0.08 });
      order.addLineItem({ sku: 'GADGET-X', unitPrice: 7.25, quantity: 4, taxRate: 0.10 });
      
      order.applyCoupon({ code: 'WELCOME10', discountAmount: 10.00 });
      order.setRush(true);
      
      const summary = order.getSummary();
      expect(summary.itemCount).toBe(12);
      expect(summary.hasCoupon).toBe(true);
      expect(summary.isRush).toBe(true);
      
      order.advanceStatus();
      expect(order.status).toBe('submitted');
    });

    it('should handle multiple volume discount tiers', () => {
      order.addLineItem({ sku: 'ITEM', unitPrice: 10.00, quantity: 9, taxRate: 0 });
      expect(order.getVolumeDiscountPercent()).toBe(0);
      
      order.updateQuantity('ITEM', 15);
      expect(order.getVolumeDiscountPercent()).toBe(5);
      
      order.updateQuantity('ITEM', 35);
      expect(order.getVolumeDiscountPercent()).toBe(10);
      
      order.updateQuantity('ITEM', 75);
      expect(order.getVolumeDiscountPercent()).toBe(15);
      
      order.updateQuantity('ITEM', 150);
      expect(order.getVolumeDiscountPercent()).toBe(20);
    });
  });
});
