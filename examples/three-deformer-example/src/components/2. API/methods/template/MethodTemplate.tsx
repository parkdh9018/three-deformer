import { useLocation } from 'react-router-dom';

type Props = {
  functionName: string;
  title: string;
  children: React.ReactNode;
};

export const MethodTemplate = ({ functionName, title, children }: Props) => {
  const location = useLocation();
  const hash = location.hash;
  const isActive = hash === `#${functionName}`;

  return (
    <div className="mb-10 scroll-mt-20">
      <div className="mb-1">
        <a
          id={functionName}
          href={`#${functionName}`}
          className={
            'link-hover link-info text-lg font-semibold' +
            (isActive ? ' text-success' : '')
          }
        >
          {title}
        </a>
      </div>
      {children}
    </div>
  );
};
