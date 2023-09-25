import { useState, ReactNode, useEffect } from 'react';
import { updateState } from '@/components/Checkbox/container';

interface ICheckbox {
  options: TCheckboxOption[];
  callback: Function;
  customCss?: string;
}

const Checkbox = ({ options, callback, customCss }: ICheckbox) => {
  const [value, setValue] = useState<TCheckboxOption[]>([{ text: '', value: 'hidden' }]);

  useEffect(() => {
    callback(value);
  }, [value]);

  return (
    <ul className={`flex cursor-pointer items-center self-start ${customCss}`}>
      {options.map((option, index) => {
        return (
          <li key={`checkbox_option_${index}`} className='cursor-pointer'>
            <input
              id={`checkbox_comp_${option.value}`}
              name='checkbox_comp'
              type='checkbox'
              className='checkboxCustom peer'
              onChange={() => updateState(value, option, setValue)}
            />
            <label
              htmlFor={`checkbox_comp_${option.value}`}
              className='checkboxCustom-label bg-[length:24px_24px] bg-[left_top_50%] pl-[30px] text-L/Regular'
            >
              {option.text}
            </label>
          </li>
        );
      })}
    </ul>
  );
};

export default Checkbox;
