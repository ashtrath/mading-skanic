import { cva } from "class-variance-authority";
import { type ButtonHTMLAttributes, type ReactNode } from "react";

type ButtonVariantProps = {
  intent?: "primary" | "secondary" | "warning" | "danger";
  size?: "normal" | "small";
};

type ButtonProps = ButtonVariantProps & {
  className?: string;
  hoverEffect?: boolean;
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

type ButtonVariantFunction = (props: ButtonVariantProps) => string;

export const buttonVariants: ButtonVariantFunction = cva(
  "text-sm font-mono border",
  {
    variants: {
      intent: {
        primary: "bg-mono-black text-mono-white border-mono-black",
        secondary: "bg-mono-white text-mono-black border-mono-black",
        warning: "bg-mono-white text-mono-black border-mono-black",
        danger: "bg-mono-white text-mono-black border-mono-black",
      },
      size: {
        normal: "py-3 px-11",
        small: "py-3 px-8",
      },
    },

    defaultVariants: {
      intent: "primary",
      size: "normal",
    },
  },
);

const Button = ({
  intent,
  size,
  className,
  hoverEffect = true,
  children,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={`${buttonVariants({ intent, size })} ${className} ${hoverEffect ? "no-underline underline-offset-4 hover:underline" : ""}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
