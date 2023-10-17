import { Card } from '@/blog/elements';
import { getPath, convertTitle } from '@/blog/container';
import { useLocation, useNavigate } from 'react-router-dom';

interface ICardList {
  listType?: 'standard' | 'extend';
  title: TCategory;
  contents: TContent[];
}

export const CardList = ({ listType = 'standard', title, contents }: ICardList) => {
  const cards = listType === 'standard' ? Array(3).fill(1) : Array(9).fill(1);

  const cardListStyle = listType === 'standard' ? '' : 'flex-wrap gap-y-[50px]';
  const cardFrameStyle = listType === 'standard' ? '' : 'justify-center';
  const _title = convertTitle(title as TCategory);

  // const navigator = useNavigate();
  // const { pathname } = useLocation();
  return (
    <div className='flex w-full flex-col' id='card_list_frame'>
      <header id='card_list_title' className='mb-5 flex w-full justify-between'>
        <p className='self-start text-2XL/Bold'>{_title}</p>
        {/* {listType === 'standard' && (
          <button
            onClick={() => {
              const path = getPath(pathname, title);
              navigator(path);
            }}
          >
            <p className='text-L/Medium text-orange-400'>{`모두 보기 >`}</p>
          </button>
        )} */}
      </header>

      <main>
        <div className={`flex ${cardFrameStyle}`}>
          <div id='card_list' className={`flex gap-[23px] ${cardListStyle}`}>
            {cards
              .map((_, index) => contents[index])
              .filter(Boolean)
              .map((card, index) => {
                return (
                  <div key={`card_${index}`} className='flex max-w-[366px]'>
                    <Card content={card} />
                  </div>
                );
              })}
          </div>
        </div>
      </main>
    </div>
  );
};
