import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Mail, User } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { AuthLayout } from "@/layouts/AuthLayout";
import { Button } from "@/components/common";
import {
  AuthCard,
  AuthInput,
  PasswordInput,
  SocialButton,
  GoogleIcon,
  Divider,
} from "@/components/auth";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";

export const Route = createFileRoute("/register")({
  component: Register,
  head: () => ({ meta: [{ title: "Create account — Foundry" }] }),
});

function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [loading, setLoading] = useState(false);

  const mismatch = confirm.length > 0 && confirm !== password;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (mismatch || password.length < 8) return;
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: window.location.origin,
        data: { full_name: name },
      },
    });
    setLoading(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Account created");
    navigate({ to: "/dashboard" });
  }

  async function google() {
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    if (result.error) {
      toast.error(result.error.message ?? "Google sign-in failed");
      return;
    }
    if (result.redirected) return;
    navigate({ to: "/dashboard" });
  }

  return (
    <AuthLayout>
      <AuthCard
        title="Create your workspace"
        subtitle="Start shaping something great with Foundry."
        footer={
          <>
            Already have an account?{" "}
            <Link to="/login" className="text-primary hover:text-highlight font-medium">
              Sign in
            </Link>
          </>
        }
      >
        <form className="space-y-4" onSubmit={submit}>
          <AuthInput
            name="name"
            label="Full name"
            placeholder="Elena Marquez"
            leftIcon={<User className="h-4 w-4" />}
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
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
          <PasswordInput
            name="password"
            label="Password"
            placeholder="At least 8 characters"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            showStrength
            required
          />
          <PasswordInput
            name="confirm"
            label="Confirm password"
            placeholder="Re-enter password"
            autoComplete="new-password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            error={mismatch ? "Passwords don't match" : undefined}
            required
          />

          <label className="flex items-start gap-2.5 text-xs text-muted-foreground cursor-pointer">
            <input
              type="checkbox"
              className="mt-0.5 h-4 w-4 rounded border-border/60 bg-surface accent-primary"
              checked={accepted}
              onChange={(e) => setAccepted(e.target.checked)}
            />
            <span>
              I agree to the{" "}
              <a href="#" className="text-primary hover:text-highlight">Terms of Service</a> and{" "}
              <a href="#" className="text-primary hover:text-highlight">Privacy Policy</a>.
            </span>
          </label>

          <Button
            type="submit"
            className="w-full"
            size="lg"
            disabled={!accepted || mismatch || password.length < 8 || loading}
          >
            {loading ? "Creating account…" : "Create account"}
          </Button>
        </form>

        <Divider />

        <SocialButton icon={<GoogleIcon />} provider="Google" onClick={google} />
      </AuthCard>
    </AuthLayout>
  );
}
