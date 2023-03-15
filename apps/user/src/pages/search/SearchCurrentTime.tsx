import { useState } from 'react';
import { ReactSVG } from 'react-svg';
import { convertTime } from '@/utils/parsingTimezone';
import { useInterval } from '@/components/useInterval';

export const SearchCurrentTime = () => {
  const [time, setTitme] = useState('');

  useInterval(() => {
    const now = convertTime('', 'hh:mm');
    setTitme(now);
  }, 1000);

  return (
    <div className='mt-[19px] flex h-4 items-center justify-between pl-5'>
      <div className='flex items-center'>
        <img src='/assets/images/StatusGomiIcon.png' />
        <p className='pl-[6px] text-L/Medium'>{time}</p>
      </div>
      <ReactSVG src='/assets/icons/filled/StatusStatusIcons.svg' />
    </div>
  );
};
