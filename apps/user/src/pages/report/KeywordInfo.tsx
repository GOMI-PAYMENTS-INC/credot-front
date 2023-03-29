import { ReactSVG } from 'react-svg';
import { convertTime } from '@/utils/parsingTimezone';
import { convertCountry } from '@/utils/convertEnum';
import { _amplitudeMovedToSERP } from '@/amplitude/amplitude.service';
import { useParams } from 'react-router-dom';
import { openBrowser } from '@/containers/report';
import { data } from 'autoprefixer';
interface IKeywordInfoProps {
  keywordInfo: TKeywordInfo;
}

export const KeywordInfo = (props: IKeywordInfoProps) => {
  const routeId = useParams();

  const { text, country, createdAt, basePrice } = props.keywordInfo;
  return (
    <section>
      <div className='flex justify-between border-t-2 border-b-2 border-grey-200'>
        <div className='basis-full py-8 pl-2'>
          <h1 className='break-all text-3XL/Bold text-grey-900'>{text}</h1>
          <div>
            <div className='pt-4 text-S/Medium odd:space-x-2'>
              <span className=' text-grey-600'>국가</span>
              <span className=' text-grey-800'>{convertCountry(country)}</span>
              <span className=' text-grey-600'>플랫폼</span>
              <span className=' text-grey-800'>Shopee</span>
              <span className=' text-grey-600'>생성일</span>
              <span className=' text-grey-800'>
                {convertTime(createdAt!, 'YYYY.MM.DD')}
              </span>
            </div>
            <div className='pt-2 text-S/Medium even:space-x-2'>
              <span className=' text-grey-600'>수집 기준</span>
              <span className=' text-grey-800'>연관도순 상위 50개</span>
              <span className=' text-grey-600'>생성일 기준 환율</span>
              <span className=' text-grey-800'>{`100VND = ${basePrice} KRW`}</span>
            </div>
          </div>
        </div>
        <div className='flex h-[168px] w-[179px]'>
          <div className='pt-[30px] pl-[7px]'>
            {/* TODO: 현재는 베트남 한정이지만 추후 국가 선택, 검색 기준도 쿼리에 넣어야 함 */}
            <button
              onClick={() => {
                openBrowser(`https://shopee.vn/search?keyword=${text}`);
                (routeId.id || '', text, text);
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
