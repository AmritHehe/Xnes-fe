import * as React from "react";
import { cn } from "../../lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "danger" | "success" | "outline" | "ghost";
    size?: "sm" | "md" | "lg" | "icon";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", size = "md", ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={cn(
                    "inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
                    "active:translate-y-[1px]", // Subtle click feedback
                    {
                        "bg-primary text-primary-foreground hover:opacity-90": variant === "primary",
                        "bg-secondary text-secondary-foreground hover:bg-secondary/80": variant === "secondary",
                        "bg-destructive text-destructive-foreground hover:opacity-90": variant === "danger",
                        "bg-up text-black hover:opacity-90": variant === "success", // Using Theme Var for Success (Green)
                        "border border-input bg-transparent hover:bg-secondary hover:text-accent-foreground": variant === "outline",
                        "hover:bg-secondary hover:text-accent-foreground": variant === "ghost",
                        "h-7 px-3 text-xs uppercase tracking-wider": size === "sm",
                        "h-9 px-4 py-2 text-sm uppercase tracking-wide": size === "md",
                        "h-11 px-6 text-base": size === "lg",
                        "h-9 w-9": size === "icon",
                    },
                    className
                )}
                {...props}
            />
        );
    }
);
Button.displayName = "Button";
