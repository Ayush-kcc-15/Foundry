import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { AuthLayout } from "@/layouts/AuthLayout";
import { Button } from "@/components/common";
import { AuthCard, AuthInput, SuccessScreen } from "@/components/auth";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/forgot-password")({
  component: ForgotPassword,
  head: () => ({ meta: [{ title: "Forgot password — Foundry" }] }),
});

function ForgotPassword() {
  const [sent, setSent] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setLoading(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    setSent(true);
  }

  if (sent) {
    return (
      <AuthLayout>
        <AuthCard title="Reset link sent">
          <SuccessScreen
            title="Check your email"
            description="If an account exists for that address, we've sent instructions to reset your password."
            action={
              <Link
                to="/login"
                className="inline-flex items-center gap-2 text-sm text-primary hover:text-highlight font-medium"
              >
                <ArrowLeft className="h-4 w-4" /> Back to login
              </Link>
            }
          />
        </AuthCard>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      <AuthCard
        title="Forgot password?"
        subtitle="Enter your email and we'll send you a reset link."
        footer={
          <Link
            to="/login"
            className="inline-flex items-center gap-1.5 text-primary hover:text-highlight font-medium"
          >
            <ArrowLeft className="h-4 w-4" /> Back to login
          </Link>
        }
      >
        <form className="space-y-4" onSubmit={submit}>
          <AuthInput
            name="email"
            type="email"
            label="Email"
            placeholder="you@company.com"
            leftIcon={<Mail className="h-4 w-4" />}
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button type="submit" className="w-full" size="lg" disabled={loading || !email}>
            {loading ? "Sending…" : "Send reset link"}
          </Button>
        </form>
      </AuthCard>
    </AuthLayout>
  );
}
