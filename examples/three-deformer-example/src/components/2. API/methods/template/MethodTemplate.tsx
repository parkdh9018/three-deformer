type Props = {
  functionName: string;
  title: string;
  children: React.ReactNode;
};

export const MethodTemplate = ({ functionName, title, children }: Props) => {
  return (
    <div id={functionName} className="mb-10 scroll-mt-20">
      <div className="mb-1">
        <a
          href={`#${functionName}`}
          className="link-hover link-info text-lg font-semibold"
        >
          {title}
        </a>
      </div>
      {children}
    </div>
  );
};
