import { MaterialSymbol } from "react-material-symbols";
import Input from "../Input/Input";

type HeadingProps = {
  title: string;
};

const Heading = ({ title }: HeadingProps) => {
  return (
    <header className="flex items-center justify-between">
      <h2 className="font-mono text-xl font-bold text-mono-black">{title}</h2>
      <div className="flex items-center gap-2">
        <button className="flex items-center gap-2 border border-mono-black bg-mono-white p-2 text-sm text-mono-black">
          <MaterialSymbol
            icon="tune"
            fill={false}
            weight={200}
            grade={0}
            size={24}
          />
          Filter
        </button>
        <label htmlFor="search" className="flex items-center gap-2 border max-w-[200px] border-mono-black bg-mono-white p-2 focus-within:border-x-2">
          <MaterialSymbol
            icon="search"
            fill={false}
            weight={200}
            grade={0}
            size={24}
          />
          <Input
            type="text"
            name="search"
            value=""
            onChange={() => {
              "as";
            }}
            placeholder="Search..."
            className="!border-none !bg-transparent !p-0"
          />
        </label>
      </div>
    </header>
  );
};

export default Heading;
