import { MaterialSymbol, type SymbolCodepoints } from "react-material-symbols";

type AnalyticsCardProps = {
  icon: SymbolCodepoints;
  counter: number | undefined;
  description: string;
  className?: string;
};

const AnalyticsCard = ({
  icon,
  counter = 0,
  description,
  className,
}: AnalyticsCardProps) => {
  return (
    <div
      className={`flex items-center gap-4 border border-mono-black bg-mono-white px-8 py-4 ${className}`}
    >
      <div className="grid size-fit place-items-center rounded-full bg-mono-black p-2.5 text-mono-white">
        <MaterialSymbol
          icon={icon}
          fill={true}
          weight={200}
          grade={0}
          size={24}
        />
      </div>
      <div className="text-mono-black">
        <h3 className="font-mono text-lg font-semibold">{counter}</h3>
        <p className="text-nowrap text-sm">{description}</p>
      </div>
    </div>
  );
};

export default AnalyticsCard;
