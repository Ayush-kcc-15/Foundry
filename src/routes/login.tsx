import { createFileRoute, Link, useNavigate, useSearch } from "@tanstack/react-router";
import { Mail } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
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

const searchSchema = z.object({ redirect: z.string().optional() });

export const Route = createFileRoute("/login")({
  component: Login,
  validateSearch: searchSchema,
  head: () => ({ meta: [{ title: "Login — Foundry" }] }),
});

function Login() {
  const navigate = useNavigate();
  const search = useSearch({ from: "/login" });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const goNext = () => {
    const dest = search.redirect && search.redirect.startsWith("/") ? search.redirect : "/dashboard";
    navigate({ to: dest });
  };

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Welcome back");
    goNext();
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
    goNext();
  }

  return (
    <AuthLayout>
      <AuthCard
        title="Welcome back"
        subtitle="Sign in to continue to your Foundry workspace."
        footer={
          <>
            New to Foundry?{" "}
            <Link to="/register" className="text-primary hover:text-highlight font-medium">
              Create an account
            </Link>
          </>
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
          <PasswordInput
            name="password"
            label="Password"
            placeholder="••••••••"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className="flex items-center justify-end text-xs">
            <Link
              to="/forgot-password"
              className="text-primary hover:text-highlight font-medium"
            >
              Forgot password?
            </Link>
          </div>

          <Button type="submit" className="w-full" size="lg" disabled={loading}>
            {loading ? "Signing in…" : "Sign in"}
          </Button>
        </form>

        <Divider />

        <SocialButton icon={<GoogleIcon />} provider="Google" onClick={google} />
      </AuthCard>
    </AuthLayout>
  );
}
