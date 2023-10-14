import { Card } from '@/blog/elements';
import { getPath, convertTitle } from '@/blog/container';
import { useLocation, useNavigate } from 'react-router-dom';

interface ICardList {
  listType?: 'standard' | 'extend';
  title: TCategory;
}

export const CardList = ({ listType = 'standard', title }: ICardList) => {
  const cards = listType === 'standard' ? Array(3).fill(1) : Array(9).fill(1);
  const cardListStyle = listType === 'standard' ? '' : 'flex-wrap  gap-y-[50px]';
  const _title = convertTitle(title as TCategory);
  const navigator = useNavigate();
  const { pathname } = useLocation();
  return (
    <div className='flex w-full flex-col' id='card_list_frame'>
      <header id='card_list_title' className='mb-5 flex justify-between'>
        <p className='text-2XL/Bold'>{_title}</p>
        {listType === 'standard' && (
          <button
            onClick={() => {
              const path = getPath(pathname, title);
              navigator(path);
            }}
          >
            <p className='text-L/Medium text-orange-400'>{`모두 보기 >`}</p>
          </button>
        )}
      </header>

      <main>
        <div id='card_list' className={`flex gap-[23px] ${cardListStyle}`}>
          {cards.map((card, index) => {
            return (
              <div key={`card_${index}`} className='flex max-w-[366px]'>
                <Card />
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};
