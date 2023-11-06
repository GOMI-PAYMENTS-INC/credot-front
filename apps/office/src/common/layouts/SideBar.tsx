import { useRecoilValue } from 'recoil';

import { SideBarVisibility } from '@/atom/sidebar.atom';
import menuIcon1 from '@/common/assets/menu_icon_1.png';

export const SideBar = () => {
  const visible = useRecoilValue(SideBarVisibility);
  return (
    <div
      className={`w-[200px] border-r-[1px] border-grey-300 bg-grey-50 px-[22px] py-[30px] ${
        visible ? 'block' : 'hidden'
      }`}
    >
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
  );
};
