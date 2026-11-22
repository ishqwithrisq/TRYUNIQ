import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { products } from "@/lib/products";
import { useCart } from "@/lib/cart";
export function CartDrawer() {
  const { cart, setQty, drawerOpen, setDrawerOpen } = useCart();
  const items = products.filter((p) => cart[p.slug]);
  const total = items.reduce((s, p) => s + p.price * (cart[p.slug] ?? 0), 0);
  return (
    <AnimatePresence>
      {drawerOpen && (
        <motion.div className="fixed inset-0 z-50 bg-charcoal/30 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setDrawerOpen(false)}>
          <motion.aside data-testid="cart-drawer" onClick={(e) => e.stopPropagation()} initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 28, stiffness: 260 }}
            className="absolute bottom-2 right-2 top-2 flex w-[calc(100%-1rem)] max-w-sm flex-col rounded-3xl bg-ivory p-5 shadow-panel sm:rounded-2xl">
            <div className="flex items-center justify-between border-b border-champagne/60 pb-4"><h2 className="font-display text-2xl">Your Cart <span className="text-base text-cocoa">({items.reduce((n, p) => n + (cart[p.slug] ?? 0), 0)})</span></h2><button aria-label="Close cart" data-testid="cart-drawer-close" onClick={() => setDrawerOpen(false)} className="rounded-full p-2 hover:bg-cream"><X className="h-5 w-5" /></button></div>
            <div className="mt-4 flex-1 space-y-3 overflow-y-auto">
              {items.length === 0 && (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <ShoppingBag className="h-10 w-10 text-cocoa" strokeWidth={1.3} />
                  <p className="mt-3 text-sm text-cocoa">Your cart is waiting for a fragrance.</p>
                  <Link to="/shop" onClick={() => setDrawerOpen(false)} className="btn-pill mt-5 px-7">EXPLORE FRAGRANCES</Link>
                </div>
              )}
              {items.map((p) => (
                <div key={p.slug} className="flex gap-3 rounded-2xl border border-charcoal/5 bg-card p-3 shadow-card">
                  <img src={p.image} alt={p.name} className="h-20 w-18 shrink-0 rounded-xl object-cover" />
                  <div className="flex flex-1 flex-col justify-between">
                    <div className="flex items-start justify-between"><div><p className="font-display text-lg">{p.name}</p><p className="text-xs text-cocoa">8 ml</p></div>
                      <button aria-label={`Remove ${p.name}`} onClick={() => setQty(p.slug, 0)} className="p-1 text-cocoa hover:text-burgundy"><Trash2 className="h-4 w-4" /></button></div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center rounded-full border border-charcoal/15">
                        <button aria-label="Decrease" className="p-2" onClick={() => setQty(p.slug, (cart[p.slug] ?? 0) - 1)}><Minus className="h-3 w-3" /></button>
                        <span className="w-6 text-center text-sm">{cart[p.slug]}</span>
                        <button aria-label="Increase" className="p-2" onClick={() => setQty(p.slug, (cart[p.slug] ?? 0) + 1)}><Plus className="h-3 w-3" /></button>
                      </div>
                      <span className="font-semibold">₹{p.price * (cart[p.slug] ?? 0)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {items.length > 0 && (
            <div className="border-t border-champagne/60 pt-4">
              <div className="flex items-center justify-between"><span className="text-cocoa">Subtotal</span><span className="font-semibold">₹{total}</span></div>
              <Link to="/cart" onClick={() => setDrawerOpen(false)} className="mt-4 flex w-full items-center justify-center rounded-full border border-burgundy py-3 text-xs font-medium tracking-[0.25em] text-burgundy hover:bg-burgundy/5">VIEW CART</Link>
              <Link to="/checkout" data-testid="drawer-checkout" onClick={() => setDrawerOpen(false)} className="btn-pill mt-3 w-full">CHECKOUT <ArrowRight className="h-4 w-4" /></Link>
            </div>)}
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
