type HeadingProps = {
  title: string;
};

const Heading = ({ title }: HeadingProps) => {
  return (
    <header className="flex items-center justify-between">
      <h2 className="font-mono text-xl font-bold text-mono-black">{title}</h2>
      <div className="flex items-center gap-2">
        <button>Filter</button>
        <button>Search</button>
        <button>Sort by</button>
      </div>
    </header>
  );
};

export default Heading;
