import { useSetRecoilState } from 'recoil';
import {
  deformerTypeList,
  selectedDeformerState,
} from '../state/atoms/deformerAtom';
import { capitalizeFirstLetter } from '../utils';
import { pageIndexState } from '../state/atoms/pageIndexAtom';

export const Sidebar = () => {
  const setSelected = useSetRecoilState(selectedDeformerState);
  const setIndex = useSetRecoilState(pageIndexState);

  return (
    <div>
      <ul className="menu p-2 fixed">
        <li className="text-2xl font-bold menu-title">three-deformer</li>
        <li>
          <a
            className="cursor-pointer"
            onClick={() => {
              setIndex(0);
            }}
          >
            Getting started
          </a>
          <a>Interactive Deformers</a>
          <ul className="list-row cursor-pointer">
            {deformerTypeList.map(name => (
              <li
                key={name}
                onClick={() => {
                  setIndex(1);
                  setSelected(name);
                }}
              >
                <span>{capitalizeFirstLetter(name)}</span>
              </li>
            ))}
          </ul>
          {/* <a
            className="cursor-pointer"
            onClick={() => {
              setIndex(2);
            }}
          >
            API
          </a> */}
        </li>
      </ul>
    </div>
  );
};
