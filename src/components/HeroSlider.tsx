import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, Droplets, Gem, Gift, Feather } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { getProduct } from "@/lib/products";
import { useCart } from "@/lib/cart";

const order = ["royal", "blossom", "magic", "midnight", "ocean"] as const;
const slides = [{ id: "collection", image: "/images/hero_wide.webp" }, ...order.map((s) => ({ id: s, image: `/images/hero_${s}.webp` }))];
const features = [
  { icon: Feather, label: "Long Lasting Fragrance" },
  { icon: Gem, label: "Premium Quality" },
  { icon: Droplets, label: "Skin Friendly Formula" },
  { icon: Gift, label: "Perfect for Gifting" },
];
const btn = "inline-flex items-center gap-2 rounded-full px-4 py-3 text-[10px] sm:py-3.5 sm:text-[11px] font-semibold tracking-[0.18em] transition-[transform,opacity] duration-200 hover:-translate-y-px active:scale-[0.97] sm:px-7";

export function HeroSlider() {
  const [i, setI] = useState(0);
  const { add } = useCart();
  const go = (d: number) => setI((v) => (v + d + slides.length) % slides.length);
  useEffect(() => { const t = setInterval(() => go(1), 6000); return () => clearInterval(t); }, [i]);
  useEffect(() => { slides.forEach((s) => { const im = new Image(); im.src = s.image; }); }, []);
  const slide = slides[i]!;
  const p = slide.id === "collection" ? undefined : getProduct(slide.id);

  return (
    <section className="relative">
      <div className={`scene-${slide.id} relative h-[78vh] min-h-[540px] overflow-hidden bg-scene-bg transition-[background-color] duration-700 sm:h-[82vh] lg:h-[86vh]`} data-testid="hero-slider">
        <AnimatePresence initial={false} mode="popLayout">
          <motion.div key={slide.id} className="absolute inset-0 cursor-grab active:cursor-grabbing" initial={{ opacity: 0, scale: 1.03 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.8 }}
            drag="x" dragConstraints={{ left: 0, right: 0 }} dragElastic={0.2}
            onDragEnd={(_, { offset, velocity }) => { if (offset.x < -50 || velocity.x < -400) go(1); else if (offset.x > 50 || velocity.x > 400) go(-1); }}>
            <img src={slide.image} alt={p ? `${p.name} perfume` : "The TRYUNIQ signature collection"} draggable={false} className="h-full w-full object-cover object-[88%_center] lg:object-right" />
            <div className="absolute inset-0 bg-gradient-to-r from-scene-bg via-scene-bg/60 to-transparent lg:via-scene-bg/30" />
          </motion.div>
        </AnimatePresence>

        <div className="pointer-events-none relative mx-auto flex h-full max-w-[1600px] flex-col justify-center px-6 pb-24 sm:px-10 lg:px-28">
          <motion.div key={slide.id} className="max-w-xl text-scene-text" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
            {p ? (
              <>
                <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-scene-accent sm:text-sm">{p.notes}</p>
                <h1 className="mt-3 font-display text-5xl leading-none sm:text-7xl lg:text-8xl">{p.name}</h1>
                <p className="mt-3 font-display text-3xl italic text-scene-accent sm:text-5xl lg:text-6xl">{p.heroLine}</p>
                <p className="mt-5 max-w-md text-sm leading-relaxed opacity-90 sm:text-lg">{p.tagline}</p>
                <p className="mt-4 text-sm font-semibold sm:text-base">₹{p.price} <span className="font-normal opacity-70">· 8 ml</span></p>
                <div className="pointer-events-auto mt-7 flex flex-wrap gap-2 sm:gap-3">
                  <Link to="/product/$slug" params={{ slug: p.slug }} data-testid={`hero-shop-${p.slug}`} className={`${btn} scene-btn`}>SHOP {p.name} <ArrowRight className="h-3.5 w-3.5" /></Link>
                  <button data-testid={`hero-add-${p.slug}`} onClick={() => { add(p.slug); toast.success(`${p.name} added to cart`); }} className={`${btn} scene-btn-ghost`}>ADD TO CART</button>
                </div>
              </>
            ) : (
              <>
                <p className="text-[11px] font-medium uppercase tracking-[0.3em] sm:text-sm">TRYUNIQ Fragrances</p>
                <h1 className="mt-4 font-display text-5xl leading-[1.04] sm:text-7xl lg:text-8xl">The Art of<br /><em>Fragrance</em></h1>
                <p className="mt-5 max-w-sm text-sm leading-relaxed opacity-85 sm:text-lg">Signature scents for every mood. Bold, romantic, fresh and unforgettable.</p>
                <div className="pointer-events-auto mt-8 flex flex-wrap gap-2 sm:gap-3">
                  <Link to="/shop" data-testid="hero-shop-now" className={`${btn} scene-btn`}>SHOP NOW <ArrowRight className="h-3.5 w-3.5" /></Link>
                  <Link to="/collections" data-testid="hero-explore" className={`${btn} scene-btn-ghost`}>EXPLORE COLLECTIONS</Link>
                </div>
              </>
            )}
          </motion.div>
        </div>

        <div className="absolute bottom-28 left-6 flex items-center gap-4 sm:left-10 lg:left-28">
          <button aria-label="Previous slide" data-testid="hero-prev" onClick={() => go(-1)} className="rounded-full bg-ivory/80 p-3 text-charcoal shadow-card backdrop-blur-xl transition-[background-color] hover:bg-ivory"><ChevronLeft className="h-4 w-4" /></button>
          <div className="flex gap-1.5">
            {slides.map((s, k) => <button key={s.id} aria-label={`Slide ${k + 1}`} data-testid={`hero-dot-${k}`} onClick={() => setI(k)} className={`h-1.5 rounded-full bg-scene-text transition-[width,opacity] duration-300 ${k === i ? "w-10 opacity-100" : "w-3 opacity-35"}`} />)}
          </div>
          <button aria-label="Next slide" data-testid="hero-next" onClick={() => go(1)} className="rounded-full bg-ivory/80 p-3 text-charcoal shadow-card backdrop-blur-xl transition-[background-color] hover:bg-ivory"><ChevronRight className="h-4 w-4" /></button>
        </div>
      </div>

      <div className="relative z-10 mx-auto -mt-14 max-w-[1500px] px-4 sm:px-10 lg:px-28">
        <div className="grid grid-cols-2 gap-y-4 rounded-[2rem] border border-champagne/50 bg-card/95 px-2 py-5 lg:flex shadow-hover backdrop-blur-xl sm:py-7 lg:justify-between">
          {features.map(({ icon: Icon, label }, k) => (
            <div key={label} className={`flex min-w-0 items-center gap-2 px-3 sm:gap-3 sm:px-5 lg:flex-1 lg:justify-center ${k % 2 ? "border-l border-champagne/70" : ""} ${k === 2 ? "lg:border-l lg:border-champagne/70" : ""}`}>
              <Icon className="h-5 w-5 shrink-0 text-burgundy" strokeWidth={1.5} />
              <span className="text-[10px] font-medium uppercase leading-snug tracking-[0.15em] sm:tracking-[0.2em] lg:whitespace-nowrap text-charcoal sm:text-xs">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
