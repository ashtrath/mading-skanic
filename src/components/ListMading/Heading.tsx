import { MaterialSymbol } from "react-material-symbols";
import Input from "../Input/Input";
import { Dropdown, DropdownItem } from "../ui/Dropdown";

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
        <Input
          type="text"
          name="search"
          value=""
          onChange={() => {"as"}}
          placeholder="Search..."
          className="max-w-[200px]"
        />
        <Dropdown title="Sort by" className="bg-mono-white !text-mono-black border border-mono-black">
          <DropdownItem>Sort 1</DropdownItem>
          <DropdownItem>Sort 2</DropdownItem>
          <DropdownItem>Sort 3</DropdownItem>
        </Dropdown>
      </div>
    </header>
  );
};

export default Heading;
