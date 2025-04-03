import { useRecoilValue } from 'recoil';
import { CanvasArea } from './CanvasArea';
import { selectedDeformerState } from '../state/atoms/deformerAtom';

export const Viewer = () => {
  const selected = useRecoilValue(selectedDeformerState);

  const onModalButtonClick = () => {
    const modal = document.getElementById('my_modal_1') as HTMLDialogElement;
    modal.showModal();
  };

  return (
    <div className="h-full w-full">
      <div className="navbar bg-base-200 shadow-sm">
        <div className="flex-1">
          <span className="ml-2 text-2xl font-bold">{selected}</span>
        </div>
        <div className="flex-none">
          {selected === 'custom' && (
            <button
              className="btn btn-outline btn-primary btn-sm rounded-btn"
              onClick={onModalButtonClick}
            >
              Custom Code
            </button>
          )}
        </div>
      </div>
      <div className="h-[calc(100vh-64px)] w-full">
        <CanvasArea />
      </div>
    </div>
  );
};
