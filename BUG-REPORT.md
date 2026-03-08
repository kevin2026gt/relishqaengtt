# Bug Report - order-processor.js

## Issue 1: Off-by-One Error in getTotalItemCount()

**Location:** `getTotalItemCount()` method, line 78

**Description:**
The for-loop condition uses `i <= this.lineItems.length` instead of `i < this.lineItems.length`. This causes the loop to iterate one extra time beyond the array bounds. When `i` equals the length of the array, `this.lineItems[i]` returns `undefined`, and attempting to access `.quantity` on `undefined` will throw a runtime error: "Cannot read property 'quantity' of undefined".

**Reproduction:**
```javascript
let order = new OrderProcessor();
order.addLineItem({ sku: "WIDGET-A", unitPrice: 12.99, quantity: 5, taxRate: 0.08 });
order.addLineItem({ sku: "WIDGET-B", unitPrice: 24.50, quantity: 3, taxRate: 0.08 });

// This will throw: TypeError: Cannot read property 'quantity' of undefined
let count = order.getTotalItemCount();
```

**Severity:** CRITICAL

**Why:** This bug breaks core functionality. The `getTotalItemCount()` method is essential to the entire order processor as it's used to calculate volume discounts. Any call to `calculateTotal()`, `getVolumeDiscountPercent()`, or `getTotalItemCount()` will crash the application with a runtime error, making the system completely non-functional.

**Fix:**
Change line 78 from:
```javascript
for (let i = 0; i <= this.lineItems.length; i++) {
```
to:
```javascript
for (let i = 0; i < this.lineItems.length; i++) {
```

---

## Issue 2: Tax Calculation Does Not Account for Coupon Discount

**Location:** `calculateTotal()` method, lines 111-116 and 120-127

**Description:**
According to the business rule, "Coupons provide a fixed-dollar discount applied AFTER volume discounts and BEFORE tax." The current code calculates tax on the volume-discounted amount without considering the coupon discount. The tax should be recalculated or adjusted to account for coupon deductions, as the coupon is applied BEFORE tax is finalized.

Currently:
- Tax is calculated on volume-discounted line subtotals (lines 115)
- Coupon is subtracted separately from the order total (line 125)
- This means the coupon discount doesn't reduce the tax amount owed

This violates the business rule and results in incorrect final totals where coupons provide less financial benefit than intended.

**Reproduction:**
```javascript
let order = new OrderProcessor();
order.addLineItem({ sku: "ITEM-1", unitPrice: 100.00, quantity: 1, taxRate: 0.10 });
// Subtotal: $100, tax (10%): $10
order.applyCoupon({ code: "SAVE10", discountAmount: 10.00 });

let total = order.calculateTotal();
console.log(total);
// Current output: { subtotal: 100, volumeDiscount: 0, couponDiscount: 10, tax: 10, total: 100 }
// After coupon ($90) and tax ($10), total should be $100 (or less if tax applies post-coupon)
// But if tax should apply to the $90 post-coupon amount, tax should be $9, total should be $99
```

**Severity:** MAJOR

**Why:** This business logic error causes incorrect order totals whenever a coupon is used. Since the coupon doesn't reduce the tax calculation, customers are charged more tax than they should be. This impacts pricing accuracy and profitability calculations. The fix requires recalculating tax based on the post-coupon subtotal.

**Suggested Fix:**
Recalculate or adjust tax to account for coupon discount:
```javascript
// Option: Adjust tax proportionally based on coupon reduction
let couponDiscount = 0;
if (this.coupon) {
  couponDiscount = this.coupon.discountAmount;
  afterVolumeDiscount = afterVolumeDiscount - couponDiscount;
  // Reduce tax proportionally to the coupon discount
  const discountRatio = couponDiscount / (subtotal - volumeDiscount);
  totalTax -= totalTax * discountRatio;
}
```
