import { Link } from 'react-router-dom';
import { ReactSVG } from 'react-svg';

import { PATH } from '@/router';

export const Footer = () => {
  const IMG_PATH = '/assets/images';
  return (
    <footer className='py-[56px] text-grey-900'>
      <div className='container'>
        <div className='flex items-center justify-between sm:flex-wrap'>
          <div className='mr-4 sm:mr-0 sm:w-full'>
            <Link to={PATH.HOME}>
              <ReactSVG
                src='/assets/icons/Logo.svg'
                beforeInjection={(svg) => {
                  svg.setAttribute('class', 'w-[166px] h-8');
                }}
              />
            </Link>
            <h3 className='mt-[28px] text-M/Bold'>(주)고미인사이트</h3>
            <div className='mt-4 space-y-1.5 text-S/Regular text-grey-700'>
              <p>대표이사 : 오채윤 | 개인정보관리책임자 : 오채윤</p>
              <p>사업자등록번호 : 460-81-03224</p>
              <p>통신판매업신고번호 : 제2023-서울송파-2407호</p>
              <p>주소 : 서울광역시 송파구 법원로 128, 씨동 지114-에스108호(문정동)</p>
              <p>메일 : support@gomiinsight.com | 전화: 010-2988-6441</p>
            </div>
          </div>
          <div className='sm:mt-4 sm:grid sm:w-full sm:grid-cols-2 sm:gap-x-[11px]'>
            <div>
              <a
                href='https://www.gomicorp.com/?utm_source=gomiinsight&utm_medium=homepage&utm_campaign=introduction&utm_content=content'
                target='_blank'
                rel='noreferrer'
              >
                <img src={`${IMG_PATH}/Footer/Banner-Gomicorp.png`} alt='' />
              </a>
            </div>
            <div className='mt-4 sm:mt-0 '>
              <a
                href='https://gomicorp.notion.site/611d950ad238426ba16a96eb0631f739'
                target='_blank'
                rel='noreferrer'
              >
                <img src={`${IMG_PATH}/Footer/Banner-Guide.png`} alt='' />
              </a>
            </div>
          </div>
        </div>
        <div className='mt-6 text-S/Medium text-grey-500'>
          Copyright © 2023 Gomi Insight Inc. All rights reserved
        </div>
      </div>
    </footer>
  );
};
