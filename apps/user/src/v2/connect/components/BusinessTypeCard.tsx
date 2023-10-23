import { ReactNode } from 'react';

export interface CardInterface {
  title: string;
  content: ReactNode | string;
  image: string;
  selected: boolean;
  onClick(): void;
}

export const BusinessTypeCard = ({
  title,
  content,
  image,
  selected,
  onClick,
}: CardInterface) => {
  return (
    <div
      className={`w-[299px] cursor-pointer rounded-lg py-[57px] text-center shadow-sm hover:bg-gomi-200 ${
        selected ? 'border-2 border-gomi-600 bg-gomi-200' : 'border border-grey-300'
      }`}
      onClick={onClick}
    >
      <div className='text-xl font-bold text-gomi-600'>{title}</div>
      <div className='mt-[14px] text-base font-medium text-grey-800'>{content}</div>

      <div className='my-[40px] mr-auto ml-auto h-[6px] w-[35px] bg-gomi-400'></div>

      <img src={image} width={120} className='ml-auto mr-auto' />
    </div>
  );
};
