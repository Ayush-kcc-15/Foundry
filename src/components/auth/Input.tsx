import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface FieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  error?: string;
  leftIcon?: ReactNode;
  rightSlot?: ReactNode;
}

export const AuthInput = forwardRef<HTMLInputElement, FieldProps>(function AuthInput(
  { label, hint, error, leftIcon, rightSlot, className, id, ...props },
  ref,
) {
  const inputId = id || props.name;
  return (
    <div className="space-y-1.5">
      {label && (
        <label htmlFor={inputId} className="block text-xs font-medium text-muted-foreground">
          {label}
        </label>
      )}
      <div
        className={cn(
          "group relative flex items-center rounded-xl bg-surface/70 border transition",
          error
            ? "border-destructive/60 focus-within:border-destructive"
            : "border-border/60 focus-within:border-primary/60 focus-within:ring-2 focus-within:ring-primary/20",
        )}
      >
        {leftIcon && (
          <span className="pl-3.5 text-muted-foreground group-focus-within:text-primary transition-colors">
            {leftIcon}
          </span>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            "flex-1 bg-transparent px-3.5 py-2.5 text-sm placeholder:text-muted-foreground/70 focus:outline-none",
            leftIcon && "pl-2.5",
            className,
          )}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
          {...props}
        />
        {rightSlot && <span className="pr-2">{rightSlot}</span>}
      </div>
      {error ? (
        <p id={`${inputId}-error`} className="text-xs text-destructive">
          {error}
        </p>
      ) : hint ? (
        <p id={`${inputId}-hint`} className="text-xs text-muted-foreground">
          {hint}
        </p>
      ) : null}
    </div>
  );
});
