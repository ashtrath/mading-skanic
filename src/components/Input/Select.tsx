import { useEffect, useRef, useState } from "react";
import { MaterialSymbol } from "react-material-symbols";
import { useClickOutside } from "~/utils";

type SelectProps = {
  name: string;
  label?: string;
  options:
    | {
        label: string;
        value: string;
      }[]
    | undefined;
  defaultText: string;
  onChange: (value: { label: string; value: string }) => void;
};

type OptionProps = {
  status: boolean;
  selected: string;
  options:
    | {
        label: string;
        value: string;
      }[]
    | undefined;
};

const Select = ({
  name,
  label,
  options,
  defaultText,
  onChange,
}: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const controlRef = useRef<HTMLDivElement | null>(null);
  const selectRef = useRef<HTMLDivElement | null>(null);

  useClickOutside(() => setIsOpen(false), [controlRef, selectRef]);

  const [select, setSelect] = useState<OptionProps>({
    status: false,
    selected: defaultText,
    options,
  });

  useEffect(() => {
    setSelect((prev) => ({
      ...prev,
      selected: defaultText,
      options: options?.map((e) => ({ ...e, value: e.value })),
    }));
  }, [defaultText]);

  return (
    <>
      {label && (
        <label htmlFor={name} className="font-mono text-sm uppercase">
          {label}
        </label>
      )}
      <div
        onClick={() => setIsOpen(!isOpen)}
        ref={controlRef}
        className={`relative flex w-full min-w-[130px] cursor-pointer select-none items-center justify-between border border-mono-black bg-mono-white p-2.5 text-lg text-mono-black outline-none md:min-w-[180px] ${isOpen ? "border-b-0" : ""}`}
      >
        <span className="mb-0 text-sm">{select.selected}</span>
        <MaterialSymbol
          icon="expand_more"
          fill={false}
          weight={200}
          grade={0}
          size={24}
        />

        {isOpen && (
          <div
            ref={selectRef}
            className="scroll-area absolute left-0 top-full z-20 max-h-[300px] w-full overflow-y-auto border border-t-0 border-mono-black bg-mono-white text-left"
          >
            {select.options?.map((option, index) => {
              return (
                <button
                  key={index}
                  onClick={() => {
                    setSelect({
                      ...select,
                      selected: option.label,
                      status: false,
                    });
                    onChange(option);
                    setIsOpen(false);
                  }}
                  className="w-full p-2.5 text-left text-sm text-mono-black hover:bg-gray-100"
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default Select;
