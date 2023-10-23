import { Fragment, ReactNode, useEffect, useState } from 'react';
import { useMatch } from 'react-router-dom';

import menuIcon1 from '@/common/assets/menu_icon_1.png';
import GNB from '@/common/layouts/GNB';
import { PATH } from '@/types/enum.code';

interface IDefaultProps {
  children?: ReactNode;
  useGap?: boolean;
}

export const Default = ({ children, useGap = false }: IDefaultProps) => {
  const [handleCss, setHandleCss] = useState('');

  const pattern = [PATH.REPORT_DETAIL, PATH.REPORT_DETAIL_BY_SHARE].some(
    (path) => useMatch(path)?.pattern,
  );

  useEffect(() => {
    pattern ? setHandleCss('') : setHandleCss('h-full');
  }, [pattern]);

  return (
    <Fragment>
      <div className='h-screen'>
        <Fragment>
          <GNB />
          <div className={`${handleCss} ${useGap ? 'mt-[72px]' : ''} flex`}>
            <div className='w-[200px] border-r-[1px] border-grey-300 bg-grey-50 px-[22px] py-[30px]'>
              <div className='text-XS/Bold text-grey-700'>채권 판매</div>
              <ul className='mt-[17px]'>
                <li className='border-b-[1px] border-grey-200 py-[12px]'>
                  <span className='flex'>
                    <span className='mr-[8px]'>
                      <img src={menuIcon1} />
                    </span>
                    <span className='self-center text-S/Bold text-orange-400'>
                      정산금 채권 판매
                    </span>
                  </span>
                </li>
                <li className='py-[12px]'>
                  <span className='flex'>
                    <span className='mr-[8px]'>
                      <img src={menuIcon1} />
                    </span>
                    <span className='self-center text-S/Medium'>매출 채권 판매</span>
                  </span>
                </li>
              </ul>
            </div>
            <div className='p-5'>{children}</div>
          </div>
        </Fragment>
      </div>
    </Fragment>
  );
};
