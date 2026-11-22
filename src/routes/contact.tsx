import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, MapPin, MessageCircle, Phone, Send } from "lucide-react";
import { toast } from "sonner";
import { SiteLayout } from "@/components/SiteLayout";
import { CONTACT, whatsappLink } from "@/lib/contact";
export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [
    { title: "Contact TRYUNIQ — Get in Touch" },
    { name: "description", content: "Call, WhatsApp or email TRYUNIQ for queries, orders or assistance. Based in Pune, India." },
    { property: "og:title", content: "Contact TRYUNIQ" },
    { property: "og:description", content: "Reach out to TRYUNIQ for queries, orders or assistance." },
  ] }),
  component: Contact,
});
const label = "text-[10px] font-semibold uppercase tracking-[0.2em] text-charcoal";
const field = "mt-2 w-full rounded-xl border border-charcoal/15 bg-card px-4 py-3 text-sm outline-none transition-[border-color,box-shadow] placeholder:text-cocoa focus:border-burgundy focus:ring-2 focus:ring-blush/40";
const cards = [
  { icon: Phone, title: "Call us", value: CONTACT.phone, href: `tel:+${CONTACT.phoneRaw}`, id: "call" },
  { icon: MessageCircle, title: "WhatsApp", value: CONTACT.phone, href: whatsappLink(), id: "whatsapp" },
  { icon: Mail, title: "Email", value: CONTACT.email, href: `mailto:${CONTACT.email}`, id: "email" },
  { icon: MapPin, title: "Address", value: CONTACT.address, href: undefined, id: "address" },
];
function Contact() {
  const [f, setF] = useState({ name: "", mobile: "", email: "", message: "" });
  return (
    <SiteLayout>
      <section className="px-2 pt-2 sm:px-4 sm:pt-4">
        <div className="relative overflow-hidden rounded-3xl">
          <img src="/images/editorial_banner.webp" alt="" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-ivory/80" />
          <div className="relative mx-auto max-w-7xl px-6 py-14 sm:px-10 sm:py-20">
            <h1 className="font-display text-5xl tracking-tight text-charcoal sm:text-6xl">Get in Touch</h1>
            <p className="mt-3 max-w-md text-charcoal/80">We'd love to hear from you. Reach out for queries, orders or assistance.</p>
          </div>
        </div>
      </section>
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-14 sm:px-6 md:grid-cols-2">
        <div className="grid grid-cols-2 content-start gap-3 md:grid-cols-1">
          {cards.map(({ icon: Icon, title, value, href, id }) => {
            const inner = (<><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cream text-burgundy"><Icon className="h-4 w-4" /></span>
              <div className="w-full min-w-0"><p className={label}>{title}</p><p className="mt-1 break-all text-[11px] sm:text-sm text-charcoal/80">{value}</p></div></>);
            const cls = "flex flex-col items-start gap-3 rounded-2xl border border-charcoal/8 bg-card p-3 sm:p-4 md:flex-row md:items-center md:gap-4 shadow-card transition-[box-shadow,border-color] hover:border-burgundy/25 hover:shadow-hover";
            return href ? <a key={id} data-testid={`contact-${id}`} href={href} target={id === "whatsapp" ? "_blank" : undefined} rel="noreferrer" className={cls}>{inner}</a> : <div key={id} data-testid={`contact-${id}`} className={cls}>{inner}</div>;
          })}
        </div>
        <form data-testid="contact-form" className="space-y-5 rounded-3xl border border-charcoal/8 bg-card p-6 shadow-card"
          onSubmit={(e) => { e.preventDefault();
            const body = `${f.message}\n\n— ${f.name}\nMobile: ${f.mobile}${f.email ? `\nEmail: ${f.email}` : ""}`;
            window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(`Message from ${f.name}`)}&body=${encodeURIComponent(body)}`;
            toast.success("Opening your email app to send the message."); setF({ name: "", mobile: "", email: "", message: "" }); }}>
          <label className="block"><span className={label}>Your name *</span><input required data-testid="contact-name" placeholder="Your name" value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} className={field} /></label>
          <label className="block"><span className={label}>Mobile number *</span><input required inputMode="numeric" pattern="[0-9]{10}" title="Enter a 10-digit mobile number" data-testid="contact-mobile" placeholder="10-digit mobile number" value={f.mobile} onChange={(e) => setF({ ...f, mobile: e.target.value.replace(/\D/g, "").slice(0, 10) })} className={field} /></label>
          <label className="block"><span className={label}>Email address</span><input type="email" data-testid="contact-email" placeholder="you@example.com" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} className={field} /></label>
          <label className="block"><span className={label}>Your message *</span><textarea required rows={5} data-testid="contact-message" placeholder="How can we help?" value={f.message} onChange={(e) => setF({ ...f, message: e.target.value })} className={field} /></label>
          <button data-testid="contact-submit" className="btn-pill w-full"><Send className="h-4 w-4" />SEND MESSAGE</button>
        </form>
      </div>
    </SiteLayout>
  );
}
