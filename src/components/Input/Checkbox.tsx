import { useState } from "react";
import { MaterialSymbol } from "react-material-symbols";

type CheckboxProps = {
  name: string;
  label: string;
  disabled?: boolean;
  required?: boolean;
  checked: boolean | undefined;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  autoFocus?: boolean;
  className?: string;
};

const Checkbox = ({
  name,
  label,
  disabled = false,
  required = true,
  checked,
  onChange,
  autoFocus = false,
  className = "",
}: CheckboxProps) => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <label htmlFor={name} className="group flex items-center gap-2 text-sm">
      <input
        type="checkbox"
        id={name}
        disabled={disabled}
        required={required}
        checked={checked}
        autoComplete="off"
        autoFocus={autoFocus}
        onChange={() => {
          setIsChecked(!isChecked);
          onChange;
        }}
      />
      <MaterialSymbol
        icon="close"
        fill={false}
        weight={200}
        grade={0}
        size={24}
        className={`grid size-5 place-content-center border border-mono-black transition-colors group-hover:text-mono-black ${isChecked ? "bg-mono-black !text-mono-white duration-100 ease-in-expo" : "bg-mono-white text-transparent duration-150 ease-out-expo"} ${className}`}
      />
      {label}
    </label>
  );
};

export default Checkbox;
