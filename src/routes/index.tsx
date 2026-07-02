import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/layouts/AppLayout";
import {
  Hero,
  TrustedBy,
  PlatformStats,
  ProductPreview,
  Features,
  WorkflowTimeline,
  AIShowcase,
  Collaboration,
  Integrations,
  Testimonials,
  Pricing,
  FAQ,
  CTA,
} from "@/components/landing";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <AppLayout>
      <Hero />
      <TrustedBy />
      <PlatformStats />
      <ProductPreview />
      <Features />
      <WorkflowTimeline />
      <AIShowcase />
      <Collaboration />
      <Integrations />
      <Testimonials />
      <Pricing />
      <FAQ />
      <CTA />
    </AppLayout>
  );
}
