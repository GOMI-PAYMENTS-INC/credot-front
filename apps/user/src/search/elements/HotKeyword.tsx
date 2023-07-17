import { HOT_KEYWORD } from '@/search/elements/constants';

export const HotKeyword = () => {
  return (
    <section>
      <div
        id='hotKeywordContentLayout'
        className='rounded-[20px] border-[1px] border-grey-300 bg-white p-5'
      >
        <div id='hotKeywordFrame' className='w-[334px]'>
          <p className='text-L/Bold text-orange-400'>HOT 키워드</p>
          <p className='mt-[2px] text-S/Medium text-grey-700'>
            오늘 Shopee <span className='text-grey-900'>베트남</span>에서 가장 핫한
            키워드들이에요.
          </p>
          <ul className='mt-5'>
            {HOT_KEYWORD.SG.map((keyword, index) => {
              return (
                <li className={`flex ${index === 6 ? '' : 'mb-[10px]'} cursor-pointer`}>
                  <span className='text-M/Medium text-orange-400'>{`${index}.`}</span>
                  <div className='ml-3 flex w-full justify-between text-M/Regular'>
                    <p className='text-grey-900'>{keyword.text}</p>
                    <p className='text-grey-700'>한국어 번역</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
};
