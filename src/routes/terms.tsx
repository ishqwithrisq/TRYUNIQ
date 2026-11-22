import { createFileRoute } from "@tanstack/react-router";
import { PolicyPage } from "@/components/PolicyPage";
export const Route = createFileRoute("/terms")({
  head: () => ({ meta: [
    { title: "Terms & Conditions — TRYUNIQ" },
    { name: "description", content: "Terms for using the TRYUNIQ website and buying our products." },
    { property: "og:title", content: "Terms & Conditions — TRYUNIQ" },
    { property: "og:description", content: "Terms for using the TRYUNIQ website and buying our products." },
  ] }),
  component: () => <PolicyPage title="Terms & Conditions" sections={[["Use of the site", "By using this website you agree to these terms. Product images are for illustration; actual products may vary slightly."], ["Pricing", "All prices are in Indian Rupees (₹) and may change without notice."], ["Product use", "Our fragrances are for external use only. Do a patch test before use and avoid contact with eyes."]]} />,
});
