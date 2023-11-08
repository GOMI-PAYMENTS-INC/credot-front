import {
  CheckCircleOutlined,
  SisternodeOutlined,
  TransactionOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { ConfigProvider, Menu } from 'antd';
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
  getItem('출금 준비', '/prefund/ready', <SisternodeOutlined />),
  { type: 'divider' },
  getItem('출금 완료', '/prefund/deposit-done', <TransactionOutlined />),
  { type: 'divider' },
  getItem('거래 완료', '/prefund/done', <CheckCircleOutlined />),
];
export const SideBar = () => {
  const navigation = useNavigate();
  const location = useLocation();
  const onClick: MenuProps['onClick'] = (e) => {
    navigation(e.key);
  };

  return (
    <div className={`relative h-full border-grey-300 bg-grey-50`}>
      <div className='absolute top-[40px] left-0 px-[20px] text-XS/Bold text-grey-700'>
        선정산 서비스
      </div>
      <CustomMenu
        className='h-full bg-grey-50 py-[70px]'
        onClick={onClick}
        selectedKeys={[location.pathname]}
        style={{ width: 256 }}
        mode='inline'
        items={items}
      />
    </div>
  );
};
