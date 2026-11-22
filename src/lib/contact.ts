export const CONTACT = {
  phone: "+91 84339 77405",
  phoneRaw: "918433977405",
  email: "tryuniqcosmetic@gmail.com",
  address: "Pune, Maharashtra, India",
};
export const whatsappLink = (text = "Hi TRYUNIQ!") => `https://wa.me/${CONTACT.phoneRaw}?text=${encodeURIComponent(text)}`;
