import { Dispatch, useEffect, useState } from 'react';
import { Link, matchRoutes, useLocation, useNavigate } from 'react-router-dom';
import { ReactSVG } from 'react-svg';
import { useRecoilValue } from 'recoil';

import { _amplitudeMovedToUserGuide } from '@/amplitude/amplitude.service';
import { MeType, UserAtom } from '@/atom/auth.atom';
import { MENU_DATA } from '@/common/layouts/sidebar/constants';
import {
  switchFunctionToggle,
  toggleDepth2Menu,
  toggleSidebar,
} from '@/common/layouts/sidebar/container';
import { TSidebarAction } from '@/common/layouts/sidebar/reducer';
import { useLogout } from '@/hooks/user.hook';
import { routeList } from '@/router/routeList';
import { PATH } from '@/types/enum.code';
import { isIncluded } from '@/utils/isIncluded';
import { openBrowser } from '@/utils/openBrowser';
import { replaceOverLength } from '@/utils/replaceOverLength';

interface TSideBarProps {
  _state: TSidebarState;
  _dispatch: Dispatch<TSidebarAction>;
}
const MSidebar = (props: TSideBarProps) => {
  const { _state, _dispatch } = props;
  const { logout } = useLogout();
  const navigation = useNavigate();
  const { pathname } = useLocation();
  const [{ route }] = matchRoutes(routeList, pathname) || [];
  const { path } = route;

  const [userInfo, setUserInfo] = useState<MeType | undefined>(undefined);

  const userAtom = useRecoilValue(UserAtom);
  useEffect(() => {
    if (userAtom) {
      setUserInfo(userAtom);
    }
  }, [userAtom]);

  return (
    <aside
      className={`fixed left-0 z-50 hidden w-full flex-col xs:flex ${
        _state.openedSidebar && 'h-full'
      }`}
    >
      {_state.openedSidebar ? (
        <div
          className={`flex h-full w-full flex-col justify-between border-r-[1px] border-r-grey-200 bg-white`}
        >
          <div className='px-2.5'>
            <div className='flex h-[64px] w-full items-center justify-center'>
              <button
                onClick={() => toggleSidebar(_dispatch)}
                className='fixed left-0 ml-4 flex h-8 w-8 items-center'
              >
                <ReactSVG src='/assets/icons/outlined/MenuFold.svg' />
              </button>

              <Link to={PATH.SEARCH_PRODUCTS}>
                <ReactSVG
                  src='/assets/icons/Logo.svg'
                  className='cursor-pointer'
                  beforeInjection={(svg) => {
                    svg.setAttribute('class', 'w-[124px] ml-3 ml-[1px] h-6');
                  }}
                />
              </Link>
            </div>
            <ul>
              {MENU_DATA.map((menu, menuIndex) => {
                let isCollapsedActive = false;
                let isCollapsed = _state.openedDepthList.includes(menu.key);
                if (isCollapsed === false) {
                  isCollapsedActive = isIncluded(path, ...menu.path);
                }

                return (
                  <li key={menuIndex}>
                    <button
                      className={`flex w-full cursor-pointer justify-between rounded-lg p-3 text-M/Medium text-grey-800 ${
                        isCollapsedActive && 'bg-orange-100 text-orange-600'
                      }`}
                      onClick={() => {
                        toggleSidebar(_dispatch);
                        toggleDepth2Menu(_state, _dispatch, menu.key);
                      }}
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
                    </button>
                    {isCollapsed && menu.children.length ? (
                      <ul className='mx-4'>
                        {menu.children.map((child, childIndex) => {
                          let isActive: boolean = false;
                          if (child.activePath.length) {
                            isActive = isIncluded(path, ...child.activePath);
                          } else {
                            isActive = isIncluded(path, child.path);
                          }
                          return (
                            <li key={childIndex}>
                              <button
                                className={`flex  w-full cursor-pointer items-center rounded-lg py-2 pl-5  ${
                                  isActive &&
                                  'bg-orange-100 text-M/Medium text-orange-500'
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
                                <span
                                  className={`ml-2 ${
                                    isActive ? 'text-M/Medium' : 'text-M/Regular'
                                  }`}
                                >
                                  {child.title}
                                </span>
                              </button>
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
            <div className='px-2.5'>
              <div className='flex justify-between rounded-lg p-3 text-M/Medium text-grey-800'>
                <button
                  className='flex w-full justify-between'
                  onClick={() => {
                    openBrowser(
                      'https://capable-soy-f58.notion.site/6c820f6f0afe4b959b0bf307156dac5c?pvs=4',
                    );
                    _amplitudeMovedToUserGuide('lnb');
                  }}
                >
                  <div className='flex items-center'>
                    <ReactSVG
                      src='/assets/icons/outlined/QuestionCircle.svg'
                      className='cursor-pointer '
                      beforeInjection={(svg) => {
                        svg.setAttribute('class', `w-5 fill-grey-800`);
                      }}
                    />
                    <span className='ml-2 w-[270px] text-start text-M/Medium'>
                      사용자 가이드
                    </span>
                  </div>
                  <ReactSVG
                    src='/assets/icons/outlined/ArrowRightSmall.svg'
                    beforeInjection={(svg) => {
                      svg.setAttribute('class', 'w-10');
                    }}
                  />
                </button>
              </div>
            </div>

            <div className='px-2.5'>
              <button
                className='flex w-full cursor-pointer justify-between'
                onClick={() => switchFunctionToggle(_dispatch)}
              >
                <div className='flex p-3'>
                  <div className='flex items-center'>
                    <ReactSVG
                      src='/assets/icons/outlined/User.svg'
                      beforeInjection={(svg) => {
                        svg.setAttribute('class', 'w-5 ');
                      }}
                    />
                    <div className='ml-2 flex w-[270px] items-center text-M/Medium text-grey-800'>
                      {userInfo ? replaceOverLength(userInfo.me.email, 30) : ''}
                    </div>
                  </div>

                  <ReactSVG
                    src='/assets/icons/outlined/Chevronup.svg'
                    className={`cursor-pointer ${
                      _state.openedUserMenu ? `` : `rotate-180`
                    } ml-3 block`}
                    beforeInjection={(svg) => {
                      svg.setAttribute('class', 'w-3 fill-grey-800');
                    }}
                  />
                </div>
              </button>
              {_state.openedUserMenu && (
                <ul className='flex'>
                  <li
                    className='cursor-pointer px-4 py-3 text-S/Regular text-red-700'
                    onClick={() => {
                      logout();
                    }}
                  >
                    로그아웃
                  </li>
                </ul>
              )}
            </div>
            <div className='space-y-3 py-6 px-4'>
              <div className='inline-block rounded-sm bg-grey-700 px-[7px] py-0.5 leading-none'>
                <span className='text-S/Medium text-grey-100'>무료체험</span>
              </div>
              <div className='h-[6px] w-full rounded-[28px] bg-gradient-to-r from-orange-400 to-orange-300'></div>
              <div className='flex items-center justify-between'>
                <div className='text-M/Medium'>리포트 발행 수</div>
                <ReactSVG
                  src='/assets/icons/outlined/Infinity.svg'
                  beforeInjection={(svg) => {
                    svg.setAttribute('class', `w-5 fill-grey-800`);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className='h-full w-full'>
          <div className='fixed flex w-full'>
            <div className='top-0 z-20 flex w-full items-center justify-center border-b-[1px] border-grey-300 bg-white py-5'>
              <button
                className='fixed left-0 ml-4 flex'
                onClick={() => toggleSidebar(_dispatch)}
              >
                <ReactSVG src='/assets/icons/outlined/Menu.svg' />
              </button>

              <Link to={PATH.SEARCH_PRODUCTS}>
                <ReactSVG
                  src='/assets/icons/Logo.svg'
                  beforeInjection={(svg) => {
                    svg.setAttribute('class', 'w-[124px] h-6');
                  }}
                />
              </Link>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};

export default MSidebar;
