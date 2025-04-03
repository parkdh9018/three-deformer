import { useSetRecoilState } from 'recoil';
import {
  deformerTypeList,
  selectedDeformerState,
} from '../state/atoms/deformerAtom';

export const Sidebar = () => {
  const setSelected = useSetRecoilState(selectedDeformerState);

  return (
    <ul className="menu  w-full p-2 shadow-sm">
      <li className="text-2xl font-bold menu-title">three-deformer</li>
      <li>
        <ul className="list-row cursor-pointer">
          {deformerTypeList.map(name => (
            <li
              key={name}
              onClick={() => {
                setSelected(name);
              }}
            >
              <span>{name}</span>
            </li>
          ))}
        </ul>
      </li>
    </ul>
  );
};
