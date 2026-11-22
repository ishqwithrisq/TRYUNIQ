import { createFileRoute } from "@tanstack/react-router";
import { PolicyPage } from "@/components/PolicyPage";
export const Route = createFileRoute("/privacy-policy")({
  head: () => ({ meta: [
    { title: "Privacy Policy — TRYUNIQ" },
    { name: "description", content: "How TRYUNIQ collects and uses your information." },
    { property: "og:title", content: "Privacy Policy — TRYUNIQ" },
    { property: "og:description", content: "How TRYUNIQ collects and uses your information." },
  ] }),
  component: () => <PolicyPage title="Privacy Policy" sections={[["Information we collect", "We collect the details you share with us — such as your name, mobile number, email and delivery address — when you place an order or contact us."], ["How we use it", "Your information is used only to process orders, deliver products, answer your queries and, if you subscribe, send you updates."], ["Sharing", "We never sell your personal data. We share it only with delivery partners as needed to fulfil your order."]]} />,
});
