import { useLocation, useNavigate, matchRoutes } from 'react-router-dom';
import { ReactSVG } from 'react-svg';

import { AuthContainer } from '@/containers/auth/auth.container';
import { routeList } from '@/router/routeList';
import { isIncluded } from '@/utils/isIncluded';
import { useReducer } from 'react';
import { menuData } from '@/components/layouts/SideBarData';
import {
  sidebarInitialState,
  sidebarReducer,
} from '@/containers/sidebar/sidebar.reducer';
import { onClickUserMenu, toggleDepth2Menu, toggleSidebar } from '@/containers/sidebar';

const SideBar = () => {
  const { onLogout } = AuthContainer();
  const navigation = useNavigate();
  const { pathname } = useLocation();
  const [{ route }] = matchRoutes(routeList, pathname) || [];
  const { path } = route;

  const [_state, _dispatch] = useReducer(sidebarReducer, sidebarInitialState);

  const { userInfo } = AuthContainer();
  const userId = userInfo ? userInfo.me.email : '';
  if (_state.openedSidebar) {
    return (
      <aside className='flex w-[64px] flex-[0_0_64px] flex-col justify-between border-r-[1px] border-r-gray-200 bg-white px-2.5'>
        <div>
          <div className='flex h-20 items-center justify-center'>
            <button
              className='iconButton-large-normal-ghost-grey'
              onClick={() => toggleSidebar(_dispatch)}
            >
              <ReactSVG
                src='/assets/icons/outlined/MenuOpen.svg'
                className='cursor-pointer'
              />
            </button>
          </div>
          <ul>
            {menuData.map((menu, menuIndex) => {
              const isActive = isIncluded(path, ...menu.path);
              return (
                <li
                  className='cursor-pointer text-S/Medium text-grey-800'
                  key={menuIndex}
                >
                  <div
                    className={`${
                      isActive ? `bg-orange-100` : `bg-white`
                    } flex justify-between rounded-lg p-3`}
                    onClick={() => toggleDepth2Menu(_state, _dispatch, menu.key)}
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
                  svg.setAttribute('class', 'h-4 w-4 ');
                }}
              />
            </button>
          </li>
          <li className='text-center'>
            <button className='iconButton-medium-normal-ghost-grey' onClick={onLogout}>
              <ReactSVG
                src='/assets/icons/outlined/Logout.svg'
                beforeInjection={(svg) => {
                  svg.setAttribute('class', 'h-4 w-4 ');
                }}
              />
            </button>
          </li>
        </ul>
      </aside>
    );
  } else {
    return (
      <aside className='flex w-[200px] flex-[0_0_200px] flex-col justify-between border-r-[1px] border-r-gray-200 bg-white'>
        <div className='px-2.5'>
          <div className='flex h-20 items-center'>
            <button
              onClick={() => toggleSidebar(_dispatch)}
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
            {menuData.map((menu, menuIndex) => {
              //FIXME 리듀서 상태관리로 수정할 것 casey 23.02.28
              //상위 메뉴가 켜진 상태
              let isCollapsedActive = false;
              //상위 메뉴가 접힌 상태
              let isCollapsed = _state.openedDepthList.includes(menu.key);
              //접혔을 때
              if (isCollapsed === false) {
                isCollapsedActive = isIncluded(path, ...menu.path);
              }

              return (
                <li className='' key={menuIndex}>
                  <div
                    className={`flex cursor-pointer justify-between rounded-lg p-3 text-S/Medium text-grey-800 ${
                      isCollapsedActive && 'bg-orange-100 text-orange-600'
                    }`}
                    onClick={() => toggleDepth2Menu(_state, _dispatch, menu.key)}
                  >
                    <div className='flex items-center'>
                      <ReactSVG
                        src={menu.iconPath}
                        className='cursor-pointer '
                        beforeInjection={(svg) => {
                          svg.setAttribute(
                            'class',
                            `w-5 ${
                              isCollapsedActive ? 'fill-orange-500' : `fill-grey-800 `
                            }`,
                          );
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
                      {menu.children.map((child, childIndex) => {
                        let isActive: boolean;
                        if (child.activePath.length) {
                          isActive = isIncluded(path, ...child.activePath);
                        } else {
                          isActive = isIncluded(path, child.path);
                        }
                        return (
                          <li key={childIndex}>
                            <div
                              className={`flex cursor-pointer items-center rounded-lg py-2 pl-5 text-S/Medium ${
                                isActive && 'bg-orange-100 text-orange-500'
                              }`}
                              onClick={() => navigation(child.path)}
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
              );
            })}
          </ul>
        </div>
        <div className='divide-y divide-grey-300'>
          <div className='px-2.5 '>
            <div className='flex justify-between rounded-lg p-3 text-S/Medium text-grey-800'>
              <div className='flex items-center'>
                <ReactSVG
                  src='/assets/icons/outlined/QuestionCircle.svg'
                  className='cursor-pointer '
                  beforeInjection={(svg) => {
                    svg.setAttribute('class', `w-5 fill-grey-800`);
                  }}
                />
                <a href='https://gray-erica-c7f.notion.site/1957ac6d00064f1c8c006cc48b60ea34'>
                  <span className='ml-2'>사용자 가이드</span>
                </a>
              </div>
            </div>
          </div>
          <div className='space-y-3 py-6 px-4'>
            <div className='inline-block rounded-sm bg-grey-700 px-[7px] py-0.5 leading-none'>
              <span className='text-XS/Medium text-grey-100'>무료체험</span>
            </div>
            <div className='h-[6px] w-full rounded-[28px] bg-gradient-to-r from-orange-500 to-orange-300'></div>
            <div className='flex items-center justify-between'>
              <div className='text-XS/Medium'>리포트 발행 수</div>
              <ReactSVG
                src='/assets/icons/outlined/Infinity.svg'
                className='cursor-pointer '
                beforeInjection={(svg) => {
                  svg.setAttribute('class', `w-5 fill-grey-800`);
                }}
              />
            </div>
          </div>
          <div className='relative'>
            <a href='#' onClick={() => onClickUserMenu(_dispatch)}>
              <div className='flex cursor-pointer items-center justify-between px-4 py-[18px]'>
                <p className='text-S/Medium text-grey-800'>{userId}</p>
                <ReactSVG
                  src='/assets/icons/outlined/ArrowRight-Small.svg'
                  className='cursor-pointer '
                  beforeInjection={(svg) => {
                    svg.setAttribute('class', `w-6 fill-grey-800`);
                  }}
                />
              </div>
            </a>
            {_state.openedUserMenu ? (
              <div className='absolute bottom-4 right-[-10px] z-10 w-[216px] translate-x-full rounded-lg bg-white shadow-[0px_2px_41px_rgba(0,0,0,0.1)]'>
                <ul className=''>
                  {/*<li className='px-4 py-3'>*/}
                  {/*  <a className='text-S/Regular text-grey-900'>계정 정보</a>*/}
                  {/*</li>*/}
                  {/*<li className='px-4 py-3'>*/}
                  {/*  <a className='text-S/Regular text-grey-900'>요금제</a>*/}
                  {/*</li>*/}
                  {/*<li className='px-4 py-3'>*/}
                  {/*  <a className='text-S/Regular text-grey-900'>공지사항</a>*/}
                  {/*</li>*/}
                  <li className='px-4 py-3'>
                    <a
                      href='#'
                      onClick={onLogout}
                      className='text-S/Regular text-red-700'
                    >
                      로그아웃
                    </a>
                  </li>
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      </aside>
    );
  }
};
export default SideBar;
