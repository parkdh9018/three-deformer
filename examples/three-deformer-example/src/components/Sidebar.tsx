import { deformerTypeList } from '../types/deformerType';
import { capitalizeFirstLetter } from '../utils';
import { Link } from 'react-router-dom';

export const Sidebar = () => {
  return (
    <div>
      <ul className="menu p-2 fixed">
        <li className="text-2xl font-bold menu-title">three-deformer</li>
        <li>
          <Link to="/">Getting started</Link>
          <a>Interactive Deformers</a>
          <ul className="list-row cursor-pointer">
            {deformerTypeList.map(name => (
              <li key={name}>
                <Link to={`/${name}`}>
                  <span>{capitalizeFirstLetter(name)}</span>
                </Link>
              </li>
            ))}
          </ul>
          <Link to="/api">API</Link>
        </li>
      </ul>
    </div>
  );
};
