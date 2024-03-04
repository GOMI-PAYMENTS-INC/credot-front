import {
  CheckCircleOutlined,
  FileDoneOutlined,
  SisternodeOutlined,
  TransactionOutlined,
  UserAddOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

type MenuItem = Required<MenuProps>['items'][number];

const CustomMenu = styled(Menu)`
  .ant-menu-item-divider {
    width: 80%;
    margin: 0 auto;
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
  getItem('선정산 지급하기', '/prefund/ready', <SisternodeOutlined />),
  { type: 'divider' },
  getItem('정산금 회수하기', '/prefund/deposit-done', <TransactionOutlined />),
  { type: 'divider' },
  getItem('회수 완료', '/prefund/done', <CheckCircleOutlined />),
];

const futureFundItems: MenuProps['items'] = [
  getItem('내역 조회', '/future-fund', <SisternodeOutlined />),
];

const memberManagementItems: MenuProps['items'] = [
  getItem('서비스 신청 내역', '/member/apply/list', <FileDoneOutlined />),
  { type: 'divider' },
  getItem('신규 회원 등록', '/member/register', <UserAddOutlined />),
  { type: 'divider' },
  getItem('회원 조회', '/member/list', <UserOutlined />),
];

export const SideBar = () => {
  const navigation = useNavigate();
  const location = useLocation();
  const onClick: MenuProps['onClick'] = (e) => {
    navigation(e.key);
  };

  return (
    <div className={`relative h-full border-grey-300 bg-grey-50`}>
      <div className='mt-[40px] px-[20px] text-XS/Bold text-grey-700'>선정산 서비스</div>
      <CustomMenu
        className='mt-[15px] h-auto bg-grey-50'
        onClick={onClick}
        selectedKeys={[location.pathname]}
        style={{ width: 256 }}
        mode='inline'
        items={items}
      />

      <div className='mt-[40px] px-[20px] text-XS/Bold text-grey-700'>
        미래정산 서비스
      </div>
      <CustomMenu
        className='mt-[15px] h-auto bg-grey-50'
        onClick={onClick}
        selectedKeys={[location.pathname]}
        style={{ width: 256 }}
        mode='inline'
        items={futureFundItems}
      />

      <div className='mt-[40px] px-[20px] text-XS/Bold text-grey-700'>회원 관리</div>
      <CustomMenu
        className='mt-[15px] h-full bg-grey-50'
        onClick={onClick}
        selectedKeys={[location.pathname]}
        style={{ width: 256 }}
        mode='inline'
        items={memberManagementItems}
      />
    </div>
  );
};
