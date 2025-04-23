import { Link } from 'react-router-dom';
type Props = {
  functionName: string;
  colorName?: string;
};
export const ApiLink = ({ functionName, colorName = 'primary' }: Props) => {
  return (
    <Link
      className={`link  link-hover link-${colorName}`}
      to={`/api#${functionName}`}
    >
      <code className="px-1">{functionName}()</code>
    </Link>
  );
};
