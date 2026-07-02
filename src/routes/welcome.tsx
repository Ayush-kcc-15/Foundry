import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { AuthLayout } from "@/layouts/AuthLayout";
import { Button } from "@/components/common";
import { AuthCard, SuccessScreen } from "@/components/auth";

export const Route = createFileRoute("/welcome")({
  component: Welcome,
  head: () => ({ meta: [{ title: "Welcome — Foundry" }] }),
});

function Welcome() {
  return (
    <AuthLayout>
      <AuthCard title="You're in">
        <SuccessScreen
          title="Your workspace is ready!"
          description="Everything is set up. Jump into your dashboard to start building with your team."
          action={
            <Link to="/dashboard">
              <Button size="lg" rightIcon={<ArrowRight className="h-4 w-4" />}>
                Go to Dashboard
              </Button>
            </Link>
          }
        />
      </AuthCard>
    </AuthLayout>
  );
}
