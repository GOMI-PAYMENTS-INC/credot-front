import '@/pages/search/style.css';

import { Icons } from '@/components/icons';
import Layout from '@/components/layouts/layout';
import SelectKeyWordBottomNav from '@/components/layouts/select-keyword-bottom-nav';
import { SearchResultContainer } from '@/containers/search/search-result.container';
import { SearchDto } from '@/generated/graphql';

const SearchResultPage = () => {
  const { isLoadingSearch, main, relations } = SearchResultContainer();

  const RelationList = ({
    relationsParam,
  }: {
    relationsParam: SearchDto[] | undefined;
  }) => {
    if (!relationsParam || relationsParam.length === 0) {
      return <div>데이터가 없습니다.</div>;
    }
    return (
      <>
        {relationsParam.map((relation, index) => (
          <ul key={index}>
            <li>{relation.ko}</li>
          </ul>
        ))}
      </>
    );
  };

  if (isLoadingSearch) return <div>Loading...</div>;

  return (
    <Layout>
      <>
        {main ? (
          <>
            <div className='container mx-auto mb-40 mt-10'>
              {/* 공통 - 검색 영역 시작 */}
              <div className='flex w-full min-w-[40rem] gap-2 '>
                <div className='h-[4.5rem] w-[10.5rem] shrink-0'>
                  <select className='h-full w-full rounded border border-grey-400 px-3'>
                    <option>베트남</option>
                  </select>
                </div>
                <div className='h-[4.5rem] w-[10.5rem] shrink-0'>
                  <select className='h-full w-full rounded border border-grey-400 px-3'>
                    <option>쇼피</option>
                  </select>
                </div>
                <div className='h-[4.5rem] w-full'>
                  <input
                    className='h-full w-full rounded border border-grey-400 px-3'
                    placeholder='비타민'
                  />
                </div>
              </div>
              {/* 공통 - 검색 영역 끝 */}

              {/* 하단 결과 영역 시작 */}
              <div className='search-result-warp'>
                {/* 언어별 검색 결과 묶음 시작 - 사용자 검색 언어 */}
                <div className='search-result'>
                  {/* 가장 많은 검색 결과 (메인 결과) 시작 */}
                  <div className='main-result'>
                    <div className='title flex items-center'>
                      <h3 className='text-2xl-bold'>
                        &quot;Pear&quot;로 검색한 결과입니다.
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
                            <li>
                              <img src='' alt='' />
                            </li>
                            <li>
                              <img src='' alt='' />
                            </li>
                            <li>
                              <img src='' alt='' />
                            </li>
                          </ul>
                        </div>
                        <div className='search-keyword max-w-[32.9rem]'>
                          <p className='user-language medium-600 line-clamp-1'>
                            túi vận chuyển chó túi vận chuyển chóúi vận chuyển ch
                          </p>
                          <div className='transfer-language'>
                            <p className='text-s-medium line-clamp-1'>
                              배나무배나무배나무배나무배나무배나무배나무배나무배나무배나무배나무배나무배나무배나무배나무배나무
                            </p>
                            <p className='text-s-medium line-clamp-1'>
                              Pear TreePear TreePear TreePear TreePear TreePear TreePear
                              TreePear TreePear TreePear Tree
                            </p>
                          </div>
                        </div>
                        <div className='search-count'>
                          <p className='resent text-s-medium'>최근 30일간 검색량</p>
                          <p className='medium-600'>100건</p>
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
                      <li className='search-info-box items-start'>
                        <div className='search-thumb'>
                          <ul>
                            <li>
                              <img src='' alt='' />
                            </li>
                            <li>
                              <img src='' alt='' />
                            </li>
                            <li>
                              <img src='' alt='' />
                            </li>
                          </ul>
                        </div>
                        <div className='search-keyword max-w-[32.9rem]'>
                          <p className='user-language medium-500 line-clamp-2'>
                            túi vận chuyển chó túi vận chuyển chó túi vận ch
                          </p>
                          <div className='transfer-language'>
                            <p className='text-s-medium line-clamp-1'>
                              배나무배나무배나무배나무배나무배나무배나무배나무
                            </p>
                            <p className='text-s-medium line-clamp-1'>
                              Pear TreePear TreePear TreePear TreePear TreePear Tree
                            </p>
                          </div>
                        </div>
                        <progress
                          className='progress progress-accent h-1 w-full'
                          value='10'
                          max='100'
                        />
                        <div className='search-count'>
                          <p className='medium-600'>100건</p>
                        </div>
                      </li>
                      {/* 내용 생략 예시 끝 */}

                      <li className='search-info-box items-start'>
                        <div className='search-thumb'>
                          <ul>
                            <li>
                              <img src='' alt='' />
                            </li>
                            <li>
                              <img src='' alt='' />
                            </li>
                            <li>
                              <img src='' alt='' />
                            </li>
                          </ul>
                        </div>
                        <div className='search-keyword max-w-[32.9rem]'>
                          <p className='user-language medium-500'>
                            túi vận chuyển chó túi vận chuyển chó
                          </p>
                          <div className='transfer-language'>
                            <p className='text-s-medium line-clamp-1'>배나무</p>
                            <p className='text-s-medium line-clamp-1'>Pear Tree</p>
                          </div>
                        </div>
                        <progress
                          className='progress progress-accent h-1 w-full'
                          value='10'
                          max='100'
                        />
                        <div className='search-count'>
                          <p className='medium-600'>100건</p>
                        </div>
                      </li>
                      <li className='search-info-box items-start'>
                        <div className='search-thumb'>
                          <ul>
                            <li>
                              <img src='' alt='' />
                            </li>
                            <li>
                              <img src='' alt='' />
                            </li>
                            <li>
                              <img src='' alt='' />
                            </li>
                          </ul>
                        </div>
                        <div className='search-keyword max-w-[32.9rem]'>
                          <p className='user-language medium-500'>
                            túi vận chuyển chó túi vận chuyển chó
                          </p>
                          <div className='transfer-language'>
                            <p className='text-s-medium line-clamp-1'>배나무</p>
                            <p className='text-s-medium line-clamp-1'>Pear Tree</p>
                          </div>
                        </div>
                        <progress
                          className='progress progress-accent h-1 w-full'
                          value='10'
                          max='100'
                        />
                        <div className='search-count'>
                          <p className='medium-600'>100건</p>
                        </div>
                      </li>

                      {/* 결과 없는 경우 시작 */}
                      <li className='search-info-box items-center'>
                        <span className='text-grey-400'>No Results</span>
                      </li>
                      {/* 결과 없는 경우 끝 */}
                    </ul>
                  </div>
                  {/* 연관 키워드 끝 */}
                </div>
                {/* 언어별 검색 결과 묶음 끝 */}

                {/* 언어별 검색 결과 묶음 시작 - 검색 사이트 언어 */}
                <div className='search-result'>
                  {/* 가장 많은 검색 결과 (메인 결과) 시작 */}
                  <div className='main-result'>
                    <div className='title flex items-center'>
                      <h3 className='text-2xl-bold'>
                        &quot;Pear&quot;로 검색한 결과입니다.
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
                            <li>
                              <img src='' alt='' />
                            </li>
                            <li>
                              <img src='' alt='' />
                            </li>
                            <li>
                              <img src='' alt='' />
                            </li>
                          </ul>
                        </div>
                        <div className='search-keyword max-w-[32.9rem]'>
                          <p className='user-language medium-600 line-clamp-1'>
                            túi vận chuyển chó túi vận chuyển chó
                          </p>
                          <div className='transfer-language'>
                            <p className='text-s-medium line-clamp-1'>배나무</p>
                            <p className='text-s-medium line-clamp-1'>Pear Tree</p>
                          </div>
                        </div>
                        <div className='search-count'>
                          <p className='resent text-s-medium'>최근 30일간 검색량</p>
                          <p className='medium-600'>100건</p>
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
                      <li className='search-info-box items-start'>
                        <div className='search-thumb'>
                          <ul>
                            <li>
                              <img src='' alt='' />
                            </li>
                            <li>
                              <img src='' alt='' />
                            </li>
                            <li>
                              <img src='' alt='' />
                            </li>
                          </ul>
                        </div>
                        <div className='search-keyword max-w-[32.9rem]'>
                          <p className='user-language medium-500 line-clamp-2'>
                            túi vận chuyển chó túi vận chuyển chó túi vận chuyển
                          </p>
                          <div className='transfer-language'>
                            <p className='text-s-medium line-clamp-1'>
                              배나무배나무배나무배나무배나무배나무배나무배나무
                            </p>
                            <p className='text-s-medium line-clamp-1'>
                              Pear TreePear TreePear TreePear TreePear TreePear Tree
                            </p>
                          </div>
                        </div>
                        <progress
                          className='progress progress-accent h-1 w-full'
                          value='10'
                          max='100'
                        />
                        <div className='search-count'>
                          <p className='medium-600'>100건</p>
                        </div>
                      </li>
                      {/* 내용 생략 예시 끝 */}

                      <li className='search-info-box items-start'>
                        <div className='search-thumb'>
                          <ul>
                            <li>
                              <img src='' alt='' />
                            </li>
                            <li>
                              <img src='' alt='' />
                            </li>
                            <li>
                              <img src='' alt='' />
                            </li>
                          </ul>
                        </div>
                        <div className='search-keyword max-w-[32.9rem]'>
                          <p className='user-language medium-500'>
                            túi vận chuyển chó túi vận chuyển chó
                          </p>
                          <div className='transfer-language'>
                            <p className='text-s-medium line-clamp-1'>배나무</p>
                            <p className='text-s-medium line-clamp-1'>Pear Tree</p>
                          </div>
                        </div>
                        <progress
                          className='progress progress-accent h-1 w-full'
                          value='10'
                          max='100'
                        />
                        <div className='search-count'>
                          <p className='medium-600'>100건</p>
                        </div>
                      </li>
                      <li className='search-info-box items-start'>
                        <div className='search-thumb'>
                          <ul>
                            <li>
                              <img src='' alt='' />
                            </li>
                            <li>
                              <img src='' alt='' />
                            </li>
                            <li>
                              <img src='' alt='' />
                            </li>
                          </ul>
                        </div>
                        <div className='search-keyword max-w-[32.9rem]'>
                          <p className='user-language medium-500'>
                            túi vận chuyển chó túi vận chuyển chó
                          </p>
                          <div className='transfer-language'>
                            <p className='text-s-medium line-clamp-1'>배나무</p>
                            <p className='text-s-medium line-clamp-1'>Pear Tree</p>
                          </div>
                        </div>
                        <progress
                          className='progress progress-accent h-1 w-full'
                          value='10'
                          max='100'
                        />
                        <div className='search-count'>
                          <p className='medium-600'>100건</p>
                        </div>
                      </li>
                      <li className='search-info-box items-start'>
                        <div className='search-thumb'>
                          <ul>
                            <li>
                              <img src='' alt='' />
                            </li>
                            <li>
                              <img src='' alt='' />
                            </li>
                            <li>
                              <img src='' alt='' />
                            </li>
                          </ul>
                        </div>
                        <div className='search-keyword max-w-[32.9rem]'>
                          <p className='user-language medium-500'>
                            túi vận chuyển chó túi vận chuyển chó
                          </p>
                          <div className='transfer-language'>
                            <p className='text-s-medium line-clamp-1'>배나무</p>
                            <p className='text-s-medium line-clamp-1'>Pear Tree</p>
                          </div>
                        </div>
                        <progress
                          className='progress progress-accent h-1 w-full'
                          value='10'
                          max='100'
                        />
                        <div className='search-count'>
                          <p className='medium-600'>100건</p>
                        </div>
                      </li>
                      <li className='search-info-box items-start'>
                        <div className='search-thumb'>
                          <ul>
                            <li>
                              <img src='' alt='' />
                            </li>
                            <li>
                              <img src='' alt='' />
                            </li>
                            <li>
                              <img src='' alt='' />
                            </li>
                          </ul>
                        </div>
                        <div className='search-keyword max-w-[32.9rem]'>
                          <p className='user-language medium-500'>
                            túi vận chuyển chó túi vận chuyển chó
                          </p>
                          <div className='transfer-language'>
                            <p className='text-s-medium line-clamp-1'>배나무</p>
                            <p className='text-s-medium line-clamp-1'>Pear Tree</p>
                          </div>
                        </div>
                        <progress
                          className='progress progress-accent h-1 w-full'
                          value='10'
                          max='100'
                        />
                        <div className='search-count'>
                          <p className='medium-600'>100건</p>
                        </div>
                      </li>
                      <li className='search-info-box items-start'>
                        <div className='search-thumb'>
                          <ul>
                            <li>
                              <img src='' alt='' />
                            </li>
                            <li>
                              <img src='' alt='' />
                            </li>
                            <li>
                              <img src='' alt='' />
                            </li>
                          </ul>
                        </div>
                        <div className='search-keyword max-w-[32.9rem]'>
                          <p className='user-language medium-500'>
                            túi vận chuyển chó túi vận chuyển chó
                          </p>
                          <div className='transfer-language'>
                            <p className='text-s-medium line-clamp-1'>배나무</p>
                            <p className='text-s-medium line-clamp-1'>Pear Tree</p>
                          </div>
                        </div>
                        <progress
                          className='progress progress-accent h-1 w-full'
                          value='10'
                          max='100'
                        />
                        <div className='search-count'>
                          <p className='medium-600'>100건</p>
                        </div>
                      </li>
                      <li className='search-info-box items-start'>
                        <div className='search-thumb'>
                          <ul>
                            <li>
                              <img src='' alt='' />
                            </li>
                            <li>
                              <img src='' alt='' />
                            </li>
                            <li>
                              <img src='' alt='' />
                            </li>
                          </ul>
                        </div>
                        <div className='search-keyword max-w-[32.9rem]'>
                          <p className='user-language medium-500'>
                            túi vận chuyển chó túi vận chuyển chó
                          </p>
                          <div className='transfer-language'>
                            <p className='text-s-medium line-clamp-1'>배나무</p>
                            <p className='text-s-medium line-clamp-1'>Pear Tree</p>
                          </div>
                        </div>
                        <progress
                          className='progress progress-accent h-1 w-full'
                          value='10'
                          max='100'
                        />
                        <div className='search-count'>
                          <p className='medium-600'>100건</p>
                        </div>
                      </li>

                      {/* 결과 없는 경우 시작 */}
                      <li className='search-info-box items-center'>
                        <span className='text-grey-400'>No Results</span>
                      </li>
                      {/* 결과 없는 경우 끝 */}
                    </ul>
                  </div>
                  {/* 연관 키워드 끝 */}
                </div>
                {/* 언어별 검색 결과 묶음 끝 */}
              </div>
              {/* 하단 결과 영역 끝 */}
            </div>
            <SelectKeyWordBottomNav />
            {/* <div>text: {main.text}</div> */}
            {/* <div>ko: {main.ko}</div> */}
            {/* <div>eMainn: {main.en}</div> */}
            {/* <div>count: {main.count}</div> */}
          </>
        ) : (
          <div>Main 데이터가 없습니다.</div>
        )}
      </>
      {/* <div> */}
      {/*  <RelationList relationsParam={relations} /> */}
      {/* </div> */}
    </Layout>
  );
};

export default SearchResultPage;
