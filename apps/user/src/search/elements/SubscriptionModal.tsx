import { ModalComponent } from '@/components/modals/ModalComponent';
import { CACHING_KEY } from '@/types/enum.code';
import { openBrowser } from '@/utils/openBrowser';
import { useEffect, useState } from 'react';

export const SubscriptionModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(CACHING_KEY.IS_OPEN) === null) {
      setIsOpen(true);
    }
  }, []);

  return (
    <ModalComponent isOpen={isOpen}>
      <div className='flex flex-col'>
        <div className='h-[440px] w-[480px] bg-[url(/assets/images/Subscription.png)] bg-cover xs:h-[293px] xs:w-[320px]'>
          <div className='flex flex-col pt-[30px] pl-[30px] text-start text-3XL/Medium text-orange-400 xs:pt-5 xs:pl-5 xs:text-2XL/Bold'>
            <p>키워드 분석 서비스</p>
            <p>부분 유료화 안내</p>
            <p className='pt-[14px] text-2XL/Medium text-orange-900 xs:pt-2.5 xs:text-L/Medium'>
              2023.09.18~
            </p>
          </div>
        </div>
        <div className='flex h-[60px] justify-around rounded-b-lg bg-white xs:h-[52px]'>
          <button
            className='w-1/2 border-r-[1px]'
            onClick={() => {
              openBrowser(
                'https://capable-soy-f58.notion.site/bc3921c14630454eaebbff3da572bb0b?pvs=4',
              );
              sessionStorage.setItem(CACHING_KEY.IS_OPEN, 'done');
              setIsOpen(false);
            }}
          >
            자세히보기
          </button>
          <button
            className='w-1/2'
            onClick={() => {
              sessionStorage.setItem(CACHING_KEY.IS_OPEN, 'done');
              setIsOpen(false);
            }}
          >
            닫기
          </button>
        </div>
      </div>
    </ModalComponent>
  );
};
