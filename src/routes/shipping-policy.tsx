import { createFileRoute } from "@tanstack/react-router";
import { PolicyPage } from "@/components/PolicyPage";
export const Route = createFileRoute("/shipping-policy")({
  head: () => ({ meta: [
    { title: "Shipping Policy — TRYUNIQ" },
    { name: "description", content: "How and when TRYUNIQ orders are shipped." },
    { property: "og:title", content: "Shipping Policy — TRYUNIQ" },
    { property: "og:description", content: "How and when TRYUNIQ orders are shipped." },
  ] }),
  component: () => <PolicyPage title="Shipping Policy" sections={[["Processing", "Orders are usually processed within 1–2 business days."], ["Delivery", "Delivery across India typically takes 3–7 business days depending on your location."], ["Tracking", "Once shipped, you will receive tracking details by SMS, WhatsApp or email."]]} />,
});
