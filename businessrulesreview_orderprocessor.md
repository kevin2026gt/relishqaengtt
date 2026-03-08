OrderProcessor - Handles order creation, pricing, and fulfillment status for a B2B procurement platform.
 
  Business Rules:
 * - Orders contain line items, each with a unit price, quantity, and tax rate.
 * - Volume discounts apply based on total item count across the order:
 *     10-24 items  -> 5% discount
 *     25-49 items  -> 10% discount
 *     50-99 items  -> 15% discount
 *     100+ items   -> 20% discount
 * - Coupons provide a fixed-dollar discount applied AFTER volume discounts and BEFORE tax.
 * - Tax is calculated per line item: (discountedUnitPrice * quantity * taxRate).
 * - A "rush" order adds a flat $15.00 surcharge to the final total.
 * - Currency amounts should be rounded to 2 decimal places in the final total.
 