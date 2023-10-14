import { Card } from '@/blog/elements';
import { convertTitle } from '@/blog/container';
interface ICardList {
  listType?: 'standard' | 'extend';
  title: string;
}

export const CardList = ({ listType = 'standard', title }: ICardList) => {
  const cards = listType === 'standard' ? Array(3).fill(1) : Array(9).fill(1);
  const cardListStyle = listType === 'standard' ? '' : 'flex-wrap  gap-y-[50px]';
  const _title = convertTitle(title as TCategory);
  return (
    <div className='flex w-full flex-col' id='card_list_frame'>
      <header id='card_list_title' className='mb-5 flex justify-between'>
        <p className='text-2XL/Bold'>{_title}</p>
        {listType === 'standard' && (
          <button>
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
