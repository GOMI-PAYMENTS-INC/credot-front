import { ReactSVG } from 'react-svg';
import { useEffect, useRef, useState } from 'react';

export enum DROPDOWN_STATUS {
  NORMAL = 'Normal',
  FILLED = 'Filled',
  //HOVER = 'Hover',
  DISABLED = 'Disabled',
}

export enum DROPDOWN_VARIANTS {
  DEFAULT = 'Default',
  CLEAR = 'Clear',
}

export type TDropDownOption = {
  value: string | number;
  iconPath?: string;
  text: string;
};

type TDropDown = {
  name: string;
  status: DROPDOWN_STATUS;
  variants: DROPDOWN_VARIANTS;
  isUseIcon: boolean;
  value: string;
  minWidth?: number;
  iconPath?: string;
  options: TDropDownOption[];
  onClickOption?: (value: any) => void;
};

const statusStyle = (status: DROPDOWN_STATUS) => {
  let style: string = '';
  switch (status) {
    case DROPDOWN_STATUS.NORMAL:
      style = 'text-grey-900';
      return style;
    case DROPDOWN_STATUS.FILLED:
      style = '';
      return style;
    case DROPDOWN_STATUS.DISABLED:
      style = 'bg-transparent ';
      return style;
    default:
      return style;
  }
};

const variantsStyle = (variants: DROPDOWN_VARIANTS) => {
  let style: string = '';
  switch (variants) {
    case DROPDOWN_VARIANTS.DEFAULT:
      style =
        'bg-white border border-grey-400 bg-svg-filled/CaretDown-black hover:border-orange-300 hover:shadow-[0px_0px_4px_rgba(255,163,120,0.5)];';
      return style;
    case DROPDOWN_VARIANTS.CLEAR:
      style = 'bg-transparent bg-svg-filled/CaretDown-grey-700';
      return style;
    default:
      return style;
  }
};

const DropDown = ({
  name,
  status,
  variants,
  value,
  minWidth,
  iconPath,
  isUseIcon,
  options,
  onClickOption,
}: TDropDown) => {
  const [isOpen, setOpen] = useState<boolean>(false);

  const handleOnClickOption = (optionValue: any) => {
    if (onClickOption) {
      onClickOption(optionValue);
    }
    setOpen(!isOpen);
  };
  const handleOnClickSelectable = () => {
    setOpen(!isOpen);
  };

  const modalEl = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const clickOutside = (event: any) => {
      if (isOpen && modalEl.current && !modalEl.current?.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', clickOutside);
    return () => {
      document.removeEventListener('mousedown', clickOutside);
    };
  }, [isOpen]);

  return (
    <div
      id={`select-group-${name}`}
      className={`relative text-S/Regular text-gray-900`}
      ref={modalEl}
    >
      <button
        id={`select-box-${name}`}
        style={{ minWidth: minWidth }}
        className={`flex items-center gap-x-2 rounded-md py-2.5 pl-3 pr-8 ${variantsStyle(
          variants,
        )} ${statusStyle(status)}`}
        onClick={() => handleOnClickSelectable()}
      >
        {isUseIcon && iconPath && <ReactSVG src={iconPath} className='' />}
        <span>{value}</span>
      </button>

      {isOpen && (
        <ul
          id={`select-option-${name}`}
          className='absolute top-[calc(100%_+_4px)] z-10 min-w-full rounded-md bg-white shadow-[0px_4px_12px_rgba(0,0,0,0.08)]'
          style={{ minWidth: minWidth }}
        >
          {options.map((option) => {
            return (
              <li key={option.value}>
                <button
                  className={`flex w-full gap-x-2 break-keep py-3 px-4 hover:bg-gray-100 ${
                    option.text === value && 'text-orange-500'
                  }`}
                  onClick={() => handleOnClickOption(option.value)}
                >
                  {isUseIcon && option.iconPath && <ReactSVG src={option.iconPath} />}
                  <span>{option.text}</span>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
export default DropDown;
