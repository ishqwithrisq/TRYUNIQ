import { createFileRoute } from "@tanstack/react-router";
import { PolicyPage } from "@/components/PolicyPage";
export const Route = createFileRoute("/returns-policy")({
  head: () => ({ meta: [
    { title: "Returns Policy — TRYUNIQ" },
    { name: "description", content: "TRYUNIQ returns and replacements." },
    { property: "og:title", content: "Returns Policy — TRYUNIQ" },
    { property: "og:description", content: "TRYUNIQ returns and replacements." },
  ] }),
  component: () => <PolicyPage title="Returns Policy" sections={[["Damaged items", "If your order arrives damaged or incorrect, contact us within 48 hours of delivery with photos and we will arrange a replacement."], ["Opened products", "For hygiene reasons, opened or used fragrances cannot be returned."], ["Refunds", "Approved refunds are processed to the original payment method within 5–7 business days."]]} />,
});
