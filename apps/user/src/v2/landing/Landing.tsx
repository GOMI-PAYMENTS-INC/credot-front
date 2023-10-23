import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { PATH } from '@/types/enum.code';

import commerce from './assets/ecommerce.png';
import landing1 from './assets/landing1.png';
import landing2 from './assets/landing2.png';
import landing3 from './assets/landing3.png';
import landing4 from './assets/landing4.png';
import landing5 from './assets/landing5.png';
import landing6 from './assets/landing6.png';
import landing7 from './assets/landing7.png';
import Logo from './assets/logo.png';
import mainImage from './assets/main_image_1.png';
import pg from './assets/pg.png';
import van from './assets/van.png';

export const Landing = () => {
  const navigate = useNavigate();
  const [index, setIndex] = useState<number>(0);

  return (
    <div>
      <div className='flex min-h-[597px] items-center justify-center bg-gradient-to-r from-dark-orange-900 to-orange-400'>
        <div className='mr-[308px]'>
          <div className='mb-4'>
            <img src={Logo} width={233} />
          </div>

          <div className='text-[40px] font-bold leading-[56.5px] text-white'>
            모든 사장님들을 위한 <br />
            당일 지급 선정산 서비스
          </div>

          <div className='mt-[20px] mb-[32px] leading-[60px] text-white'>
            묶여 있는 정산금, 정산일까지 기다리지 말고 지금 바로 받아가세요
          </div>

          <Link
            className='rounded-lg bg-gradient-to-r from-orange-400 to-orange-500 px-16 py-4 text-xl font-bold leading-[56px] text-white'
            to={PATH.SEARCH_PRODUCTS}
          >
            서비스 이용하기
          </Link>
        </div>
        <div>
          <img src={mainImage} width={328} />
        </div>
      </div>
      <div>
        <img src={landing1} className='mx-auto' />
      </div>
      <div>
        <img src={landing2} className='mx-auto' />
      </div>
      <div className='mt-[80px]'>
        <div className='text-center text-[32px] font-bold leading-[70px] text-grey-800'>
          총 82개 정산 시스템 연동 완료!
        </div>

        <div className='mt-[20px] text-center text-[20px] font-medium leading-[33px] text-grey-800'>
          더 많은 사장님들이 더 많은 정산을 받을 수 있도록 <br />
          정산 시스템은 더욱 다양해질꺼에요!
        </div>

        <div className='mt-[60px] mb-[44px] flex justify-center'>
          <div className='flex'>
            <div
              className={`mr-[25px] w-[168px] cursor-pointer rounded-[30px] py-[16px] text-center ${
                index === 0
                  ? 'bg-orange-400 text-white'
                  : 'border border-grey-300 text-grey-800'
              }`}
              onClick={() => setIndex(0)}
            >
              쇼핑몰
            </div>
            <div
              className={`mr-[25px] w-[168px] cursor-pointer rounded-[30px] py-[16px] text-center ${
                index === 1
                  ? 'bg-orange-400 text-white'
                  : 'border border-grey-300 text-grey-800'
              }`}
              onClick={() => setIndex(1)}
            >
              PG사
            </div>
            <div
              className={`mr-[25px] w-[168px] cursor-pointer rounded-[30px] py-[16px] text-center ${
                index === 2
                  ? 'bg-orange-400 text-white'
                  : 'border border-grey-300 text-grey-800'
              }`}
              onClick={() => setIndex(2)}
            >
              VAN사
            </div>
          </div>
        </div>

        {index === 0 && <img src={commerce} className='mx-auto' />}
        {index === 1 && <img src={pg} className='mx-auto' />}
        {index === 2 && <img src={van} className='mx-auto' />}
      </div>
      <div>
        <img src={landing3} className='mx-auto' />
      </div>
      <div>
        <img src={landing4} className='mx-auto' />
      </div>
      <div className='my-[110px]'>
        <img
          src={landing5}
          className='mx-auto cursor-pointer'
          onClick={() => navigate('/selection')}
        />
      </div>
      <div>
        <img src={landing6} className='mx-auto' />
      </div>
      <div>
        <img src={landing7} className='mx-auto' />
      </div>
    </div>
  );
};
