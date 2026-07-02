import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Mail, ArrowRight } from "lucide-react";
import { AuthLayout } from "@/layouts/AuthLayout";
import { Button } from "@/components/common";
import { AuthCard } from "@/components/auth";

export const Route = createFileRoute("/verify-email")({
  component: VerifyEmail,
  head: () => ({ meta: [{ title: "Verify email — Foundry" }] }),
});

function VerifyEmail() {
  const navigate = useNavigate();

  return (
    <AuthLayout>
      <AuthCard title="Verify your email">
        <div className="flex flex-col items-center text-center">
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="relative grid h-24 w-24 place-items-center rounded-3xl bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30 shadow-glow"
          >
            <Mail className="h-10 w-10 text-primary" />
            <motion.span
              initial={{ scale: 1, opacity: 0.4 }}
              animate={{ scale: 1.4, opacity: 0 }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 rounded-3xl border-2 border-primary/40"
            />
          </motion.div>

          <p className="mt-5 text-sm text-muted-foreground max-w-sm">
            Check your inbox to verify your email. We've sent a confirmation link — click it to activate your Foundry account.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row gap-2.5 w-full">
            <Button variant="outline" className="flex-1">
              Resend email
            </Button>
            <Button
              className="flex-1"
              rightIcon={<ArrowRight className="h-4 w-4" />}
              onClick={() => navigate({ to: "/onboarding" })}
            >
              Continue
            </Button>
          </div>

          <Link
            to="/login"
            className="mt-5 text-xs text-muted-foreground hover:text-foreground"
          >
            Back to login
          </Link>
        </div>
      </AuthCard>
    </AuthLayout>
  );
}
