import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { SiteLayout } from "@/components/SiteLayout";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/lib/products";
import { HeroSlider } from "@/components/HeroSlider";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/")({
  head: () => ({ links: [{ rel: "preload", as: "image", href: "/images/hero_wide.webp", fetchPriority: "high" }], meta: [
    { title: "TRYUNIQ — The Art of Fragrance" },
    { name: "description", content: "Premium signature perfumes for every mood, at an affordable price." },
    { property: "og:title", content: "TRYUNIQ — The Art of Fragrance" },
    { property: "og:description", content: "Premium signature perfumes for every mood, at an affordable price." },
  ] }),
  component: Home,
});

const reviews = [
  ["Beautiful packaging and the fragrance lasts all day. ROYAL has become my everyday signature.", "Priya S. · Mumbai"],
  ["MIDNIGHT is warm and sensual. I've had so many compliments already.", "Arjun M. · Delhi"],
  ["Affordable luxury in every sense. BLOSSOM smells far more expensive than it is.", "Sneha K. · Pune"],
];
const why = [
  ["Premium Fragrance", "Carefully crafted scents with rich, refined character."],
  ["Everyday Luxury", "A touch of indulgence that fits every day and every budget."],
  ["Designed for Every Mood", "From fresh mornings to intense, unforgettable evenings."],
  ["Made to Make an Impression", "Fragrances that linger long after you leave the room."],
];

function Home() {
  const [email, setEmail] = useState("");
  return (
    <SiteLayout>
      <HeroSlider />

      <section className="mx-auto max-w-[1600px] px-4 py-20 sm:px-10 lg:px-28">
        <SectionTitle eyebrow="TRYUNIQ" title="Our Signature Collection" sub="A curated range of premium fragrances for every mood." />
        <div className="mt-14 grid grid-cols-2 gap-3 sm:gap-6 md:grid-cols-3 lg:grid-cols-5">{products.map((p, i) => <Reveal key={p.slug} delay={i * 0.06} className="h-full"><ProductCard p={p} /></Reveal>)}</div>
      </section>
      <Banner img="/images/editorial_banner.webp" eyebrow="Editorial" title={<>Discover Your <em>Signature Scent</em></>} sub="Find the fragrance that matches your personality." cta="EXPLORE FRAGRANCES" />
      <section className="mx-auto max-w-[1600px] px-4 py-20 sm:px-10 lg:px-28">
        <SectionTitle eyebrow="Loved by everyone" title="Bestsellers" sub="The fragrances our customers keep coming back for." />
        <div className="mt-14 grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-4">{products.filter((p) => p.bestseller).map((p, i) => <Reveal key={p.slug} delay={i * 0.06} className="h-full"><ProductCard p={p} mode="cart" /></Reveal>)}</div>
      </section>
      <section className="mx-2 rounded-3xl bg-cream py-20 sm:mx-4"><div className="mx-auto max-w-7xl px-6">
        <SectionTitle eyebrow="Why TRYUNIQ" title="Luxury, Made Accessible" />
        <div className="mt-14 grid grid-cols-2 gap-3 sm:gap-6 md:grid-cols-4">{why.map(([t, d]) => <Reveal key={t} className="rounded-2xl border border-champagne/50 bg-card p-4 shadow-card sm:p-6"><p className="text-xl text-burgundy">✦</p><h3 className="mt-3 font-display text-base sm:text-xl">{t}</h3><p className="mt-2 text-xs sm:text-sm text-muted-foreground">{d}</p></Reveal>)}</div>
      </div></section>
      <Banner img="/images/discovery_banner.webp" eyebrow="Fragrance Discovery" title="Find Your Signature" sub="Discover a scent that feels uniquely yours." cta="EXPLORE THE COLLECTION" />
      <section className="mx-auto max-w-[1600px] px-4 py-20 sm:px-10 lg:px-28">
        <SectionTitle eyebrow="Testimonials" title="What People Are Saying" sub="First impressions from our early customers." />
        <div className="mt-14 grid grid-cols-2 gap-3 sm:gap-8 md:grid-cols-3">{reviews.map(([q, a]) => <blockquote key={a} className="rounded-2xl border border-champagne/50 bg-card p-4 shadow-card sm:p-8"><p className="font-display text-sm italic sm:text-xl">“{q}”</p><footer className="mt-4 text-xs tracking-[0.2em] text-muted-foreground">{a}</footer></blockquote>)}</div>
      </section>
      <section className="mx-auto max-w-2xl px-6 text-center">
        <SectionTitle eyebrow="Newsletter" title="Stay in the World of TRYUNIQ" sub="Discover new fragrances, special offers and updates." />
        <form className="mt-8 flex gap-2" onSubmit={(e) => { e.preventDefault(); if (!email) return; toast.success("Thanks for subscribing!"); setEmail(""); }}>
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your email" data-testid="newsletter-email" className="min-w-0 flex-1 rounded-full border border-charcoal/10 bg-card px-5 py-3 text-sm outline-none focus:border-burgundy focus:ring-2 focus:ring-blush/40" />
          <button data-testid="newsletter-submit" className="btn-pill">SUBSCRIBE</button>
        </form>
      </section>
    </SiteLayout>
  );
}

export function SectionTitle({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return <div className="text-center"><p className="eyebrow">{eyebrow}</p><h2 className="mt-3 font-display text-4xl tracking-tight md:text-5xl">{title}</h2>{sub && <p className="mt-3 text-muted-foreground">{sub}</p>}</div>;
}
function Banner({ img, eyebrow, title, sub, cta }: { img: string; eyebrow: string; title: React.ReactNode; sub: string; cta: string }) {
  return (
    <section className="relative mx-2 overflow-hidden rounded-3xl py-32 sm:mx-4">
      <img src={img} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-overlay" />
      <div className="relative mx-auto max-w-3xl px-6 text-center text-primary-foreground">
        <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-champagne">{eyebrow}</p>
        <h2 className="mt-3 font-display text-5xl tracking-tight [&_em]:text-blush">{title}</h2>
        <p className="mt-3 opacity-90">{sub}</p>
        <Link to="/shop" className="btn-pill mt-8">{cta}</Link>
      </div>
    </section>
  );
}
