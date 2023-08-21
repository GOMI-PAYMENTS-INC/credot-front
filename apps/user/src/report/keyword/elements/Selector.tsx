import { ReactSVG } from 'react-svg';
import { useEffect, useRef, useState, ReactNode, Fragment } from 'react';

export enum DROPDOWN_STATUS {
  NORMAL = 'Normal',
  FILLED = 'Filled',
  DISABLED = 'Disabled',
}

export enum DROPDOWN_VARIANTS {
  DEFAULT = 'Default',
  CLEAR = 'Clear',
}

export type TDropDownOption = {
  value: string | number;
  iconPath?: string;
  text: ReactNode;
};

type TDropDown = {
  name?: string;
  status?: DROPDOWN_STATUS;
  variants?: DROPDOWN_VARIANTS;
  isUseIcon?: boolean;
  value: ReactNode;
  minWidth?: number;
  label?: string;
  iconPath?: string;
  options: TDropDownOption[];
  onClickOption?: (value: ReactNode) => void;
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

    case DROPDOWN_VARIANTS.CLEAR:
      style = 'bg-transparent bg-svg-filled/CaretDown-grey-700';

    default:
      return style;
  }
};

export const Selector = ({
  name = Math.floor(Math.random() * 1000).toString(),
  status = DROPDOWN_STATUS.FILLED,
  variants = DROPDOWN_VARIANTS.CLEAR,
  value,
  minWidth,
  iconPath,
  isUseIcon,
  options,
  label,
  onClickOption,
}: TDropDown) => {
  const [isOpen, setOpen] = useState<boolean>(false);

  const handleOnClickOption = (optionValue: any) => {
    if (onClickOption) {
      onClickOption(optionValue);
    }
    setOpen(!isOpen);
  };

  const selectorRef = useRef<HTMLDivElement>(null);

  return (
    <Fragment>
      <div className='flex self-center'>
        {label && <label className='inputCustom-label'>{label}</label>}
        <div
          id={`select-group-${name}`}
          className={`relative w-fit rounded-lg border-[1px] bg-white text-S/Regular text-grey-900`}
          ref={selectorRef}
        >
          <button
            id={`select-box-${name}`}
            style={{ minWidth: minWidth }}
            className={`flex items-center gap-x-2 rounded-md py-2.5 pl-3 pr-8 ${variantsStyle(
              variants,
            )} ${statusStyle(status)}`}
            onClick={() => setOpen(!isOpen)}
          >
            {isUseIcon && <ReactSVG src={iconPath!} />}
            <span>{value}</span>
          </button>

          {isOpen && (
            <ul
              id={`select-option-${name}`}
              className='absolute top-[calc(100%_+_4px)] z-10 min-w-full rounded-md bg-white shadow-[0px_4px_12px_rgba(0,0,0,0.08)]'
            >
              {options.map((option) => {
                return (
                  <li key={option.value}>
                    <button
                      className={`flex w-full gap-x-2 break-keep py-3 px-4 hover:bg-grey-100 ${
                        option.text === value && 'text-orange-500'
                      }`}
                      onClick={() => {
                        handleOnClickOption(option.value);
                      }}
                    >
                      {isUseIcon && <ReactSVG src={option.iconPath!} />}
                      <span>{option.text}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </Fragment>
  );
};
