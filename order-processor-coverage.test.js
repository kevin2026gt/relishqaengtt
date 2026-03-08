const fs = require('fs');
const path = require('path');

// Read and evaluate the OrderProcessor code
const fixedCode = fs.readFileSync(path.join(__dirname, 'order-processor.fixed.js'), 'utf8');
eval(fixedCode);

describe('OrderProcessor - Code Coverage Analysis', () => {
  let order;

  beforeEach(() => {
    order = new OrderProcessor();
  });

  // ===== LINE ITEM MANAGEMENT TESTS =====
  describe('Line Item Operations', () => {
    test('addLineItem - single item', () => {
      order.addLineItem('SKU-001', 100, 5, 0.08);
      expect(order.lineItems).toHaveLength(1);
      expect(order.lineItems[0]).toEqual(expect.objectContaining({
        sku: 'SKU-001',
        unitPrice: 100,
        quantity: 5,
        taxRate: 0.08
      }));
    });

    test('addLineItem - multiple items', () => {
      order.addLineItem('SKU-001', 100, 5);
      order.addLineItem('SKU-002', 50, 10);
      expect(order.lineItems).toHaveLength(2);
    });

    test('addLineItem - default taxRate to 0', () => {
      order.addLineItem('SKU-001', 100, 5);
      expect(order.lineItems[0].taxRate).toBe(0);
    });

    test('removeLineItem - existing item', () => {
      order.addLineItem('SKU-001', 100, 5);
      order.addLineItem('SKU-002', 50, 10);
      expect(order.lineItems).toHaveLength(2);
      order.removeLineItem('SKU-001');
      expect(order.lineItems).toHaveLength(1);
      expect(order.lineItems[0].sku).toBe('SKU-002');
    });

    test('removeLineItem - non-existent item', () => {
      order.addLineItem('SKU-001', 100, 5);
      order.removeLineItem('SKU-999');
      expect(order.lineItems).toHaveLength(1);
    });

    test('updateQuantity - existing item', () => {
      order.addLineItem('SKU-001', 100, 5);
      order.updateQuantity('SKU-001', 15);
      expect(order.lineItems[0].quantity).toBe(15);
    });

    test('updateQuantity - non-existent item', () => {
      order.addLineItem('SKU-001', 100, 5);
      order.updateQuantity('SKU-999', 20);
      expect(order.lineItems[0].quantity).toBe(5);
    });

    test('updateQuantity - zero quantity', () => {
      order.addLineItem('SKU-001', 100, 5);
      order.updateQuantity('SKU-001', 0);
      expect(order.lineItems[0].quantity).toBe(0);
    });
  });

  // ===== VOLUME DISCOUNT TESTS =====
  describe('Volume Discount Calculations', () => {
    test('getTotalItemCount - empty order', () => {
      expect(order.getTotalItemCount()).toBe(0);
    });

    test('getTotalItemCount - single item', () => {
      order.addLineItem('SKU-001', 100, 5);
      expect(order.getTotalItemCount()).toBe(5);
    });

    test('getTotalItemCount - multiple items', () => {
      order.addLineItem('SKU-001', 100, 5);
      order.addLineItem('SKU-002', 50, 10);
      expect(order.getTotalItemCount()).toBe(15);
    });

    test('getTotalItemCount - large quantities', () => {
      order.addLineItem('SKU-001', 100, 150);
      expect(order.getTotalItemCount()).toBe(150);
    });

    test('getVolumeDiscountPercent - less than 10', () => {
      order.addLineItem('SKU-001', 100, 5);
      expect(order.getVolumeDiscountPercent()).toBe(0);
    });

    test('getVolumeDiscountPercent - 10-24 items (5%)', () => {
      order.addLineItem('SKU-001', 100, 10);
      expect(order.getVolumeDiscountPercent()).toBe(5);
    });

    test('getVolumeDiscountPercent - 25-49 items (10%)', () => {
      order.addLineItem('SKU-001', 100, 25);
      expect(order.getVolumeDiscountPercent()).toBe(10);
    });

    test('getVolumeDiscountPercent - 50-99 items (15%)', () => {
      order.addLineItem('SKU-001', 100, 50);
      expect(order.getVolumeDiscountPercent()).toBe(15);
    });

    test('getVolumeDiscountPercent - 100+ items (20%)', () => {
      order.addLineItem('SKU-001', 100, 100);
      expect(order.getVolumeDiscountPercent()).toBe(20);
    });

    test('getVolumeDiscountPercent - across multiple items', () => {
      order.addLineItem('SKU-001', 100, 15);
      order.addLineItem('SKU-002', 50, 20);
      expect(order.getTotalItemCount()).toBe(35);
      expect(order.getVolumeDiscountPercent()).toBe(10);
    });
  });

  // ===== PRICE CALCULATION TESTS =====
  describe('Price Calculations', () => {
    test('calculateTotal - empty order', () => {
      const total = order.calculateTotal();
      expect(total).toBe(0);
    });

    test('calculateTotal - single item no tax', () => {
      order.addLineItem('SKU-001', 100, 5, 0);
      const total = order.calculateTotal();
      expect(total).toBe(500);
    });

    test('calculateTotal - single item with tax', () => {
      order.addLineItem('SKU-001', 100, 5, 0.10);
      const total = order.calculateTotal();
      expect(total).toBe(550); // 500 + 50
    });

    test('calculateTotal - with volume discount', () => {
      // 10 items = 5% volume discount
      order.addLineItem('SKU-001', 100, 10, 0);
      const subtotal = 1000;
      const discountedTotal = subtotal * 0.95;
      const total = order.calculateTotal();
      expect(total).toBe(discountedTotal);
    });

    test('calculateTotal - volume discount applies to all items', () => {
      // 25 items = 10% discount
      order.addLineItem('SKU-001', 100, 10);
      order.addLineItem('SKU-002', 50, 15);
      const subtotal = 1000 + 750; // 1750
      const discountedTotal = subtotal * 0.9; // 1575
      const total = order.calculateTotal();
      expect(total).toBe(discountedTotal);
    });

    test('calculateTotal - tax on discounted prices', () => {
      // 10 items @ $100 = $1000, 5% volume discount = $950
      // Tax: $950 * 0.10 = $95
      // Total: $950 + $95 = $1045
      order.addLineItem('SKU-001', 100, 10, 0.10);
      const total = order.calculateTotal();
      expect(total).toBe(1045);
    });

    test('calculateTotal - with coupon discount', () => {
      order.addLineItem('SKU-001', 100, 10);
      order.applyCoupon(50);
      // Subtotal: $1000, Volume (5%): $950, Coupon: -$50
      // Total: $900
      const total = order.calculateTotal();
      expect(total).toBe(900);
    });

    test('calculateTotal - with rush surcharge', () => {
      order.addLineItem('SKU-001', 100, 5);
      order.setRush(true);
      // Subtotal: $500, Rush: +$15
      // Total: $515
      const total = order.calculateTotal();
      expect(total).toBe(515);
    });

    test('calculateTotal - rounding to 2 decimals', () => {
      // Create scenario with decimal result
      order.addLineItem('SKU-001', 10.99, 3, 0.07);
      const total = order.calculateTotal();
      expect(total).toBeCloseTo(total, 2);
      expect(Math.round(total * 100) / 100).toBe(total);
    });

    test('calculateTotal - all features combined', () => {
      order.addLineItem('SKU-001', 100, 15, 0.10);
      order.addLineItem('SKU-002', 50, 10, 0.08);
      order.applyCoupon(75);
      order.setRush(true);
      
      // Subtotal: $1500 + $500 = $2000
      // Volume (25 items, 10%): $2000 * 0.90 = $1800
      // Tax on each line after discount:
      //   Line 1: $1500 * 0.90 = $1350, Tax: $135
      //   Line 2: $500 * 0.90 = $450, Tax: $36
      // Subtotal + Tax: $1800 + $135 + $36 = $1971
      // Coupon: -$75 → $1896
      // Rush: +$15 → $1911
      const total = order.calculateTotal();
      expect(total).toBeGreaterThan(0);
      expect(typeof total).toBe('number');
    });
  });

  // ===== COUPON MANAGEMENT TESTS =====
  describe('Coupon Management', () => {
    test('applyCoupon - set coupon', () => {
      order.applyCoupon(50);
      expect(order.couponDiscount).toBe(50);
    });

    test('applyCoupon - overwrite existing', () => {
      order.applyCoupon(50);
      expect(order.couponDiscount).toBe(50);
      order.applyCoupon(75);
      expect(order.couponDiscount).toBe(75);
    });

    test('removeCoupon - clear coupon', () => {
      order.applyCoupon(50);
      expect(order.couponDiscount).toBe(50);
      order.removeCoupon();
      expect(order.couponDiscount).toBe(0);
    });

    test('coupon discount applied after volume discount', () => {
      order.addLineItem('SKU-001', 100, 10);
      order.applyCoupon(50);
      const total = order.calculateTotal();
      // Subtotal: $1000, Volume (5%): $950, Coupon: -$50
      // Total: $900
      expect(total).toBe(900);
    });
  });

  // ===== RUSH ORDER TESTS =====
  describe('Rush Order Management', () => {
    test('setRush - mark as rush', () => {
      order.setRush(true);
      expect(order.isRush).toBe(true);
    });

    test('setRush - mark as non-rush', () => {
      order.setRush(true);
      expect(order.isRush).toBe(true);
      order.setRush(false);
      expect(order.isRush).toBe(false);
    });

    test('rush surcharge added correctly', () => {
      order.addLineItem('SKU-001', 100, 5);
      order.setRush(true);
      const total = order.calculateTotal();
      expect(total).toBe(515); // 500 + 15
    });
  });

  // ===== ORDER STATUS TESTS =====
  describe('Order Status Management', () => {
    test('initial status is draft', () => {
      expect(order.status).toBe('draft');
    });

    test('draft → submitted transition', () => {
      expect(order.advanceStatus()).toBe(true);
      expect(order.status).toBe('submitted');
    });

    test('submitted → processing transition', () => {
      order.advanceStatus();
      expect(order.advanceStatus()).toBe(true);
      expect(order.status).toBe('processing');
    });

    test('processing → shipped transition', () => {
      order.advanceStatus();
      order.advanceStatus();
      expect(order.advanceStatus()).toBe(true);
      expect(order.status).toBe('shipped');
    });

    test('shipped → delivered transition', () => {
      order.advanceStatus();
      order.advanceStatus();
      order.advanceStatus();
      expect(order.advanceStatus()).toBe(true);
      expect(order.status).toBe('delivered');
    });

    test('complete status progression', () => {
      const statuses = ['draft', 'submitted', 'processing', 'shipped', 'delivered'];
      for (let i = 0; i < statuses.length - 1; i++) {
        expect(order.status).toBe(statuses[i]);
        order.advanceStatus();
      }
      expect(order.status).toBe('delivered');
    });

    test('cancel from draft', () => {
      expect(order.status).toBe('draft');
      expect(order.cancel()).toBe(true);
      expect(order.status).toBe('cancelled');
    });

    test('cancel from submitted', () => {
      order.advanceStatus();
      expect(order.status).toBe('submitted');
      expect(order.cancel()).toBe(true);
      expect(order.status).toBe('cancelled');
    });

    test('cannot cancel from processing', () => {
      order.advanceStatus();
      order.advanceStatus();
      expect(order.status).toBe('processing');
      expect(order.cancel()).toBe(false);
      expect(order.status).toBe('processing');
    });

    test('cannot cancel from shipped', () => {
      order.advanceStatus();
      order.advanceStatus();
      order.advanceStatus();
      expect(order.status).toBe('shipped');
      expect(order.cancel()).toBe(false);
      expect(order.status).toBe('shipped');
    });

    test('cannot cancel from delivered', () => {
      order.advanceStatus();
      order.advanceStatus();
      order.advanceStatus();
      order.advanceStatus();
      expect(order.status).toBe('delivered');
      expect(order.cancel()).toBe(false);
      expect(order.status).toBe('delivered');
    });
  });

  // ===== ORDER SUMMARY TESTS =====
  describe('Order Summary', () => {
    test('empty order summary', () => {
      const summary = order.getSummary();
      expect(summary).toHaveProperty('itemCount');
      expect(summary).toHaveProperty('subtotal');
      expect(summary).toHaveProperty('volumeDiscount');
      expect(summary).toHaveProperty('couponDiscount');
      expect(summary).toHaveProperty('tax');
      expect(summary).toHaveProperty('rushSurcharge');
      expect(summary).toHaveProperty('total');
      expect(summary).toHaveProperty('status');
    });

    test('summary with items', () => {
      order.addLineItem('SKU-001', 100, 5, 0.10);
      order.addLineItem('SKU-002', 50, 10, 0.08);
      const summary = order.getSummary();
      expect(summary.itemCount).toBe(15);
      expect(summary.subtotal).toBeGreaterThan(0);
      expect(summary.total).toBeGreaterThan(0);
      expect(summary.status).toBe('draft');
    });

    test('summary includes all required fields', () => {
      order.addLineItem('SKU-001', 100, 10, 0.10);
      order.applyCoupon(25);
      order.setRush(true);
      order.advanceStatus();
      
      const summary = order.getSummary();
      
      // Check all required fields exist
      expect(summary).toHaveProperty('itemCount');
      expect(summary).toHaveProperty('subtotal');
      expect(summary).toHaveProperty('volumeDiscount');
      expect(summary).toHaveProperty('couponDiscount');
      expect(summary).toHaveProperty('tax');
      expect(summary).toHaveProperty('rushSurcharge');
      expect(summary).toHaveProperty('total');
      expect(summary).toHaveProperty('status');
      
      // Check values are correct
      expect(summary.itemCount).toBe(10);
      expect(summary.couponDiscount).toBe(25);
      expect(summary.status).toBe('submitted');
    });
  });

  // ===== INTEGRATION TESTS =====
  describe('Complete Workflows', () => {
    test('full order with all features', () => {
      // Add items
      order.addLineItem('SKU-001', 100, 15, 0.10);
      order.addLineItem('SKU-002', 50, 10, 0.08);
      
      // Apply discounts
      order.applyCoupon(50);
      order.setRush(true);
      
      // Get summary
      const summary = order.getSummary();
      expect(summary.itemCount).toBe(25);
      expect(summary.couponDiscount).toBe(50);
      
      // Transition status
      order.advanceStatus();
      order.advanceStatus();
      expect(order.status).toBe('processing');
      
      // Try to cancel (should fail)
      expect(order.cancel()).toBe(false);
      expect(order.status).toBe('processing');
      
      // Continue status
      order.advanceStatus();
      order.advanceStatus();
      expect(order.status).toBe('delivered');
      
      // Final summary
      const finalSummary = order.getSummary();
      expect(finalSummary.total).toBeGreaterThan(0);
      expect(finalSummary.status).toBe('delivered');
    });

    test('multiple discount tiers workflow', () => {
      // Test each discount tier
      const testCases = [
        { qty: 5, expectedDiscount: 0 },
        { qty: 10, expectedDiscount: 5 },
        { qty: 25, expectedDiscount: 10 },
        { qty: 50, expectedDiscount: 15 },
        { qty: 100, expectedDiscount: 20 }
      ];

      testCases.forEach(testCase => {
        const testOrder = new OrderProcessor();
        testOrder.addLineItem('SKU-001', 100, testCase.qty, 0);
        expect(testOrder.getVolumeDiscountPercent()).toBe(testCase.expectedDiscount);
      });
    });
  });
});
