import { ReactSVG } from 'react-svg';
import { convertTime } from '@/utils/parsingTimezone';
import {
  convertCountry,
  convertExchangeRate,
  convertShopeeSiteUrl,
  convertSortedType,
} from '@/utils/convertEnum';
import { _amplitudeMovedToSERP } from '@/amplitude/amplitude.service';
import { openBrowser } from '@/containers/report';
interface IKeywordInfoProps {
  keywordInfo: TKeywordInfo;
  itemCount: number;
  amplitudeData: TAmplitudeDetailData;
}

export const KeywordInfo = (props: IKeywordInfoProps) => {
  const { text, country, createdAt, basePrice, currencyUnit, sorted } = props.keywordInfo;
  const { reportId } = props.amplitudeData;

  return (
    <section>
      <div className='flex justify-between border-t-2 border-b-2 border-grey-200'>
        <div className='basis-full py-8 pl-2'>
          <h1 className='break-all text-3XL/Bold text-grey-900'>{text}</h1>
          <div>
            <div className='pt-4 text-S/Medium'>
              <span className='keywordInfo-divide-by-single-dot'>
                <span className='text-grey-600'>국가</span>
                <span className='ml-1 text-grey-800'>{convertCountry(country)}</span>
              </span>
              <span className='keywordInfo-divide-by-single-dot'>
                <span className='text-grey-600'>리포트 생성일</span>
                <span className='ml-1 text-grey-800'>
                  {convertTime(createdAt!, 'YYYY.MM.DD')}
                </span>
              </span>
            </div>
            <div className='pt-2 text-S/Medium'>
              <span className='keywordInfo-divide-by-single-dot'>
                <span className='text-grey-600'>데이터 수집 기준</span>
                <span className='ml-1 text-grey-800'>
                  {convertSortedType(sorted)} 상위 {props.itemCount}개
                </span>
              </span>
              <span className='keywordInfo-divide-by-single-dot'>
                <span className='text-grey-600'>적용 환율</span>
                <span className='ml-1 space-x-1 text-grey-800'>
                  <span>{currencyUnit}</span>
                  <span className='text-grey-700'>{convertExchangeRate(country)}</span>
                  <span>=</span>
                  <span>{basePrice}</span>
                  <span className='text-grey-700'>KRW</span>
                </span>
              </span>
            </div>
          </div>
        </div>
        <div className='flex h-[168px] w-[179px]'>
          <div className='pt-[30px] pl-[7px]'>
            <button
              onClick={() => {
                openBrowser(`${convertShopeeSiteUrl(country)}/search?keyword=${text}`);
                _amplitudeMovedToSERP(reportId, text, null);
              }}
              className='button-filled-normal-medium-grey-false-true-true flex h-10 w-[165px] items-center justify-center'
            >
              키워드 검색결과
              <ReactSVG className='ml-1' src='/assets/icons/outlined/Linkout.svg' />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
