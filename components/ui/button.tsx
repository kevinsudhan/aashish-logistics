import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Square-ish, restrained buttons — 2px radius only. No pills, no shadows,
 * no gradients. Motion is limited to colour and a 150ms arrow shift.
 */
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[2px] text-sm font-medium transition-colors duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-navy-900 text-white hover:bg-navy-700 active:bg-navy-800",
        accent:
          "bg-accent text-white hover:bg-accent-hover active:bg-accent-hover",
        outline:
          "border border-rule-strong bg-transparent text-navy-900 hover:border-navy-900 hover:bg-navy-900 hover:text-white",
        subtle:
          "border border-transparent bg-bone text-navy-900 hover:bg-bone-deep",
        ghost: "text-navy-900 hover:bg-bone",
        /** Inverted for use over dark media overlays. */
        inverse:
          "bg-white text-navy-900 hover:bg-navy-50 active:bg-navy-100",
        link: "h-auto p-0 text-accent underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-9 px-4",
        md: "h-11 px-6",
        lg: "h-[52px] px-8 text-[0.9375rem]",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
