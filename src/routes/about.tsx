import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { Reveal } from "@/components/Reveal";
export const Route = createFileRoute("/about")({
  head: () => ({ meta: [
    { title: "About TRYUNIQ — Luxury, Made Accessible" },
    { name: "description", content: "The story behind TRYUNIQ: premium signature fragrances at an everyday price." },
    { property: "og:title", content: "About TRYUNIQ" },
    { property: "og:description", content: "Premium signature fragrances at an everyday price." },
  ] }),
  component: About,
});
const values = [
  ["Premium Quality", "Carefully crafted blends with rich, refined character."],
  ["Honest Pricing", "Luxury you can wear every day — every scent is just ₹119."],
  ["Skin Friendly", "Gentle formulas made to be worn comfortably all day."],
  ["Made to Gift", "Beautifully presented and perfect for the people you love."],
];
function About() {
  return (
    <SiteLayout>
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 sm:px-6 md:grid-cols-2">
        <Reveal>
          <p className="eyebrow">Our Story</p>
          <h1 className="mt-3 font-display text-5xl leading-tight tracking-tight">Luxury, made <em className="text-burgundy">accessible</em></h1>
          <p className="mt-5 leading-relaxed text-charcoal/85">TRYUNIQ began with a simple belief: a beautiful fragrance shouldn't be a rare indulgence. We create signature scents for every mood — bold, romantic, fresh and unforgettable — and price them so you can wear them every day.</p>
          <p className="mt-4 leading-relaxed text-charcoal/85">From the woody confidence of ROYAL to the sensual warmth of MIDNIGHT, every bottle is made to leave an impression long after you've left the room.</p>
          <Link to="/shop" className="btn-pill mt-8">SHOP THE COLLECTION</Link>
        </Reveal>
        <Reveal delay={0.1}><img src="/images/editorial_banner.webp" alt="Roses, ivory silk and a TRYUNIQ perfume in warm light" className="aspect-[4/5] w-full rounded-3xl object-cover shadow-hover" /></Reveal>
      </section>
      <section className="mx-2 rounded-3xl bg-cream px-6 py-16 sm:mx-4">
        <div className="mx-auto max-w-6xl">
          <p className="eyebrow text-center">What we stand for</p>
          <h2 className="mt-3 text-center font-display text-4xl tracking-tight">Our Promise</h2>
          <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {values.map(([t, d], i) => <Reveal key={t} delay={i * 0.06} className="rounded-2xl border border-champagne/50 bg-card p-4 shadow-card sm:p-6"><p className="text-xl text-burgundy">✦</p><h3 className="mt-3 font-display text-base sm:text-xl">{t}</h3><p className="mt-2 text-xs sm:text-sm text-cocoa">{d}</p></Reveal>)}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
