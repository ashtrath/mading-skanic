import { cva } from "class-variance-authority";
import { MaterialSymbol, type SymbolCodepoints } from "react-material-symbols";

type BadgeVariantsProps = {
  intent?: "primary" | "secondary";
};

type BadgeProps = BadgeVariantsProps & {
  icon?: SymbolCodepoints;
  text: string;
  className?: string;
};

type BadgeVariantFunction = (props: BadgeVariantsProps) => string;

const badgeVariants: BadgeVariantFunction = cva(
  "flex w-fit items-center gap-1 rounded-full px-4 py-1",
  {
    variants: {
      intent: {
        primary: "bg-mono-black text-mono-white",
        secondary: "bg-mono-white text-mono-black",
      },
    },

    defaultVariants: {
      intent: "primary",
    },
  },
);

const Badge = ({ intent, icon, text, className }: BadgeProps) => {
  return (
    <div className={`${badgeVariants({ intent })} ${className}`}>
      {icon && (
        <MaterialSymbol
          icon={icon}
          fill={false}
          weight={200}
          grade={0}
          size={18}
        />
      )}
      <span className="text-xs uppercase">{text}</span>
    </div>
  );
};

export default Badge;
