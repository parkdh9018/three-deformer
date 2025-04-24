import { deformerTypeList } from '../types/deformerType';
import { capitalizeFirstLetter, lowercaseFirstLetter } from '../utils';
import { Link } from 'react-router-dom';
import { methodMap } from './2. API/methods/methodMap';

export const Sidebar = () => {
  return (
    <>
      <ul className="menu p-2">
        <li className="text-2xl font-bold menu-title">three-deformer</li>
        <div className="overflow-y-auto h-[calc(100vh-4rem)] pr-10">
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
            <ul>
              {Object.keys(methodMap).map(methodName => (
                <li key={methodName}>
                  <Link to={`/api#${lowercaseFirstLetter(methodName)}`}>
                    {lowercaseFirstLetter(methodName)}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        </div>
      </ul>
    </>
  );
};
