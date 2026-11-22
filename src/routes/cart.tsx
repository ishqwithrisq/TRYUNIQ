import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { products } from "@/lib/products";
import { useCart } from "@/lib/cart";
export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [
    { title: "Your Cart — TRYUNIQ" },
    { name: "description", content: "Review the TRYUNIQ fragrances in your cart." },
    { property: "og:title", content: "Your Cart — TRYUNIQ" },
    { property: "og:description", content: "Review the TRYUNIQ fragrances in your cart." },
  ] }),
  component: CartPage,
});
function CartPage() {
  const { cart, setQty } = useCart();
  const items = products.filter((p) => cart[p.slug]);
  const total = items.reduce((s, p) => s + p.price * (cart[p.slug] ?? 0), 0);
  return (
    <SiteLayout>
      <div className="mx-auto max-w-3xl px-6 py-20">
        <h1 className="text-center font-display text-5xl">Your Cart</h1>
        {items.length === 0 ? (
          <div className="mt-10 text-center"><p className="text-muted-foreground">Your cart is empty.</p><Link to="/shop" className="btn-pill mt-6">SHOP NOW</Link></div>
        ) : (<>
          <div className="mt-10 space-y-3">{items.map((p) => (
            <div key={p.slug} className="flex items-center gap-4 rounded-2xl border border-champagne/50 bg-card p-3 shadow-card">
              <img src={p.image} alt={p.name} className="h-20 w-16 rounded-xl object-cover" />
              <div className="flex-1"><p className="font-display text-xl tracking-[0.1em]">{p.name}</p><p className="text-sm text-muted-foreground">₹{p.price}</p></div>
              <div className="flex items-center rounded-full bg-cream"><button className="px-3 py-1" onClick={() => setQty(p.slug, (cart[p.slug] ?? 0) - 1)}>−</button><span className="px-2">{cart[p.slug]}</span><button className="px-3 py-1" onClick={() => setQty(p.slug, (cart[p.slug] ?? 0) + 1)}>+</button></div>
            </div>))}</div>
          <div className="mt-6 flex items-center justify-between"><span className="eyebrow">TOTAL</span><span className="font-display text-3xl text-burgundy">₹{total}</span></div>
          <Link to="/checkout" className="btn-pill mt-6 w-full">CHECKOUT</Link>
        </>)}
      </div>
    </SiteLayout>
  );
}
