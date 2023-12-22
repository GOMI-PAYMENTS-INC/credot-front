import { HistoryOutlined, HomeOutlined, RightOutlined } from '@ant-design/icons';
import { Dropdown, Menu, MenuProps, Space } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { ReactSVG } from 'react-svg';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import { UserAtom } from '@/atom';
import { PATH } from '@/common/constants';

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

export const SideBar = () => {
  const [userInfo] = useRecoilState(UserAtom);
  const navigation = useNavigate();
  const handleClick: MenuProps['onClick'] = (e) => {
    navigation(e.key);
  };

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

  console.log(userInfo);

  return (
    <div className={`relative h-full w-[200px] bg-grey-50 py-[36px] px-[28px]`}>
      <Link to={PATH.BREAKDOWN}>
        <ReactSVG
          src='../src/v3/layouts/assets/logo.svg'
          className='cursor-pointer'
          beforeInjection={(svg) => {
            svg.setAttribute('class', 'w-[107px] mx-auto');
          }}
        />
      </Link>
      <CustomMenu
        className='mt-[51px] h-auto bg-grey-50'
        onClick={handleClick}
        selectedKeys={[location.pathname]}
        style={{ width: 144, border: 'none' }}
        mode='inline'
        items={items}
      />
      <div className='absolute bottom-[595px] left-0 w-full border-t border-grey-300 py-[18px]'>
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
                  <span className='mr-[12px] inline-block'>
                    {userInfo?.me.name || '-'}
                  </span>
                  <RightOutlined className='w-[9px] cursor-pointer' />
                </span>
              </Space>
            </a>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};
