import '@/pages/search/style.css';

import { useEffect } from 'react';

import SearchForm from '@/components/form/search.form';
import { Icons } from '@/components/icons';
import SelectKeyWordBottomNav from '@/components/layouts/select-keyword-bottom-nav';
import { SearchResultContainer } from '@/containers/search/search-result.container';

const SearchResultPage = () => {
  const {
    isSubLoadingSearch,
    main,
    relations,
    keywordParam,
    subSearchResults,
    searchQueryError,
    SetIsSearchQuery,
  } = SearchResultContainer();

  useEffect(() => {
    if (searchQueryError) {
      SetIsSearchQuery(false);
    }
  }, [searchQueryError]);

  if (isSubLoadingSearch) {
    return <div> Loading... </div>;
  }

  return (
    <>
      <div className='container mx-auto mb-40 mt-10'>
        <div className='relative top-10 w-[67%]'>
          {/* 공통 - 검색 영역 시작 */}
          <SearchForm />
          {/* 공통 - 검색 영역 끝 */}
        </div>

        <div className='search-result-warp'>
          {/* Main 검색 시작 */}
          {main && Number(main?.count) > 100 ? (
            <div className='search-result'>
              {/* 가장 많은 검색 결과 (메인 결과) 시작 */}
              <div className='main-result'>
                <div className='title flex items-center'>
                  <h3 className='text-2xl-bold'>
                    &quot;{keywordParam}&quot;로 검색한 결과입니다.
                  </h3>
                  <div
                    className='tooltip ml-[0.59375rem]'
                    data-tip='입력하신 검색어와 연관 키워드들의 플랫폼 내 최근 30일 검색량 및 키워드 연관도를 나타냅니다.'
                  >
                    <i>
                      <Icons.ExclamationCircle width={24} height={24} />
                    </i>
                  </div>
                </div>
                <div className='search-info-wrap'>
                  <div className='search-info-box items-center'>
                    <div className='search-thumb'>
                      <ul>
                        {main.thumbnailLink?.map((item) => (
                          <li key={item}>
                            <img src={item} alt='' />
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className='search-keyword max-w-[32.9rem]'>
                      <p className='user-language medium-600 line-clamp-1'>
                        {main.translated}
                      </p>
                      <div className='transfer-language'>
                        <p className='text-s-medium line-clamp-1'>{main.ko}</p>
                        <p className='text-s-medium line-clamp-1'>{main.en}</p>
                      </div>
                    </div>
                    <div className='search-count'>
                      <p className='resent text-s-medium'>최근 30일간 검색량</p>
                      <p className='medium-600'>{main.count}건</p>
                    </div>
                  </div>
                </div>
              </div>
              {/* 가장 많은 검색 결과 (메인 결과) 끝 */}
              {/* 연관 키워드 시작 */}
              <div className='sub-result'>
                <div className='title'>
                  <h3 className='text-xl-bold '>연관 키워드</h3>
                </div>
                <ul className='search-info-wrap'>
                  {/* 내용 생략 예시 시작 */}
                  {relations &&
                    relations?.map((item) => (
                      <li key={item.id} className='search-info-box items-start'>
                        <div className='search-thumb'>
                          <ul>
                            {item.thumbnailLink?.map((imgItem) => (
                              <li key={imgItem}>
                                <img src={imgItem} alt='' />
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className='search-keyword max-w-[32.9rem]'>
                          <p className='user-language medium-500 line-clamp-2'>
                            {item.translated}
                          </p>
                          <div className='transfer-language'>
                            <p className='text-s-medium line-clamp-1'>{item.ko}</p>
                            <p className='text-s-medium line-clamp-1'>{item.en}</p>
                          </div>
                        </div>
                        <progress
                          className='progress progress-accent h-1 w-full'
                          value={item?.relevance ? item?.relevance : 0}
                          max='10'
                        />
                        <div className='search-count'>
                          <p className='medium-600'>{item.count}건</p>
                        </div>
                      </li>
                    ))}
                  {/* 내용 생략 예시 끝 */}

                  {/* 결과 없는 경우 시작 */}
                  {!relations && (
                    <li className='search-info-box items-center'>
                      <span className='text-grey-400'>No Results</span>
                    </li>
                  )}
                  {/* 결과 없는 경우 끝 */}
                </ul>
              </div>
              {/* 연관 키워드 끝 */}
            </div>
          ) : (
            <div className='search-result'>
              <h3 className='text-2xl-bold'>
                &quot;{keywordParam}&quot; 에 대한 검색 데이터가 존재하지 않습니다.
              </h3>
            </div>
          )}
          {/* 메인 검색 끝 */}

          {/* SUB 현지 (베트남어) 재검색 시작 */}
          {subSearchResults && Number(subSearchResults?.search.main?.count) > 100 ? (
            <div className='search-result'>
              {/* 가장 많은 검색 결과 (메인 결과) 시작 */}
              <div className='main-result'>
                <div className='title flex items-center'>
                  <h3 className='text-2xl-bold'>
                    베트남어로 번역 후 &quot;{main?.translated}&quot;로 검색한 결과입니다.
                  </h3>
                  <div
                    className='tooltip ml-[0.59375rem]'
                    data-tip='입력하신 검색어와 연관 키워드들의 플랫폼 내 최근 30일 검색량 및 키워드 연관도를 나타냅니다.'
                  >
                    <i>
                      <Icons.ExclamationCircle width={24} height={24} />
                    </i>
                  </div>
                </div>
                <div className='search-info-wrap'>
                  <div className='search-info-box items-center'>
                    <div className='search-thumb'>
                      <ul>
                        {subSearchResults?.search.main.thumbnailLink?.map((item) => (
                          <li key={item}>
                            <img src={item} alt='' />
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className='search-keyword max-w-[32.9rem]'>
                      <p className='user-language medium-600 line-clamp-1'>
                        {subSearchResults?.search.main.text}
                      </p>
                      <div className='transfer-language'>
                        <p className='text-s-medium line-clamp-1'>
                          {subSearchResults?.search.main.ko}
                        </p>
                        <p className='text-s-medium line-clamp-1'>
                          {subSearchResults?.search.main.en}
                        </p>
                      </div>
                    </div>
                    <div className='search-count'>
                      <p className='resent text-s-medium'>최근 30일간 검색량</p>
                      <p className='medium-600'>
                        {subSearchResults?.search.main.count}건
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* 가장 많은 검색 결과 (메인 결과) 끝 */}
              {/* 연관 키워드 시작 */}
              <div className='sub-result'>
                <div className='title'>
                  <h3 className='text-xl-bold '>연관 키워드</h3>
                </div>
                <ul className='search-info-wrap'>
                  {/* 내용 생략 예시 시작 */}
                  {subSearchResults?.search.relations?.map((item) => (
                    <li key={item.id} className='search-info-box items-start'>
                      <div className='search-thumb'>
                        <ul>
                          {item?.thumbnailLink?.map((itemImg) => (
                            <li key={itemImg}>
                              <img src={itemImg} alt='' />
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className='search-keyword max-w-[32.9rem]'>
                        <p className='user-language medium-500 line-clamp-2'>
                          {item?.translated}
                        </p>
                        <div className='transfer-language'>
                          <p className='text-s-medium line-clamp-1'>{item?.ko}</p>
                          <p className='text-s-medium line-clamp-1'>{item?.en}</p>
                        </div>
                      </div>
                      <progress
                        className='progress progress-accent h-1 w-full'
                        value={item?.relevance ? item?.relevance : 0}
                        max='10'
                      />
                      <div className='search-count'>
                        <p className='medium-600'>{item?.count}건</p>
                      </div>
                    </li>
                  ))}
                  {/* 내용 생략 예시 끝 */}
                  {/* 결과 없는 경우 시작 */}
                  {!subSearchResults?.search?.relations && (
                    <li className='search-info-box items-center'>
                      <span className='text-grey-400'>No Results</span>
                    </li>
                  )}
                  {/* 결과 없는 경우 끝 */}
                </ul>
              </div>
            </div>
          ) : (
            <div className='search-result'>
              <h3 className='text-2xl-bold'>
                &quot;{main?.translated}&quot; 에 대한 검색 데이터가 존재하지 않습니다.
              </h3>
            </div>
          )}
          {/* SUB 현지 (베트남어) 재검색 끝 */}
        </div>
      </div>
      <SelectKeyWordBottomNav />
    </>
  );
};

export default SearchResultPage;
