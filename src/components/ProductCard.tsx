import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowUpRight, Eye, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import type { Product } from "@/lib/products";
import { useCart } from "@/lib/cart";
export function ProductCard({ p, mode = "link" }: { p: Product; mode?: "link" | "cart" }) {
  const { add } = useCart();
  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.25 }} data-testid={`product-card-${p.slug}`}
      className="group flex h-full flex-col justify-between rounded-[1.75rem] border border-charcoal/8 bg-card p-2.5 shadow-card transition-[box-shadow,border-color] duration-300 hover:border-burgundy/25 hover:shadow-hover sm:p-3">
      <Link to="/product/$slug" params={{ slug: p.slug }} className="relative block aspect-[4/5] overflow-hidden rounded-2xl bg-cream">
        <img src={p.image} alt={`${p.name} — ${p.notes}`} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
        {p.bestseller && <span className="absolute left-2.5 top-2.5 rounded-full bg-ivory/90 px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.25em] text-charcoal shadow-sm backdrop-blur-md sm:left-3.5 sm:top-3.5 sm:px-4 sm:py-1.5 sm:text-[10px]">Bestseller</span>}
        <span className="absolute right-2.5 top-2.5 rounded-full glass p-2.5 text-charcoal opacity-0 shadow-md transition-opacity duration-200 group-hover:opacity-100"><Eye className="h-4 w-4" /></span>
      </Link>
      <div className="px-1.5 pb-1.5 pt-4 sm:px-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="min-w-0 font-display text-base tracking-wide text-charcoal sm:text-xl"><Link to="/product/$slug" params={{ slug: p.slug }}>{p.name}</Link></h3>
          <p className="shrink-0 text-sm font-semibold text-charcoal sm:text-lg">₹{p.price}</p>
        </div>
        <p className="mt-1 text-[11px] tracking-wide text-cocoa sm:text-sm">{p.notes}</p>
        {mode === "cart" ? (
          <button data-testid={`add-to-cart-${p.slug}`} onClick={() => { add(p.slug); toast.success(`${p.name} added to cart`); }} className="btn-pill mt-4 w-full py-2.5 text-[9px] tracking-[0.15em] sm:py-3 sm:text-[10px]"><ShoppingBag className="h-3.5 w-3.5" />ADD TO CART</button>
        ) : (
          <Link data-testid={`shop-now-${p.slug}`} to="/product/$slug" params={{ slug: p.slug }} className="btn-pill mt-4 w-full py-2.5 text-[9px] tracking-[0.15em] sm:py-3 sm:text-[10px]">SHOP NOW <ArrowUpRight className="h-3.5 w-3.5" /></Link>
        )}
      </div>
    </motion.div>
  );
}
