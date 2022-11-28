import { Icons } from '@/components/icons';

const SelectKeyWordBottomNav = () => (
  <div className='select-keyword-bottom-nav fixed bottom-0 left-0 w-screen bg-base-100'>
    <div className='grid grid-cols-select-keyword '>
      <div>
        <p className='text-m-regular'>
          선택한 키워드
          <br />(<span className='text-m-regular text-primary-red-orange'>4</span>/10)
        </p>
      </div>
      <div>
        <ul className='select-keyword-items max-h-[6.2rem] max-w-[64.75rem] overflow-y-auto'>
          {/* 선택한 키워드 아이템 시작 */}
          <li className='select-keyword-item  max-w-[calc(45%-0.125rem)] '>
            <div className=' grid grid-cols-select-keyword-item items-center gap-x-select-keyword-item'>
              <div className='user-language text-l-medium line-clamp-1'>
                Vận Chuyển Vận Chuyển ddd
              </div>
              <div className='user-language text-s-regular line-clamp-1'>
                수송수송수송수송수송
              </div>
              <div className='user-language text-s-regular line-clamp-1'>
                Ship Ship Ship Ship
              </div>
              <div>
                <Icons.Close width={24} height={24} />
              </div>
            </div>
          </li>
          {/* 선택한 키워드 아이템 끝 */}

          {/* 선택한 키워드 아이템 시작 */}
          <li className='select-keyword-item  max-w-[calc(45%-0.125rem)] '>
            <div className=' grid grid-cols-select-keyword-item items-center gap-x-select-keyword-item'>
              <div className='user-language text-l-medium line-clamp-1'>
                Vận Chuyển Vận Chuyển ddd
              </div>
              <div className='user-language text-s-regular line-clamp-1'>
                수송수송수송수송수송
              </div>
              <div className='user-language text-s-regular line-clamp-1'>
                Ship Ship Ship Ship
              </div>
              <div>
                <Icons.Close width={24} height={24} />
              </div>
            </div>
          </li>
          {/* 선택한 키워드 아이템 끝 */}

          {/* 선택한 키워드 아이템 시작 */}
          <li className='select-keyword-item  max-w-[calc(45%-0.125rem)] '>
            <div className=' grid grid-cols-select-keyword-item items-center gap-x-select-keyword-item'>
              <div className='user-language text-l-medium line-clamp-1'>Vận Chuyển</div>
              <div className='user-language text-s-regular line-clamp-1'>수</div>
              <div className='user-language text-s-regular line-clamp-1'>Ship</div>
              <div>
                <Icons.Close width={24} height={24} />
              </div>
            </div>
          </li>
          {/* 선택한 키워드 아이템 끝 */}

          {/* 선택한 키워드 아이템 시작 */}
          <li className='select-keyword-item  max-w-[calc(45%-0.125rem)] '>
            <div className=' grid grid-cols-select-keyword-item items-center gap-x-select-keyword-item'>
              <div className='user-language text-l-medium line-clamp-1'>
                Vận Chuyển Vận Chuyển ddd
              </div>
              <div className='user-language text-s-regular line-clamp-1'>
                수송수송수송수송수송
              </div>
              <div className='user-language text-s-regular line-clamp-1'>
                Ship Ship Ship Ship
              </div>
              <div>
                <Icons.Close width={24} height={24} />
              </div>
            </div>
          </li>
          {/* 선택한 키워드 아이템 끝 */}
        </ul>
      </div>
      <div className='text-center'>
        <button className='search-btn btn-wide btn w-full max-w-[25rem]'>
          <span className='text-xl-bold'>리포트 조회</span>
        </button>
      </div>
    </div>
  </div>
);

export default SelectKeyWordBottomNav;
