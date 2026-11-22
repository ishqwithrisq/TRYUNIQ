import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { Search, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { products } from "@/lib/products";
import { useCart } from "@/lib/cart";
const chips = ["All", "Royal", "Floral", "Fresh", "Men", "Women", "Under ₹200"];
function highlight(text: string, q: string) {
  if (!q) return text;
  const i = text.toLowerCase().indexOf(q.toLowerCase());
  if (i < 0) return text;
  return <>{text.slice(0, i)}<mark className="rounded bg-blush/60 text-burgundy">{text.slice(i, i + q.length)}</mark>{text.slice(i + q.length)}</>;
}
export function SearchOverlay() {
  const { searchOpen, setSearchOpen, add } = useCart();
  const [q, setQ] = useState("");
  const [dq, setDq] = useState("");
  useEffect(() => { const t = setTimeout(() => setDq(q.trim()), 120); return () => clearTimeout(t); }, [q]);
  useEffect(() => { const k = (e: KeyboardEvent) => { if (e.key === "Escape") setSearchOpen(false); if ((e.metaKey || e.ctrlKey) && e.key === "k") { e.preventDefault(); setSearchOpen(true); } }; window.addEventListener("keydown", k); return () => window.removeEventListener("keydown", k); }, [setSearchOpen]);
  const results = useMemo(() => {
    const t = dq.toLowerCase();
    if (!t || t === "all") return products;
    if (t === "under ₹200") return products.filter((p) => p.price < 200);
    if (t === "men" || t === "women") return products.filter((p) => p.gender.toLowerCase() === t || p.gender === "Unisex");
    return products.filter((p) => [p.name, p.notes, p.family, p.description].join(" ").toLowerCase().includes(t));
  }, [dq]);
  return (
    <AnimatePresence>
      {searchOpen && (
        <motion.div className="fixed inset-0 z-50 flex items-start justify-center bg-charcoal/30 px-3 pt-[10vh] backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSearchOpen(false)}>
          <motion.div data-testid="search-overlay" onClick={(e) => e.stopPropagation()} initial={{ opacity: 0, y: -12, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -8 }} transition={{ type: "spring", damping: 28, stiffness: 260 }}
            className="w-full max-w-xl rounded-3xl border border-champagne/40 bg-ivory/95 p-4 shadow-panel backdrop-blur-2xl sm:rounded-2xl">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-cocoa" />
              <input autoFocus data-testid="search-input" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search fragrances, notes, moods…"
                className="w-full rounded-full border border-charcoal/10 bg-cream/70 py-3.5 pl-11 pr-11 text-sm text-charcoal outline-none transition-[border-color,box-shadow] placeholder:text-cocoa focus:border-burgundy focus:ring-2 focus:ring-blush/40" />
              <button aria-label="Close search" data-testid="search-close" onClick={() => setSearchOpen(false)} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-cocoa hover:text-burgundy"><X className="h-4 w-4" /></button>
            </div>
            <div className="no-scrollbar mt-3 flex gap-2 overflow-x-auto pb-1">
              {chips.map((c) => <button key={c} data-testid={`search-chip-${c}`} data-active={dq.toLowerCase() === c.toLowerCase()} onClick={() => setQ(c)} className="chip">{c}</button>)}
            </div>
            <ul className="mt-3 max-h-[50vh] space-y-1 overflow-y-auto">
              {results.length === 0 && <li className="py-8 text-center text-sm text-cocoa">No fragrances match “{dq}”.</li>}
              {results.map((p) => (
                <li key={p.slug} className="flex items-center gap-3 rounded-2xl p-2 transition-colors hover:bg-cream/80">
                  <img src={p.image} alt="" className="h-14 w-12 rounded-lg border border-champagne/60 object-cover" />
                  <div className="min-w-0 flex-1">
                    <p className="font-display font-semibold text-charcoal">{highlight(p.name, dq)}</p>
                    <p className="text-[11px] text-cocoa">{highlight(p.notes, dq)} · ₹{p.price}</p>
                  </div>
                  <span className="shrink-0 rounded-full bg-blush/40 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.15em] text-burgundy">{p.family}</span>
                  <Link to="/product/$slug" params={{ slug: p.slug }} onClick={() => setSearchOpen(false)} className="rounded-full border border-burgundy/30 px-3 py-1.5 text-[10px] font-semibold tracking-[0.15em] text-burgundy hover:bg-burgundy hover:text-primary-foreground">VIEW</Link>
                  <button data-testid={`search-add-${p.slug}`} onClick={() => { add(p.slug); toast.success(`${p.name} added`); }} className="rounded-full bg-burgundy px-3 py-1.5 text-[10px] font-semibold tracking-[0.15em] text-primary-foreground hover:bg-burgundy-dark">ADD</button>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
