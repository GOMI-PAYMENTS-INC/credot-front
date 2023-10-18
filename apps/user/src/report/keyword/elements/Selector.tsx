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
  text?: ReactNode;
  subValue?: string;
  subValueStyle?: string;
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

type TDropDown = {
  name?: string;
  status?: DROPDOWN_STATUS;
  variants?: DROPDOWN_VARIANTS;
  isUseIcon?: boolean;
  value: string | TDropDownOption;
  minWidth?: number;
  label?: string;
  iconPath?: string;
  options: TDropDownOption[];
  selectStyle?: string;
  onClickOption?: (value: string | number | TDropDownOption) => void;
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
  selectStyle,
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
          className={`relative w-fit rounded-lg border-[1px] bg-white text-S/Regular text-grey-900 ${selectStyle}`}
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
            {typeof value === 'string' ? (
              <p>{value}</p>
            ) : (
              <div className='flex flex-col gap-1 text-start'>
                <p>{value?.text || value.value}</p>
                {value.subValue ? (
                  <p className={`text-XS/Medium text-grey-700 ${value.subValueStyle}`}>
                    {value.subValue}
                  </p>
                ) : (
                  ''
                )}
              </div>
            )}
          </button>

          {isOpen && (
            <ul
              id={`select-option-${name}`}
              className='absolute top-[calc(100%_+_4px)] z-30 min-w-full rounded-md bg-white shadow-[0px_4px_12px_rgba(0,0,0,0.08)]'
            >
              {options.map((option) => {
                const valueText = typeof value === 'string' ? value : value.text;
                const compareKey = option.text || option.value;
                return (
                  <li key={option.value}>
                    <button
                      className={`flex w-full gap-x-2 break-keep py-3 px-4 hover:bg-grey-100 ${
                        compareKey === valueText && 'text-orange-500'
                      } ${option.subValue ? 'flex flex-col gap-1' : ''}`}
                      onClick={() => {
                        let payload;
                        if (option.subValue) {
                          payload = option;
                        } else {
                          payload = option.value;
                        }
                        handleOnClickOption(payload);
                      }}
                    >
                      {isUseIcon && <ReactSVG src={option.iconPath!} />}
                      <p>{option.text || option.value}</p>
                      {option.subValue && (
                        <p
                          className={`text-XS/Medium text-grey-700 ${option.subValueStyle}`}
                        >
                          {option.subValue}
                        </p>
                      )}
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
