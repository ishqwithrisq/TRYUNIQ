import { Link, useLocation } from "@tanstack/react-router";
import { Home, Search, ShoppingBag, Sparkles } from "lucide-react";
import { useCart } from "@/lib/cart";
const active = "flex items-center gap-1.5 rounded-full bg-burgundy px-3 py-1.5 text-[11px] font-medium tracking-wider text-primary-foreground shadow-glow";
const inactive = "relative flex flex-col items-center gap-0.5 px-2.5 py-1 text-[10px] tracking-wider text-charcoal/70 transition-colors hover:text-burgundy";
export function MobileBottomDock() {
  const { pathname } = useLocation();
  const { count, setDrawerOpen, setSearchOpen } = useCart();
  return (
    <nav aria-label="Quick navigation" className="fixed inset-x-4 bottom-4 z-40 mx-auto flex max-w-sm items-center justify-around rounded-full border border-champagne/60 px-4 py-2.5 shadow-dock glass lg:hidden">
      <Link to="/" data-testid="mobile-dock-home" className={pathname === "/" ? active : inactive}><Home className="h-4 w-4" />Home</Link>
      <Link to="/shop" data-testid="mobile-dock-shop" className={pathname.startsWith("/shop") ? active : inactive}><Sparkles className="h-4 w-4" />Shop</Link>
      <button data-testid="mobile-dock-search" onClick={() => setSearchOpen(true)} className={inactive}><Search className="h-4 w-4" />Search</button>
      <button data-testid="mobile-dock-cart" onClick={() => setDrawerOpen(true)} className={inactive}>
        <ShoppingBag className="h-4 w-4" />Cart
        {count > 0 && <span className="absolute -top-1 right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-burgundy px-1 text-[9px] text-primary-foreground">{count}</span>}
      </button>
    </nav>
  );
}
