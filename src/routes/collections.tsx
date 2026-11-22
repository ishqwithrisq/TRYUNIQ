import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { SiteLayout } from "@/components/SiteLayout";
import { Reveal } from "@/components/Reveal";
import { products } from "@/lib/products";
import { useCart } from "@/lib/cart";
export const Route = createFileRoute("/collections")({
  head: () => ({ meta: [
    { title: "Collections — TRYUNIQ" },
    { name: "description", content: "Explore TRYUNIQ fragrances by mood: woody, floral, fresh, aqua and sensual." },
    { property: "og:title", content: "Collections — TRYUNIQ" },
    { property: "og:description", content: "Explore TRYUNIQ fragrances by mood." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: Collections,
});
function Collections() {
  const { add } = useCart();
  return (
    <SiteLayout>
      <div className="mx-auto max-w-[1500px] px-3 pb-10 pt-14 sm:px-6 sm:pt-20 lg:px-10">
        <div className="text-center"><p className="eyebrow">COLLECTIONS</p><h1 className="mt-3 font-display text-4xl tracking-tight sm:text-6xl">A Scent for Every Mood</h1>
          <p className="mx-auto mt-4 max-w-md text-sm text-cocoa sm:text-base">Five signature fragrances, each with its own story. Find the one that feels like you.</p></div>
        <div className="mt-10 grid grid-cols-2 gap-3 sm:mt-16 sm:gap-6 md:grid-cols-1">{products.map((p, i) => (
          <Reveal key={p.slug}>
            <article className="group relative overflow-hidden flex flex-col h-full rounded-2xl bg-charcoal shadow-card md:block sm:rounded-[2.25rem]">
              <picture>
                <source media="(min-width: 768px)" srcSet={p.gallery[1]} />
                <img src={p.image} alt={`${p.name} perfume`} loading={i < 2 ? "eager" : "lazy"} decoding="async"
                  className="aspect-[3/4] w-full object-cover object-center transition-transform duration-[1.2s] ease-out group-hover:scale-[1.03] md:aspect-[2600/848] md:object-right" />
              </picture>
              <div className="absolute inset-0 hidden md:block md:bg-gradient-to-r md:from-charcoal/85 md:via-charcoal/40" />
              <div className="relative flex flex-1 flex-col p-3 text-ivory sm:p-10 md:absolute md:inset-y-0 md:left-0 md:flex md:max-w-[55%] md:flex-col md:justify-center md:px-14 lg:px-20">
                <p className="text-[8px] font-medium uppercase tracking-[0.2em] sm:tracking-[0.3em] text-champagne sm:text-xs">0{i + 1} · {p.notes}</p>
                <h2 className="mt-1 font-display text-xl tracking-[0.06em] sm:text-6xl lg:text-7xl">{p.name}</h2>
                <p className="mt-0.5 font-display text-sm italic text-champagne sm:text-3xl">{p.heroLine}</p>
                <p className="mt-3 hidden max-w-md text-sm sm:block leading-relaxed opacity-85 sm:text-base">{p.tagline}</p>
                <p className="mt-2 text-xs font-semibold sm:mt-3 sm:text-sm">₹{p.price} <span className="font-normal opacity-70">· 8 ml</span></p>
                <div className="mt-auto flex flex-col gap-2 pt-3 sm:mt-5 sm:flex-row sm:flex-wrap sm:gap-3 sm:pt-0">
                  <Link to="/product/$slug" params={{ slug: p.slug }} className="inline-flex items-center justify-center gap-1.5 rounded-full bg-ivory px-3 py-2.5 text-[9px] sm:px-5 sm:py-3 sm:text-[10px] font-semibold tracking-[0.18em] text-burgundy transition-transform hover:-translate-y-px sm:text-[11px]">DISCOVER <ArrowUpRight className="h-3.5 w-3.5" /></Link>
                  <button onClick={() => { add(p.slug); toast.success(`${p.name} added to cart`); }} className="inline-flex items-center justify-center gap-1.5 rounded-full border border-ivory/60 px-3 py-2.5 text-[9px] sm:px-5 sm:py-3 sm:text-[10px] font-semibold tracking-[0.18em] text-ivory backdrop-blur-sm transition-colors hover:bg-ivory/10 sm:text-[11px]"><ShoppingBag className="h-3.5 w-3.5" />ADD TO CART</button>
                </div>
              </div>
            </article>
          </Reveal>))}</div>
      </div>
    </SiteLayout>
  );
}
