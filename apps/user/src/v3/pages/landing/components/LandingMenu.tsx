import { ReactElement } from 'react';

function MenuItem({
  children,
  selected,
}: {
  selected?: boolean;
  children: string | ReactElement;
}) {
  return (
    <div
      className={`h-[40px] rounded-[8px] ${
        selected
          ? 'bg-purple-50 font-bold text-purple-600'
          : 'bg-white-50 text-grey-800 hover:bg-purple-50 hover:font-bold hover:text-purple-600'
      } cursor-pointer px-[40px]  leading-[40px] transition duration-300 ease-in-out`}
    >
      {children}
    </div>
  );
}

export const LandingMenu = () => {
  return (
    <div className='flex'>
      <MenuItem selected>고객</MenuItem>
      <div className='ml-[20px]' />
      <MenuItem>서비스</MenuItem>
    </div>
  );
};
