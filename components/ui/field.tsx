import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Form primitives in the shadcn/ui idiom: boxed inputs with a soft radius,
 * bold sentence-case labels, and a clear focus ring.
 */

const fieldBase =
  "w-full rounded-lg border border-rule-strong bg-paper px-4 py-3 text-[0.9375rem] text-ink placeholder:text-faint/90 transition-[border-color,box-shadow] duration-200 hover:border-navy-300 focus:border-navy-900 focus:outline-none focus:ring-4 focus:ring-navy-900/10 disabled:cursor-not-allowed disabled:opacity-50";

export const Label = React.forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement> & { required?: boolean }
>(({ className, children, required, ...props }, ref) => (
  <label
    ref={ref}
    className={cn("block text-sm font-semibold text-navy-900", className)}
    {...props}
  >
    {children}
    {required ? (
      <span className="ml-1 text-accent" aria-hidden>
        *
      </span>
    ) : null}
  </label>
));
Label.displayName = "Label";

export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, type = "text", ...props }, ref) => (
  <input ref={ref} type={type} className={cn(fieldBase, className)} {...props} />
));
Input.displayName = "Input";

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(fieldBase, "min-h-28 resize-y", className)}
    {...props}
  />
));
Textarea.displayName = "Textarea";

export const Select = React.forwardRef<
  HTMLSelectElement,
  React.SelectHTMLAttributes<HTMLSelectElement>
>(({ className, children, ...props }, ref) => (
  <div className="relative">
    <select
      ref={ref}
      className={cn(fieldBase, "cursor-pointer appearance-none pr-10", className)}
      {...props}
    >
      {children}
    </select>
    <svg
      aria-hidden
      viewBox="0 0 12 8"
      className="pointer-events-none absolute right-4 top-1/2 h-2 w-3 -translate-y-1/2 text-muted"
    >
      <path
        d="M1 1.5 6 6.5 11 1.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  </div>
));
Select.displayName = "Select";

/** Wraps a label + control pair with consistent vertical rhythm. */
export function Field({
  label,
  htmlFor,
  required,
  className,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("space-y-2", className)}>
      <Label htmlFor={htmlFor} required={required}>
        {label}
      </Label>
      {children}
    </div>
  );
}
