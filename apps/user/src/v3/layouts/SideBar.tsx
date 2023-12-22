import {
  HistoryOutlined,
  HomeOutlined,
  MenuFoldOutlined,
  RightOutlined,
} from '@ant-design/icons';
import { Dropdown, Menu, MenuProps, Space } from 'antd';
import { isMobile } from 'react-device-detect';
import { Link, useNavigate } from 'react-router-dom';
import { ReactSVG } from 'react-svg';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import { UserAtom } from '@/atom';
import { PATH } from '@/common/constants';
import { SideBarCollapseAtom } from '@/v3/atoms';
import { menuFoldIn, menuFoldOut } from '@/v3/layouts/assets';

type MenuItem = Required<MenuProps>['items'][number];

const CustomMenu = styled(Menu)`
  .ant-menu-item {
    padding-left: 0 !important;

    &.ant-menu-item-selected {
      background-color: transparent;
      color: #983be3;
    }

    &.ant-menu-item-active {
      background-color: transparent !important;
    }
  }
`;

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuProps['items'] = [
  getItem('홈', '/home', <HomeOutlined />),
  { type: 'divider' },
  getItem('서비스 이용내역', '/history', <HistoryOutlined />),
];

export const MyInfo = () => {
  const [userInfo] = useRecoilState(UserAtom);

  const handleDropDownMenuClick: MenuProps['onClick'] = (e) => {
    if (e.key === '3') {
      // Logout
    }
  };

  const dropDownItems: MenuProps['items'] = [
    {
      label: '로그아웃',
      key: '1',
    },
  ];

  return (
    <div className='w-full border-t border-grey-300 py-[18px]'>
      <div className='px-[16px]'>
        <Dropdown
          menu={{
            items: dropDownItems,
            onClick: handleDropDownMenuClick,
          }}
          trigger={['click']}
          placement='bottomRight'
        >
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              <span className='text-S/Medium text-grey-800'>
                <span className='mr-[12px] inline-block'>{userInfo?.me.name || '-'}</span>
                <RightOutlined className='w-[9px] cursor-pointer' />
              </span>
            </Space>
          </a>
        </Dropdown>
      </div>
    </div>
  );
};

export const SideBar = () => {
  const [collapsed, setCollapsed] = useRecoilState(SideBarCollapseAtom);
  const navigation = useNavigate();
  const handleClick: MenuProps['onClick'] = (e) => {
    navigation(e.key);
  };

  return (
    <div
      className={`${
        isMobile
          ? 'h-full w-full pt-[57px] pb-[20px]'
          : 'relative h-full w-[200px] py-[36px]'
      } bg-grey-50`}
    >
      <div className='flex'>
        {isMobile &&
          (!collapsed ? (
            <img
              src={menuFoldIn}
              onClick={() => setCollapsed(true)}
              className='ml-[14px]'
            />
          ) : (
            <img
              src={menuFoldOut}
              onClick={() => setCollapsed(false)}
              className='ml-[14px]'
            />
          ))}
        <Link to={PATH.BREAKDOWN} className='basis-full self-center'>
          <ReactSVG
            src='../src/v3/layouts/assets/logo.svg'
            className='cursor-pointer'
            beforeInjection={(svg) => {
              svg.setAttribute('class', 'w-[107px] mx-auto');
            }}
          />
        </Link>
      </div>
      {!isMobile && (
        <div className={`flex h-full flex-col justify-between`}>
          <div className='px-[28px]'>
            <CustomMenu
              className='mt-[51px] h-auto bg-grey-50'
              onClick={handleClick}
              selectedKeys={[location.pathname]}
              style={{ width: 144, border: 'none' }}
              mode='inline'
              items={items}
            />
          </div>
          <MyInfo />
        </div>
      )}
      {isMobile && (
        <div
          className={`absolute top-[100px] left-0 z-[100] w-full bg-grey-50 ${
            collapsed ? 'h-[calc(100vh-100px)]' : 'h-0'
          } flex flex-col justify-between overflow-hidden transition-all delay-150 duration-300`}
        >
          <div className='px-[28px]'>
            <CustomMenu
              className='mt-[20px] h-auto bg-grey-50'
              onClick={handleClick}
              selectedKeys={[location.pathname]}
              style={{ width: '100%', border: 'none' }}
              mode='inline'
              items={items}
            />
          </div>
          <div className='w-full border-t border-grey-300 py-[18px]'>
            <div className='px-[16px]'>
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  <span className='text-S/Medium text-[#FF334B]'>
                    <span className='mr-[12px] inline-block'>로그아웃</span>
                  </span>
                </Space>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
