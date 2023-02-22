import { useLocation, useNavigate, matchRoutes } from 'react-router-dom';
import { ReactSVG } from 'react-svg';

import { AuthContainer } from '@/containers/auth/auth.container';
import { PATH } from '@/router/routeList';
import { routeList } from '@/router/routeList';
import { isIncluded } from '@/utils/isIncluded';
import { Fragment, useEffect, useState } from 'react';
import { menuData } from '@/components/layouts/SideBarData';

const SideBar = () => {
  const { onLogout } = AuthContainer();
  const navigation = useNavigate();
  const { pathname } = useLocation();
  const [{ route }] = matchRoutes(routeList, pathname) || [];
  const { path } = route;

  //lnb 열림 여부
  const [lnbCollapsed, setLnbCollapsed] = useState<boolean>(false);

  //lnb 제어
  const toggleLnbCollapsed = () => {
    setLnbCollapsed(!lnbCollapsed);
  };

  //lnb 내 메뉴 열림 여부
  const [openedMenuList, setOpenedMenuList] = useState<String[]>([]);

  const toggleMenuCollapsed = (menuId: String) => {
    if (openedMenuList.find((one) => one === menuId)) {
      const filter = openedMenuList.filter((one) => one !== menuId);
      setOpenedMenuList([...filter]);
    } else {
      setOpenedMenuList([...openedMenuList, menuId]);
    }
  };

  if (lnbCollapsed) {
    return (
      <aside className='flex w-[64px] flex-[0_0_64px] flex-col justify-between border border-l-0 border-t-0 border-b-0 border-grey-100 bg-white px-2.5'>
        <div>
          <div className='flex h-20 items-center justify-center'>
            <button
              className='iconButton-large-normal-ghost-grey'
              onClick={toggleLnbCollapsed}
            >
              <ReactSVG
                src='/assets/icons/outlined/MenuOpen.svg'
                className='cursor-pointer'
              />
            </button>
          </div>
          <ul>
            {menuData.map((menu) => {
              const isActive = isIncluded(path, ...menu.path);
              return (
                <Fragment key={menu.key}>
                  <li className='cursor-pointer text-S/Medium text-grey-800'>
                    <div
                      className={`${
                        isActive ? `bg-orange-100` : `bg-white`
                      } flex justify-between rounded-lg p-3`}
                      onClick={() => toggleMenuCollapsed(menu.key)}
                    >
                      <div className='flex items-center'>
                        <ReactSVG
                          src={menu.iconPath}
                          className='cursor-pointer'
                          beforeInjection={(svg) => {
                            svg.setAttribute(
                              'class',
                              `h-5 w-5 ${isActive ? 'fill-orange-500' : 'text-grey-900'}`,
                            );
                          }}
                        />
                      </div>
                    </div>
                  </li>
                </Fragment>
              );
            })}
          </ul>
        </div>
        <ul className='mb-6 space-y-6 leading-none'>
          <li className='text-center'>
            <button className='iconButton-medium-normal-ghost-grey'>
              <ReactSVG
                src='/assets/icons/outlined/QuestionCircle.svg'
                beforeInjection={(svg) => {
                  svg.setAttribute('class', 'fill-grey-900 h-4 w-4 ');
                }}
              />
            </button>
          </li>
          <li className='text-center'>
            <button className='iconButton-medium-normal-ghost-grey' onClick={onLogout}>
              <ReactSVG
                src='/assets/icons/outlined/Logout.svg'
                beforeInjection={(svg) => {
                  svg.setAttribute('class', 'fill-grey-900 h-4 w-4 ');
                }}
              />
            </button>
          </li>
        </ul>
      </aside>
    );
  } else {
    return (
      <aside className='flex w-[200px] flex-[0_0_200px] flex-col justify-between border border-l-0 border-t-0 border-b-0 border-grey-100 bg-white px-2.5'>
        <div>
          <div className='flex h-20 items-center'>
            <button
              onClick={toggleLnbCollapsed}
              className='iconButton-large-normal-ghost-grey'
            >
              <ReactSVG
                src='/assets/icons/outlined/MenuFold.svg'
                className='cursor-pointer'
              />
            </button>

            <ReactSVG
              src='/assets/icons/Logo.svg'
              className='cursor-pointer'
              beforeInjection={(svg) => {
                svg.setAttribute('class', 'w-[124.5px] ml-3');
              }}
            />
          </div>
          <ul>
            {menuData.map((menu) => {
              let isCollapsed = false;
              isCollapsed = openedMenuList.includes(menu.key);

              return (
                <Fragment key={menu.key}>
                  <li className='cursor-pointer text-S/Medium text-grey-800'>
                    <div
                      className='flex justify-between p-3'
                      onClick={() => toggleMenuCollapsed(menu.key)}
                    >
                      <div className='flex items-center'>
                        <ReactSVG
                          src={menu.iconPath}
                          className='cursor-pointer '
                          beforeInjection={(svg) => {
                            svg.setAttribute('class', 'w-5 fill-grey-800');
                          }}
                        />
                        <span className='ml-2'>{menu.title}</span>
                      </div>
                      <ReactSVG
                        src='/assets/icons/outlined/Chevronup.svg'
                        className={`cursor-pointer ${isCollapsed ? `` : `rotate-180`}`}
                        beforeInjection={(svg) => {
                          svg.setAttribute('class', 'w-3 fill-grey-800');
                        }}
                      />
                    </div>
                    {isCollapsed && menu.children.length ? (
                      <ul className='mx-4'>
                        {menu.children.map((child, index) => {
                          const isActive = isIncluded(path, child.path);
                          return (
                            <li onClick={() => navigation(child.path)}>
                              <div
                                className={`flex items-center rounded-lg py-2 pl-5 ${
                                  isActive && 'bg-orange-100 text-primary-red-orange'
                                }`}
                              >
                                <ReactSVG
                                  src={child.iconPath}
                                  className='cursor-pointer'
                                  beforeInjection={(svg) => {
                                    svg.setAttribute(
                                      'class',
                                      `w-4 ${
                                        isActive ? 'fill-orange-500' : `fill-grey-800 `
                                      }`,
                                    );
                                  }}
                                />
                                <span className='ml-2'>{child.title}</span>
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                    ) : null}
                  </li>
                </Fragment>
              );
            })}
          </ul>
        </div>
        <div>
          <ul className='mb-4 text-S/Bold text-grey-800'>
            <li>
              <button className='button-text-normal-small-grey-false-false-true'>
                도움말
              </button>
            </li>
            <li>
              <button
                className='button-text-normal-small-grey-false-false-true'
                onClick={onLogout}
              >
                로그아웃
              </button>
            </li>
          </ul>
        </div>
      </aside>
    );
  }
};
export default SideBar;
