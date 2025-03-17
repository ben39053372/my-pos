/**
 * Format a number as currency
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

/**
 * Format a date to a readable string
 */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

/**
 * Generate a receipt as a string
 */
export function generateReceiptText(
  items: { name: string; price: number; quantity: number }[],
  total: number,
  receiptNumber: string,
  timestamp: Date,
  customerName?: string
): string {
  const header = `
    MY POS SYSTEM
    Receipt #: ${receiptNumber}
    Date: ${formatDate(timestamp)}
    ${customerName ? `Customer: ${customerName}` : ""}
    ------------------------------
  `;

  const itemsText = items
    .map(
      (item) =>
        `${item.name.padEnd(20)} ${item.quantity} x ${formatCurrency(
          item.price
        )} = ${formatCurrency(item.price * item.quantity)}`
    )
    .join("\n");

  const footer = `
    ------------------------------
    Total: ${formatCurrency(total)}
    
    Thank you for your purchase!
  `;

  return `${header}\n${itemsText}\n${footer}`;
}

/**
 * Generate a unique ID
 */
export function generateId(): string {
  return Math.random().toString(36).substring(2, 15);
}

/**
 * Calculate the total price of items
 */
export function calculateTotal(
  items: { price: number; quantity: number }[]
): number {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
}
