import { Link, useLocation } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Instagram, Mail, MapPin, Menu, MessageCircle, Phone, Search, ShoppingBag, X } from "lucide-react";
import { CONTACT, whatsappLink } from "@/lib/contact";
import { products } from "@/lib/products";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState, type ReactNode } from "react";
import { useCart } from "@/lib/cart";
import { logoBurgundyUrl, logoIvoryUrl } from "@/lib/logos";
import { MobileBottomDock } from "./MobileBottomDock";
import { SearchOverlay } from "./SearchOverlay";
import { CartDrawer } from "./CartDrawer";
export function SiteLayout({ children }: { children: ReactNode }) {
  const { count, setDrawerOpen, setSearchOpen } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => setMenuOpen(false), [pathname]);
  useEffect(() => { const f = () => setScrolled(window.scrollY > 8); f(); window.addEventListener("scroll", f); return () => window.removeEventListener("scroll", f); }, []);
  const links = [{ to: "/", label: "HOME" }, { to: "/shop", label: "SHOP" }, { to: "/collections", label: "COLLECTIONS" }, { to: "/about", label: "ABOUT" }, { to: "/contact", label: "CONTACT" }] as const;
  const isActive = (to: string) => (to === "/" ? pathname === "/" : pathname.startsWith(to));
  return (
    <div className="min-h-screen bg-background pb-24 text-foreground lg:pb-0">
      <div className="bg-burgundy px-3 py-2 text-center text-[9px] font-medium tracking-[0.15em] sm:text-[10px] sm:tracking-[0.3em] text-primary-foreground">✦ PREMIUM FRAGRANCES AT AN AFFORDABLE PRICE ✦</div>
      <header className={`sticky top-0 z-40 border-b border-champagne/40 glass transition-[box-shadow] ${scrolled ? "shadow-card" : ""}`}>
        <div className="mx-auto grid max-w-[1600px] grid-cols-[minmax(0,1fr)_auto] items-center px-4 py-3 sm:px-6 lg:grid-cols-[1fr_auto_1fr] lg:px-10">
          <div className="flex min-w-0 items-center">
            <Link to="/" data-testid="nav-logo" className="shrink-0"><img src={logoBurgundyUrl} alt="TRYUNIQ" className="h-11 w-auto lg:h-14" /></Link>
          </div>
          <nav className="hidden items-center gap-1 rounded-full border border-champagne/50 bg-card/80 p-1.5 shadow-card lg:flex">
            {links.map((l) => (
              <Link key={l.to} to={l.to} data-testid={`nav-${l.label.toLowerCase()}`} className={`rounded-full px-6 py-3 text-[13px] font-medium tracking-[0.18em] transition-[background-color,color] duration-200 ${isActive(l.to) ? "bg-burgundy font-semibold text-primary-foreground shadow-glow" : "text-charcoal hover:text-burgundy"}`}>{l.label}</Link>
            ))}
          </nav>
          <div className="flex items-center justify-end gap-1">
            <button aria-label="Search" data-testid="nav-search" onClick={() => setSearchOpen(true)} className="rounded-full p-2.5 text-charcoal hover:bg-cream hover:text-burgundy"><Search className="h-5 w-5 lg:h-6 lg:w-6" /></button>
            <button aria-label="Cart" data-testid="nav-cart" onClick={() => setDrawerOpen(true)} className="relative rounded-full p-2.5 text-charcoal hover:bg-cream hover:text-burgundy">
              <ShoppingBag className="h-5 w-5 lg:h-6 lg:w-6" />
              {count > 0 && <span className="absolute right-0.5 top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-burgundy px-1 text-[9px] text-primary-foreground">{count}</span>}
            </button>
            <button aria-label="Open menu" aria-expanded={menuOpen} data-testid="nav-hamburger" onClick={() => setMenuOpen(true)} className="rounded-full p-2.5 text-charcoal hover:bg-cream hover:text-burgundy lg:hidden"><Menu className="h-6 w-6" /></button>
          </div>
        </div>
      </header>
      <AnimatePresence>
        {menuOpen && (
          <motion.div className="fixed inset-0 z-50 bg-charcoal/30 backdrop-blur-sm lg:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setMenuOpen(false)}>
            <motion.aside data-testid="mobile-menu" onClick={(e) => e.stopPropagation()} initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 28, stiffness: 260 }}
              className="absolute bottom-2 right-2 top-2 flex w-[calc(100%-1rem)] max-w-xs flex-col rounded-3xl bg-ivory p-5 shadow-panel">
              <div className="flex items-center justify-between">
                <img src={logoBurgundyUrl} alt="TRYUNIQ" className="h-10 w-auto" />
                <button aria-label="Close menu" data-testid="mobile-menu-close" onClick={() => setMenuOpen(false)} className="rounded-full p-2 hover:bg-cream"><X className="h-5 w-5" /></button>
              </div>
              <nav className="mt-8 flex flex-col gap-1.5">
                {links.map((l) => (
                  <Link key={l.to} to={l.to} data-testid={`mobile-menu-${l.label.toLowerCase()}`} className={`rounded-full px-5 py-3.5 text-[12px] font-semibold tracking-[0.2em] transition-[background-color,color] ${isActive(l.to) ? "bg-burgundy text-primary-foreground shadow-glow" : "text-charcoal hover:bg-cream"}`}>{l.label}</Link>
                ))}
              </nav>
              <div className="mt-auto rounded-2xl bg-cream p-4 text-center"><p className="eyebrow">Premium · ₹119</p><p className="mt-1 text-sm text-cocoa">Signature scents for every mood.</p></div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.main initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.28, ease: [0.25, 1, 0.5, 1] }}>{children}</motion.main>
      <footer className="mt-24 rounded-t-[2rem] bg-burgundy text-primary-foreground sm:rounded-t-[2.5rem]">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-6 gap-y-10 px-6 pb-10 pt-12 sm:px-10 sm:pt-14 lg:grid-cols-[1.5fr_1fr_1fr_1fr_1.4fr] lg:gap-8">
          <div className="col-span-2 flex flex-col items-center text-center lg:col-span-1 lg:items-start lg:text-left">
            <img src={logoIvoryUrl} alt="TRYUNIQ" className="h-14 w-auto" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed opacity-85">Premium fragrances at an affordable price. Signature scents for every mood — bold, timeless and unforgettable.</p>
            <div className="mt-5 flex gap-2">
              <a aria-label="Instagram" data-testid="footer-instagram" href="https://www.instagram.com/tryuniq" target="_blank" rel="noreferrer" className="rounded-full border border-primary-foreground/40 p-2.5 transition-colors hover:bg-primary-foreground/10"><Instagram className="h-4 w-4" /></a>
              <a aria-label="WhatsApp" data-testid="footer-whatsapp" href={whatsappLink()} target="_blank" rel="noreferrer" className="rounded-full border border-primary-foreground/40 p-2.5 transition-colors hover:bg-primary-foreground/10"><MessageCircle className="h-4 w-4" /></a>
              <a aria-label="Email" href={`mailto:${CONTACT.email}`} className="rounded-full border border-primary-foreground/40 p-2.5 transition-colors hover:bg-primary-foreground/10"><Mail className="h-4 w-4" /></a>
            </div>
          </div>
          <FooterCol title="Shop">{products.map((p) => <Link key={p.slug} to="/product/$slug" params={{ slug: p.slug }} className={fl}>{p.name}</Link>)}</FooterCol>
          <FooterCol title="Company"><Link to="/shop" className={fl}>Shop</Link><Link to="/collections" className={fl}>Collections</Link><Link to="/about" className={fl}>About</Link><Link to="/contact" className={fl}>Contact</Link></FooterCol>
          <FooterCol title="Support"><Link to="/privacy-policy" className={fl}>Privacy Policy</Link><Link to="/terms" className={fl}>Terms &amp; Conditions</Link><Link to="/shipping-policy" className={fl}>Shipping Policy</Link><Link to="/returns-policy" className={fl}>Returns Policy</Link></FooterCol>
          <FooterCol title="Get in touch">
            <div className="space-y-3 text-sm opacity-85">
              <a href={`tel:+${CONTACT.phoneRaw}`} className="flex items-start gap-2 hover:opacity-100"><Phone className="mt-0.5 h-3.5 w-3.5 shrink-0" />{CONTACT.phone}</a>
              <a href={`mailto:${CONTACT.email}`} className="flex items-start gap-2 break-all hover:opacity-100"><Mail className="mt-0.5 h-3.5 w-3.5 shrink-0" />{CONTACT.email}</a>
              <p className="flex items-start gap-2"><MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" />{CONTACT.address}</p>
            </div>
          </FooterCol>
        </div>
        <div className="border-t border-primary-foreground/15">
          <div className="mx-auto flex max-w-7xl flex-col items-center gap-2 px-6 pb-28 pt-5 text-center text-xs opacity-70 sm:flex-row sm:justify-between sm:px-10 sm:text-left lg:pb-5">
            <p>© 2026 TRYUNIQ Fragrances. All rights reserved.</p><p>Made with love in Pune, India</p>
          </div>
        </div>
      </footer>
      <MobileBottomDock />
      <SearchOverlay />
      <CartDrawer />
    </div>
  );
}

const fl = "block py-1 text-sm opacity-85 transition-opacity hover:opacity-100";
function FooterCol({ title, children }: { title: string; children: ReactNode }) {
  return <div><p className="mb-3 font-display text-xs font-semibold uppercase tracking-[0.2em] text-champagne">{title}</p>{children}</div>;
}
