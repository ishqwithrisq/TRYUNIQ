import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { MessageCircle, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { SiteLayout } from "@/components/SiteLayout";
import { getProduct } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { whatsappLink } from "@/lib/contact";
export const Route = createFileRoute("/product/$slug")({
  loader: ({ params }) => { const p = getProduct(params.slug); if (!p) throw notFound(); return p; },
  head: ({ loaderData }) => ({ meta: loaderData ? [
    { title: `${loaderData.name} — ${loaderData.notes} | TRYUNIQ` },
    { name: "description", content: loaderData.description },
    { property: "og:title", content: `${loaderData.name} | TRYUNIQ` },
    { property: "og:description", content: loaderData.description },
  ] : [{ title: "Unavailable | TRYUNIQ" }, { name: "robots", content: "noindex" }] }),
  component: ProductPage,
});
const tabs = ["Description", "Notes", "How to wear"] as const;
function ProductPage() {
  const p = Route.useLoaderData();
  const { add } = useCart();
  const [img, setImg] = useState(0);
  const [tab, setTab] = useState<(typeof tabs)[number]>("Description");
  const n = p.gallery.length;
  const go = (d: number) => setImg((v) => (v + d + n) % n);
  const content = { Description: p.description, Notes: `${p.family} family — ${p.notes}. Crafted to last all day with a skin-friendly formula.`, "How to wear": "Spray on pulse points — wrists, neck and behind the ears — from about 15 cm away. Don't rub; let it settle." };
  return (
    <SiteLayout>
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-2 md:gap-12">
        <div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-cream" data-testid="product-gallery">
            <AnimatePresence initial={false} mode="popLayout">
              <motion.img key={img} src={p.gallery[img]} alt={`${p.name} — ${p.notes}`} draggable={false} className="absolute inset-0 h-full w-full cursor-grab object-cover active:cursor-grabbing"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}
                drag="x" dragConstraints={{ left: 0, right: 0 }} dragElastic={0.2}
                onDragEnd={(_, { offset }) => { if (offset.x < -50) go(1); else if (offset.x > 50) go(-1); }} />
            </AnimatePresence>
            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1.5">{p.gallery.map((_, k) => <span key={k} className={`h-1.5 rounded-full bg-ivory transition-[width,opacity] duration-300 ${k === img ? "w-6" : "w-1.5 opacity-60"}`} />)}</div>
          </div>
          <div className="mt-3 flex gap-2">{p.gallery.map((g, k) => (
            <button key={g} data-testid={`gallery-thumb-${k}`} onClick={() => setImg(k)} className={`h-20 w-16 overflow-hidden rounded-xl border-2 transition-[border-color,transform] duration-200 active:scale-95 ${k === img ? "border-burgundy" : "border-transparent"}`}><img src={g} alt="" className="h-full w-full object-cover" /></button>))}</div>
        </div>
        <div className="flex flex-col justify-center">
          <Link to="/shop" className="text-[11px] font-semibold tracking-[0.2em] text-cocoa hover:text-burgundy">← BACK TO SHOP</Link>
          <p className="eyebrow mt-6">{p.notes}</p>
          <h1 className="mt-2 font-display text-5xl tracking-tight sm:text-6xl">{p.name}</h1>
          <p className="mt-3 text-2xl font-semibold text-burgundy">₹{p.price}</p>
          <div className="mt-5 flex flex-wrap gap-2">{["Long lasting", "Skin friendly", "Perfect for gifting"].map((t) => <span key={t} className="rounded-full border border-champagne/60 bg-card px-3 py-1.5 text-[11px] tracking-wide">✦ {t}</span>)}</div>
          <div className="mt-6 flex gap-1 self-start rounded-full border border-charcoal/8 bg-cream/80 p-1">
            {tabs.map((t) => (
              <button key={t} data-testid={`tab-${t}`} onClick={() => setTab(t)} className={`relative rounded-full px-4 py-2 text-[11px] font-semibold tracking-wider transition-colors ${tab === t ? "text-primary-foreground" : "text-charcoal/70"}`}>
                {tab === t && <motion.span layoutId="tab-pill" className="absolute inset-0 rounded-full bg-burgundy" transition={{ type: "spring", damping: 28, stiffness: 260 }} />}
                <span className="relative">{t}</span>
              </button>))}
          </div>
          <p className="mt-4 min-h-[4.5rem] leading-relaxed text-charcoal/85">{content[tab]}</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <motion.button whileTap={{ scale: 0.97 }} whileHover={{ y: -1 }} data-testid="product-add-to-cart" onClick={() => { add(p.slug); toast.success(`${p.name} added to cart`); }} className="btn-pill flex-1"><ShoppingBag className="h-4 w-4" />ADD TO CART</motion.button>
            <a data-testid="product-whatsapp" href={whatsappLink(`Hi! I would like to order TRYUNIQ ${p.name} (₹${p.price}).`)} target="_blank" rel="noreferrer" className="btn-pill-outline flex-1"><MessageCircle className="h-4 w-4" />ORDER ON WHATSAPP</a>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}
