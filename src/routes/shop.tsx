import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import { products } from "@/lib/products";
export const Route = createFileRoute("/shop")({
  head: () => ({ meta: [
    { title: "Shop Perfumes — TRYUNIQ" },
    { name: "description", content: "Shop all TRYUNIQ signature perfumes — Royal, Blossom, Magic, Ocean and Midnight." },
    { property: "og:title", content: "Shop Perfumes — TRYUNIQ" },
    { property: "og:description", content: "Shop all TRYUNIQ signature perfumes." },
  ] }),
  component: Shop,
});
const families = ["All", "Woody", "Floral", "Fresh", "Sensual"];
const genders = ["All", "Men", "Women", "Unisex"];
function Shop() {
  const [fam, setFam] = useState("All");
  const [gen, setGen] = useState("All");
  const [max, setMax] = useState(500);
  const [sort, setSort] = useState("featured");
  const list = useMemo(() => {
    const l = products.filter((p) => (fam === "All" || p.family === fam) && (gen === "All" || p.gender === gen || (gen !== "Unisex" && p.gender === "Unisex")) && p.price <= max);
    if (sort === "name") l.sort((a, b) => a.name.localeCompare(b.name));
    if (sort === "bestseller") l.sort((a, b) => Number(b.bestseller) - Number(a.bestseller));
    return l;
  }, [fam, gen, max, sort]);
  return (
    <SiteLayout>
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="text-center"><p className="eyebrow">Shop</p><h1 className="mt-3 font-display text-5xl tracking-tight">All Fragrances</h1></div>
        <div className="mt-10 space-y-4 rounded-2xl border border-champagne/50 bg-card p-4 shadow-card">
          <div className="flex flex-wrap gap-2">{families.map((f) => <button key={f} data-testid={`filter-family-${f}`} data-active={fam === f} onClick={() => setFam(f)} className="chip">{f}</button>)}</div>
          <div className="flex flex-wrap gap-2">{genders.map((g) => <button key={g} data-testid={`filter-gender-${g}`} data-active={gen === g} onClick={() => setGen(g)} className="chip">{g === "All" ? "Everyone" : g}</button>)}</div>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <label className="flex flex-1 items-center gap-3 text-xs tracking-wider text-charcoal">Max price
              <input data-testid="filter-price" type="range" min={100} max={500} step={10} value={max} onChange={(e) => setMax(Number(e.target.value))} className="brand-range max-w-xs flex-1" />
              <span className="rounded-full bg-burgundy px-2.5 py-1 text-[11px] font-semibold text-primary-foreground">₹{max}</span>
            </label>
            <select data-testid="sort-select" value={sort} onChange={(e) => setSort(e.target.value)} className="rounded-xl border border-charcoal/15 bg-card px-4 py-2.5 text-xs tracking-wider outline-none focus:border-burgundy focus:ring-2 focus:ring-blush/30">
              <option value="featured">Featured</option><option value="bestseller">Bestsellers first</option><option value="name">Name A–Z</option>
            </select>
          </div>
        </div>
        {list.length === 0 ? <p className="mt-14 text-center text-cocoa">No fragrances match these filters.</p> :
        <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3">{list.map((p, i) => <Reveal key={p.slug} delay={i * 0.05}><ProductCard p={p} mode="cart" /></Reveal>)}</div>}
      </div>
    </SiteLayout>
  );
}
