import { Card } from '@/blog/elements';

interface ICardList {
  listType?: 'standard' | 'extend';
  title: string;
}

export const CardList = ({ listType = 'standard', title }: ICardList) => {
  return (
    <div className='flex w-full flex-col' id='card_list_frame'>
      <header id='card_list_title' className='mb-5 flex justify-between'>
        <p className='text-2XL/Bold'>{title}</p>
        <button>
          <p className='text-L/Medium text-orange-400'>{`모두 보기 >`}</p>
        </button>
      </header>

      <main>
        <div id='card_list' className='flex gap-[23px]'>
          {[1, 2, 3].map((card, index) => {
            return (
              <div key={`card_${index}`} className='flex'>
                <Card />
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};
