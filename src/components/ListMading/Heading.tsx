type HeadingProps = {
  title: string;
};

const Heading = ({ title }: HeadingProps) => {
  return (
    <header className="flex items-center justify-between">
      <h2 className="font-mono text-xl text-mono-black">{title}</h2>
    </header>
  );
};

export default Heading;
