import { CanvasArea } from './CanvasArea';
import { capitalizeFirstLetter } from '../../utils';
import { CustomCodeSandbox } from './CustomCodeSandbox';
import { EffectTypeWithCustom } from '../../types/deformerType';

type Props = {
  selected: EffectTypeWithCustom;
};

export const Viewer = ({ selected }: Props) => {
  const onModalButtonClick = () => {
    const modal = document.getElementById('my_modal_1') as HTMLDialogElement;
    modal.showModal();
  };

  return (
    <div className="h-full w-full">
      <div className="navbar bg-base-100 shadow-sm flex gap-5">
        <div>
          <span className="ml-2 text-2xl font-bold">
            {capitalizeFirstLetter(selected)}
          </span>
        </div>
        {selected === 'custom' && (
          <button
            className="btn btn-outline btn-info btn-sm rounded-btn"
            onClick={onModalButtonClick}
          >
            Custom Code
          </button>
        )}
      </div>
      <div className="h-[calc(100vh-64px)] w-full">
        <CanvasArea selected={selected} />
      </div>
      <CustomCodeSandbox />
    </div>
  );
};
