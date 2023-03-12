import { Link } from 'react-router-dom';

import { PATH } from '@/router/paths';
import SvgIcon from '@/util/SvgIcon';

const Footer = () => {
  const IMG_PATH = '/assets/images';
  return (
    <footer className='py-[56px] text-grey-900'>
      <div className='container'>
        <div className='flex items-center justify-between sm:flex-wrap'>
          <div className='mr-4 sm:mr-0 sm:w-full'>
            <Link to={PATH.HOME}>
              <SvgIcon
                iconName='Logo'
                svgProp={{
                  width: 166,
                  height: 32,
                  className: '',
                }}
              />
            </Link>
            <h3 className='mt-[28px] text-M/Bold'>(주)고미코퍼레이션</h3>
            <div className='mt-4 space-y-1.5 text-S/Medium text-grey-700'>
              <p>대표이사 : 장건영, 이상곤 | 개인정보관리책임자 : 이상곤</p>
              <p>사업자등록번호 : 613-86-01212</p>
              <p>통신판매업신고번호 : 제2019-서울강남-01431호</p>
              <p>주소 : 서울시 강남구 강남대로 624, ICT 타워 5~7층</p>
              <p>메일 : kai@gomicorp.com</p>
              <p>전화 : 1833-3176 | 팩스 : 02-557-3176</p>
            </div>
          </div>
          <div className='sm:mt-4 sm:grid sm:w-full sm:grid-cols-2 sm:gap-x-[11px]'>
            <div>
              <a href='https://www.gomicorp.com/' target='_blank' rel='noreferrer'>
                <img src={`${IMG_PATH}/Footer/Banner-Gomicorp.png`} alt='' />
              </a>
            </div>
            <div className='mt-4 sm:mt-0 '>
              <a
                href='https://gray-erica-c7f.notion.site/1957ac6d00064f1c8c006cc48b60ea34'
                target='_blank'
                rel='noreferrer'
              >
                <img src={`${IMG_PATH}/Footer/Banner-Guide.png`} alt='' />
              </a>
            </div>
          </div>
        </div>
        <div className='mt-6 text-S/Medium text-grey-500'>
          Copyright © 2022 Gomi corporation Inc. All rights reserved
        </div>
      </div>
    </footer>
  );
};

export default Footer;
