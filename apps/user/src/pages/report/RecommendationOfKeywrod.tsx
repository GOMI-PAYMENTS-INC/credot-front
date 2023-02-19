import { ReactSVG } from 'react-svg';
import { Tooltip } from 'react-tooltip';
import { TITLE } from '@/types/enum.code';
import { EmptyRecommendation } from '@/pages/report/EmptyRecommendation';
import { isFalsy } from '@/utils/isFalsy';
import { openBrowser, roundNumber } from '@/containers/report';
import { convertRecommendationScoreToText } from '@/containers/report/report.constant';
import { formatNumber } from '@/utils/formatNumber';

interface IRecommendationOfKeyword {
  relation: TGetRelationReportDataType[];
}

export const RecommendationOfKeyword = (props: IRecommendationOfKeyword) => {
  const { relation } = props;

  return (
    <section id={TITLE.RECOMMEND_KEYWORD}>
      <h1 className='text-XL/Bold text-black'>
        추천 키워드
        <ReactSVG
          id='anchor-recommandation-keyword'
          src='/assets/icons/outlined/QuestionCircle.svg'
          className='inline-block pl-[7px]'
        />
        <Tooltip
          anchorId='anchor-recommandation-keyword'
          html='채워넣어보자구 : ).'
          place='right'
          className='text-XS/Regular text-grey-800'
        />
      </h1>

      <table className=' col-span-full mt-6 h-full w-full  table-auto bg-white'>
        <thead className='h-[54px] border-t-[1px] border-b-[1px] border-grey-300 bg-grey-100 text-center'>
          <tr>
            <th className='w-[302px] text-left' colSpan={1}>
              <p className=' pl-3 text-XS/Medium'>키워드</p>
            </th>
            <th className='w-[82px]' colSpan={1}>
              <p className='px-4  text-XS/Medium'>검색량</p>
            </th>
            <th className='w-[82px]' colSpan={1}>
              <p className='px-4  text-XS/Medium'>노출 경쟁</p>
            </th>
            <th className='w-[82px]' colSpan={1}>
              <p className='px-[13px] text-XS/Medium'>CPC 경쟁</p>
            </th>
            <th className='w-[72px]' colSpan={1}>
              <p className='px-1 text-XS/Medium'>노출 경쟁률</p>
            </th>
            <th className='w-[104px]' colSpan={1}>
              <div className='px-3 text-right text-XS/Medium'>
                <p>검색량</p>
                <hr className='ml-[62px] border-grey-300' />
                <p>경쟁상품 수</p>
              </div>
            </th>
            <th className='w-[72px]' colSpan={1}>
              <p className='px-[10px] text-XS/Medium'>CPC 비율</p>
            </th>
            <th className='w-[104px]' colSpan={1}>
              <div className='px-3 text-right text-XS/Medium'>
                <p>CPC</p>
                <hr className='ml-[62px] border-grey-300' />
                <p>평균 판매가</p>
              </div>
            </th>
            <th className='w-[40px]' colSpan={1}></th>
            <th className='w-[40px]' colSpan={1}></th>
          </tr>
        </thead>

        <tbody>
          <tr className='mt-3 flex' />
          {isFalsy(relation) ? (
            <EmptyRecommendation />
          ) : (
            relation.map((data) => {
              const [search, competiton, cpc] = data.evaluateStatus;
              return (
                <tr
                  key={`product_key_${data.id}`}
                  className='border-[1px] border-grey-300'
                >
                  <td>
                    <div className='ml-[6px] flex w-[114px]'>
                      <p>{data.text}</p>
                    </div>
                  </td>
                  <th>
                    <div className='flex justify-center'>
                      {convertRecommendationScoreToText(search)}
                    </div>
                  </th>
                  <th>
                    <div className='flex justify-center'>
                      {convertRecommendationScoreToText(competiton)}
                    </div>
                  </th>
                  <th>
                    <div className='flex justify-center'>
                      {convertRecommendationScoreToText(cpc)}
                    </div>
                  </th>
                  <th className='bg-grey-100'>
                    <div className='flex justify-center'>
                      <p className='text-S/Bold'>{`1:${roundNumber(
                        data.competitionRate,
                      )}`}</p>
                    </div>
                  </th>
                  <th>
                    <div className='flex flex-col flex-wrap-reverse  py-3 pr-3'>
                      <div className='bordered flex h-5 w-[58px] justify-end '>
                        <p className='pl-0.5 text-XS/Medium'>
                          {formatNumber(data.searchCount)}
                        </p>
                        <p className='pl-0.5 text-XS/Medium text-grey-700'>건</p>
                      </div>
                      <hr className='my-[3px] ml-[62px] border-grey-300' />
                      <div className='bordered flex h-5 w-[58px] justify-end '>
                        <p className='pl-0.5 text-XS/Medium'>
                          {formatNumber(data.competitionProductCount)}
                        </p>
                        <p className='pl-0.5 text-XS/Medium text-grey-700'>개</p>
                      </div>
                    </div>
                  </th>
                  <th className='bg-grey-100'>
                    <div className='flex justify-center'>
                      <div className='h-5 w-[43px]'>
                        <p className='text-S/Bold'>{`${data.cpcRate}%`}</p>
                      </div>
                    </div>
                  </th>
                  <th>
                    <div className='flex flex-col flex-wrap-reverse py-3 pr-3'>
                      <div className='bordered flex h-5 w-[58px] justify-end '>
                        <p className='pl-0.5 text-XS/Medium'>
                          {formatNumber(data.cpcPrice)}
                        </p>
                        <p className='pl-0.5 text-XS/Medium text-grey-700'>원</p>
                      </div>
                      <hr className='my-[3px] ml-[62px] border-grey-300' />
                      <div className='bordered flex h-5 w-[58px] justify-end '>
                        <p className='pl-0.5 text-XS/Medium'>
                          {formatNumber(data.avgPrice)}
                        </p>
                        <p className='pl-0.5 text-XS/Medium text-grey-700'>원</p>
                      </div>
                    </div>
                  </th>
                  <th>
                    <div className='flex justify-center'>
                      <div
                        className='flex h-5 w-5 cursor-pointer items-center'
                        onClick={() =>
                          openBrowser(`https://shopee.vn/search?keyword=${data.text}`)
                        }
                      >
                        <ReactSVG className='' src='/assets/icons/outlined/Linkout.svg' />
                      </div>
                    </div>
                  </th>
                  <th>
                    <div className='flex justify-center'>
                      <div className='flex h-5 w-5 cursor-pointer'>
                        <ReactSVG
                          className='-rotate-90'
                          src='/assets/icons/outlined/LeftArrow.svg'
                        />
                      </div>
                    </div>
                  </th>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </section>
  );
};
