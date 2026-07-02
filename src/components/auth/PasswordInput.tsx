import { forwardRef, useState, type InputHTMLAttributes } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";
import { AuthInput } from "./Input";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  error?: string;
  showStrength?: boolean;
}

function scorePassword(pw: string) {
  let score = 0;
  if (!pw) return 0;
  if (pw.length >= 8) score++;
  if (pw.length >= 12) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  return Math.min(score, 4);
}

const labels = ["Too weak", "Weak", "Fair", "Good", "Strong"];
const colors = ["bg-destructive", "bg-destructive", "bg-warning", "bg-primary", "bg-success"];

export const PasswordInput = forwardRef<HTMLInputElement, Props>(function PasswordInput(
  { showStrength, value, ...props },
  ref,
) {
  const [show, setShow] = useState(false);
  const score = showStrength ? scorePassword(String(value ?? "")) : 0;

  return (
    <div className="space-y-2">
      <AuthInput
        ref={ref}
        type={show ? "text" : "password"}
        leftIcon={<Lock className="h-4 w-4" />}
        value={value}
        rightSlot={
          <button
            type="button"
            onClick={() => setShow((s) => !s)}
            className="grid h-8 w-8 place-items-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/5 transition"
            aria-label={show ? "Hide password" : "Show password"}
          >
            {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        }
        {...props}
      />
      {showStrength && (
        <div className="space-y-1">
          <div className="flex gap-1">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className={`h-1 flex-1 rounded-full transition-colors ${
                  score > i ? colors[score] : "bg-border/60"
                }`}
              />
            ))}
          </div>
          <p className="text-[11px] text-muted-foreground">
            Strength: <span className="text-foreground">{labels[score]}</span>
          </p>
        </div>
      )}
    </div>
  );
});
