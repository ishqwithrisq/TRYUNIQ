import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { products } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { whatsappLink } from "@/lib/contact";
import { buildOrderMessage, type Customer } from "@/lib/order";
export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [
    { title: "Checkout — TRYUNIQ" },
    { name: "description", content: "Complete your TRYUNIQ fragrance order and confirm it on WhatsApp." },
    { property: "og:title", content: "Checkout — TRYUNIQ" },
    { property: "og:description", content: "Complete your TRYUNIQ fragrance order." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" },
  ] }),
  component: Checkout,
});
const label = "text-[10px] font-semibold uppercase tracking-[0.2em] text-charcoal";
const field = "mt-2 w-full rounded-xl border border-charcoal/15 bg-card px-4 py-3 text-sm outline-none transition-[border-color,box-shadow] placeholder:text-cocoa focus:border-burgundy focus:ring-2 focus:ring-blush/40";
function Checkout() {
  const { cart } = useCart();
  const items = products.filter((p) => cart[p.slug]);
  const lines = items.map((p) => ({ name: p.name, qty: cart[p.slug] ?? 0, price: p.price }));
  const total = lines.reduce((s, l) => s + l.qty * l.price, 0);
  const count = lines.reduce((s, l) => s + l.qty, 0);
  const [f, setF] = useState<Customer>({ name: "", mobile: "", email: "", address: "", city: "", state: "", pin: "", notes: "" });
  const set = (k: keyof Customer) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setF({ ...f, [k]: e.target.value });
  const submit = (e: React.FormEvent) => { e.preventDefault(); window.open(whatsappLink(buildOrderMessage(lines, f)), "_blank"); };
  return (
    <SiteLayout>
      <section className="px-2 pt-2 sm:px-4 sm:pt-4">
        <div className="rounded-3xl bg-cream px-6 py-12 sm:px-12 sm:py-16"><h1 className="font-display text-4xl sm:text-5xl">Checkout</h1><p className="mt-2 text-sm text-cocoa">Complete your order.</p></div>
      </section>
      {items.length === 0 ? (
        <div className="py-20 text-center"><p className="text-cocoa">Your cart is empty.</p><Link to="/shop" className="btn-pill mt-6">EXPLORE FRAGRANCES</Link></div>
      ) : (
      <div className="mx-auto grid max-w-7xl gap-6 px-3 py-10 sm:px-4 lg:grid-cols-[1fr_380px]">
        <form onSubmit={submit} className="order-2 space-y-5 rounded-2xl border border-charcoal/8 bg-card p-5 shadow-card sm:p-7 lg:order-1">
          <h2 className="font-display text-2xl">Customer Details</h2>
          <label className="block"><span className={label}>Full name *</span><input required placeholder="Full name" value={f.name} onChange={set("name")} className={field} /></label>
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block"><span className={label}>Mobile number *</span><input required inputMode="numeric" pattern="[0-9]{10}" title="Enter a 10-digit mobile number" placeholder="10-digit mobile number" value={f.mobile} onChange={(e) => setF({ ...f, mobile: e.target.value.replace(/\D/g, "").slice(0, 10) })} className={field} /></label>
            <label className="block"><span className={label}>Email address</span><input type="email" placeholder="you@example.com" value={f.email} onChange={set("email")} className={field} /></label>
          </div>
          <label className="block"><span className={label}>Shipping address *</span><textarea required rows={3} placeholder="House no, street, landmark" value={f.address} onChange={set("address")} className={field} /></label>
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block"><span className={label}>City *</span><input required placeholder="City" value={f.city} onChange={set("city")} className={field} /></label>
            <label className="block"><span className={label}>State *</span><input required placeholder="State" value={f.state} onChange={set("state")} className={field} /></label>
          </div>
          <label className="block sm:w-1/2 sm:pr-2.5"><span className={label}>PIN code *</span><input required inputMode="numeric" pattern="[0-9]{6}" title="Enter a 6-digit PIN code" placeholder="6-digit PIN" value={f.pin} onChange={(e) => setF({ ...f, pin: e.target.value.replace(/\D/g, "").slice(0, 6) })} className={field} /></label>
          <label className="block"><span className={label}>Additional instructions</span><textarea rows={2} placeholder="Delivery notes (optional)" value={f.notes} onChange={set("notes")} className={field} /></label>
          <button type="submit" data-testid="place-order" className="btn-pill w-full py-4"><MessageCircle className="h-4 w-4" />PLACE ORDER ON WHATSAPP</button>
        </form>
        <aside className="order-1 h-fit rounded-2xl border border-champagne/60 bg-cream p-5 sm:p-7 lg:order-2 lg:sticky lg:top-24">
          <h2 className="font-display text-2xl">Order Summary</h2>
          <div className="mt-5 space-y-3">{items.map((p) => (
            <div key={p.slug} className="flex items-center gap-3"><img src={p.image} alt={p.name} className="h-12 w-12 rounded-lg object-cover" />
              <div className="flex-1"><p className="font-display">{p.name}</p><p className="text-xs text-cocoa">8 ml × {cart[p.slug]}</p></div><span className="text-sm">₹{p.price * (cart[p.slug] ?? 0)}</span></div>))}</div>
          <div className="mt-5 space-y-2 border-t border-charcoal/10 pt-4 text-sm"><div className="flex justify-between"><span>Subtotal ({count} {count === 1 ? "item" : "items"})</span><span>₹{total}</span></div><div className="flex justify-between"><span>Shipping</span><span>Free</span></div></div>
          <div className="mt-3 flex justify-between border-t border-charcoal/10 pt-3 font-semibold"><span>Total</span><span>₹{total}</span></div>
          <p className="mt-4 text-[11px] text-cocoa">Your order is confirmed on WhatsApp — pay on confirmation.</p>
        </aside>
      </div>)}
    </SiteLayout>
  );
}
