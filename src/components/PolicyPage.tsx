import { SiteLayout } from "./SiteLayout";
import { CONTACT } from "@/lib/contact";
export function PolicyPage({ title, sections }: { title: string; sections: [string, string][] }) {
  return (
    <SiteLayout>
      <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
        <p className="eyebrow">Support</p>
        <h1 className="mt-3 font-display text-5xl tracking-tight">{title}</h1>
        <div className="mt-8 space-y-6 rounded-3xl border border-charcoal/8 bg-card p-6 shadow-card sm:p-8">
          {sections.map(([h, t]) => <section key={h}><h2 className="font-display text-xl">{h}</h2><p className="mt-2 leading-relaxed text-charcoal/80">{t}</p></section>)}
          <p className="text-sm text-cocoa">Questions? Email {CONTACT.email} or call {CONTACT.phone}.</p>
        </div>
      </div>
    </SiteLayout>
  );
}
