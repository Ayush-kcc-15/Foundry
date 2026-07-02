import { createFileRoute, Link } from "@tanstack/react-router";
import { Hash } from "lucide-react";
import { AuthLayout } from "@/layouts/AuthLayout";
import { Button } from "@/components/common";
import { AuthCard, AuthInput } from "@/components/auth";

export const Route = createFileRoute("/join-workspace")({
  component: JoinWorkspace,
  head: () => ({ meta: [{ title: "Join workspace — Foundry" }] }),
});

function JoinWorkspace() {
  return (
    <AuthLayout>
      <AuthCard
        title="Join a workspace"
        subtitle="Enter your invite code or paste the invitation link."
        footer={
          <>
            Want to create your own?{" "}
            <Link to="/onboarding" className="text-primary hover:text-highlight font-medium">
              Create workspace
            </Link>
          </>
        }
      >
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <AuthInput
            name="code"
            label="Invite code"
            placeholder="foundry-xxxx-xxxx"
            leftIcon={<Hash className="h-4 w-4" />}
            required
          />
          <Button type="submit" className="w-full" size="lg">
            Join workspace
          </Button>
        </form>
      </AuthCard>
    </AuthLayout>
  );
}
