import { describe, expect, it } from "vitest";
import { buildOrderMessage, orderTotal } from "./order";
const c = { name: "A", mobile: "9876543210", email: "", address: "1 St", city: "Pune", state: "MH", pin: "411001", notes: "" };
describe("order", () => {
  it("totals qty × ₹119", () => expect(orderTotal([{ name: "ROYAL", qty: 2, price: 119 }, { name: "OCEAN", qty: 1, price: 119 }])).toBe(357));
  it("message includes total and address", () => {
    const m = buildOrderMessage([{ name: "ROYAL", qty: 2, price: 119 }], c);
    expect(m).toContain("Total: ₹238*"); expect(m).toContain("Name: A"); expect(m).toContain("Mobile: 9876543210"); expect(m).toContain("Pune, MH - 411001"); expect(m).not.toContain("Email:");
  });
});
import { whatsappLink } from "./contact";
it("WhatsApp orders go to 8433977405", () => expect(whatsappLink("x")).toContain("wa.me/918433977405"));
