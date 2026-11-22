export type OrderLine = { name: string; qty: number; price: number };
export type Customer = { name: string; mobile: string; email: string; address: string; city: string; state: string; pin: string; notes: string };
export const orderTotal = (lines: OrderLine[]) => lines.reduce((s, l) => s + l.qty * l.price, 0);
export function buildOrderMessage(lines: OrderLine[], c: Customer) {
  const items = lines.map((l, i) => `${i + 1}. ${l.name} (8 ml) × ${l.qty} = ₹${l.qty * l.price}`).join("\n");
  const count = lines.reduce((s, l) => s + l.qty, 0);
  return [
    "*🛍️ NEW ORDER — TRYUNIQ*", "",
    "*Order Items*", items, "",
    `Subtotal (${count} ${count === 1 ? "item" : "items"}): ₹${orderTotal(lines)}`, "Shipping: Free", `*Total: ₹${orderTotal(lines)}*`, "",
    "*Customer Details*", `Name: ${c.name}`, `Mobile: ${c.mobile}`, ...(c.email ? [`Email: ${c.email}`] : []), "",
    "*Shipping Address*", c.address, `${c.city}, ${c.state} - ${c.pin}`,
    ...(c.notes ? ["", "*Additional Instructions*", c.notes] : []), "",
    "Please confirm my order. Thank you!",
  ].join("\n");
}
