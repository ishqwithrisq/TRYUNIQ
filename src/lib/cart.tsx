import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
type Cart = Record<string, number>;
type Ctx = { cart: Cart; add: (slug: string) => void; setQty: (slug: string, q: number) => void; count: number; drawerOpen: boolean; setDrawerOpen: (v: boolean) => void; searchOpen: boolean; setSearchOpen: (v: boolean) => void };
const CartContext = createContext<Ctx | null>(null);
export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart>({});
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  useEffect(() => { try { setCart(JSON.parse(localStorage.getItem("tryuniq-cart") || "{}")); } catch { /* ignore */ } }, []);
  const save = (c: Cart) => { setCart(c); localStorage.setItem("tryuniq-cart", JSON.stringify(c)); };
  const add = (slug: string) => save({ ...cart, [slug]: (cart[slug] ?? 0) + 1 });
  const setQty = (slug: string, q: number) => { const c = { ...cart }; if (q <= 0) delete c[slug]; else c[slug] = q; save(c); };
  const count = Object.values(cart).reduce((a, b) => a + b, 0);
  return <CartContext.Provider value={{ cart, add, setQty, count, drawerOpen, setDrawerOpen, searchOpen, setSearchOpen }}>{children}</CartContext.Provider>;
}
export function useCart() { const c = useContext(CartContext); if (!c) throw new Error("no cart"); return c; }
