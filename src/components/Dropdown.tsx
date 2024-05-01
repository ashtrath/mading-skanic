import { useRef, useState, type ReactNode } from "react";
import { MaterialSymbol } from "react-material-symbols";

type DropdownProps = {
  title: string | null | undefined;
  children: ReactNode;
  className?: string;
};

type DropdownItemProps = {
  children: ReactNode;
};

const Dropdown = ({ title, children, className }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      ref={dropdownRef}
      className="flex w-36 flex-col items-center justify-center"
    >
      <button
        onClick={toggleOpen}
        className={`flex h-auto min-h-10 w-full items-center justify-between break-words bg-mono-black px-4 py-2 font-mono text-mono-white ${className}`}
      >
        {title}
        <MaterialSymbol
          icon="arrow_drop_down"
          fill={false}
          weight={200}
          grade={0}
          size={24}
          className={`transition-transform ${isOpen ? "ease-in-expo rotate-180 duration-200" : "ease-out-expo rotate-0 duration-150"}`}
        />
      </button>

      <div className="relative">
        <ul
          className={`absolute -left-[4.5rem] z-20 mt-2 w-36 overflow-hidden border border-mono-black bg-mono-white transition-all duration-200 ease-in-out ${isOpen ? "h-auto shadow-md" : "invisible h-0 shadow-none"}`}
        >
          {children}
        </ul>
      </div>
    </div>
  );
};

const DropdownItem = ({ children }: DropdownItemProps) => {
  return (
    <li className="h-auto cursor-pointer select-none break-words p-2">
      {children}
    </li>
  );
};

export { Dropdown, DropdownItem };
