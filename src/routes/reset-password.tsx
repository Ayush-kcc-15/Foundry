import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { AuthLayout } from "@/layouts/AuthLayout";
import { Button } from "@/components/common";
import { AuthCard, PasswordInput } from "@/components/auth";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/reset-password")({
  component: ResetPassword,
  head: () => ({ meta: [{ title: "Reset password — Foundry" }] }),
});

function ResetPassword() {
  const navigate = useNavigate();
  const [pw, setPw] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Supabase parses the recovery hash automatically; wait for session.
    const { data: sub } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY" || event === "SIGNED_IN") setReady(true);
    });
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) setReady(true);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  const mismatch = confirm.length > 0 && confirm !== pw;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (mismatch || pw.length < 8) return;
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password: pw });
    setLoading(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Password updated");
    navigate({ to: "/dashboard" });
  }

  return (
    <AuthLayout>
      <AuthCard title="Set a new password" subtitle="Choose a strong password you'll remember.">
        <form className="space-y-4" onSubmit={submit}>
          <PasswordInput
            label="New password"
            placeholder="At least 8 characters"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            showStrength
            required
          />
          <PasswordInput
            label="Confirm password"
            placeholder="Re-enter password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            error={mismatch ? "Passwords don't match" : undefined}
            required
          />
          <Button
            type="submit"
            className="w-full"
            size="lg"
            disabled={loading || !ready || mismatch || pw.length < 8}
          >
            {loading ? "Updating…" : "Update password"}
          </Button>
          {!ready && (
            <p className="text-xs text-muted-foreground text-center">
              Open this page from the reset link in your email.
            </p>
          )}
        </form>
      </AuthCard>
    </AuthLayout>
  );
}
