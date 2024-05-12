type TextAreaProps = {
  name: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  value: string | undefined;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  className?: string;
};

const TextArea = ({
  name,
  label,
  placeholder = "",
  disabled = false,
  required = true,
  value,
  onChange,
  className = "",
}: TextAreaProps) => {
  return (
    <>
      {label && (
        <label htmlFor={name} className="font-mono text-sm uppercase">
          {label}
        </label>
      )}
      <textarea
        id={name}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        autoComplete="off"
        value={value}
        onChange={onChange}
        className={`border-mono-black bg-mono-white p-2.5 text-sm text-mono-black focus:border-x-2 focus:border-mono-black focus:ring-0 ${className}`}
      />
    </>
  );
};

export default TextArea;
