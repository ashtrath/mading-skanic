import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";
import { MaterialSymbol } from "react-material-symbols";

type DropdownProps = {
  title: string | null | undefined;
  children: ReactNode;
  className?: string;
};

type DropdownItemProps = {
  children: ReactNode;
};

interface IDropdownContext {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const DropdownContext = createContext<IDropdownContext>({
  isOpen: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setIsOpen: () => {},
});

const Dropdown = ({ title, children, className }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside: EventListener = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    window.addEventListener("mouseup", handleClickOutside);
    window.addEventListener("touchend", handleClickOutside);

    // Clean Up
    return () => {
      window.removeEventListener("mouseup", handleClickOutside);
      window.removeEventListener("touchend", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <DropdownContext.Provider value={{ isOpen, setIsOpen }}>
      <div
        ref={dropdownRef}
        className="flex w-36 flex-col items-center justify-center"
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`flex h-auto min-h-10 w-full items-center justify-between break-words bg-mono-black px-4 py-2 font-mono text-mono-white ${className}`}
        >
          {title}
          <MaterialSymbol
            icon="arrow_drop_down"
            fill={false}
            weight={200}
            grade={0}
            size={24}
            className={`transition-transform ${isOpen ? "rotate-180 duration-200 ease-out-expo" : "rotate-0 duration-150 ease-in-expo"}`}
          />
        </button>
        <div className="relative">
          <ul
            className={`absolute -left-[4.5rem] z-20 mt-2 w-36 overflow-hidden border border-mono-black bg-mono-white transition-all ${isOpen ? "visible scale-100 duration-100 ease-out-expo" : "invisible scale-95 duration-75 ease-in-expo"}`}
          >
            {children}
          </ul>
        </div>
      </div>
    </DropdownContext.Provider>
  );
};

const DropdownItem = ({ children }: DropdownItemProps) => {
  const { isOpen, setIsOpen } = useContext(DropdownContext);

  return (
    <li
      className="h-auto cursor-pointer select-none break-words p-2"
      onClick={() => setIsOpen(!isOpen)}
    >
      {children}
    </li>
  );
};

export { Dropdown, DropdownItem };
