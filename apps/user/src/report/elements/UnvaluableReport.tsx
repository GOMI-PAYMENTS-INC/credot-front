import { ReactSVG } from 'react-svg';
import { _amplitudeMovedToSERP } from '@/amplitude/amplitude.service';
import { openBrowser } from '@/utils/openBrowser';
import { convertShopeeSiteUrl } from '@/utils/convertEnum';
import { CountryType } from '@/generated/graphql';
import type { Params } from 'react-router-dom';
interface IUnvaluableReport {
  sorted: TSortBy;
  itemName: string;
  country: CountryType;
  params: Params<string>;
}
export const UnvaluableReport = ({
  sorted,
  itemName,
  country,
  params,
}: IUnvaluableReport) => {
  return (
    <div className='flex h-screen flex-col items-center justify-center text-center xs:pt-[65px]'>
      <div>
        <img src='/assets/images/UnvaluableReport.png' />
      </div>
      <div className='mt-7'>
        <h1 className='text-2XL/Bold xs:text-L/Bold'>
          리포트 생성이 불가능한 키워드에요.
        </h1>
        <p className='mt-6 text-M/Regular xs:mt-4'>
          키워드 검색 시 노출되는 상품 수가 적어
          <br className='hidden xs:block' /> 리포트를 생성하지 못했어요.
        </p>
      </div>
      <div className='mt-14 xs:mt-[38px]'>
        <button
          className='button-filled-normal-large-primary-false-false-true h-12 w-[260px]'
          onClick={async () => {
            history.go(-1);
            setTimeout(() => window.location.reload(), 100);
          }}
        >
          <p className='text-M/Bold text-grey-50'>이전 화면으로</p>
        </button>
        <div className='my-5 flex w-[550px] justify-center border-t-[1px] border-grey-300'>
          <button
            className='mt-5 flex items-center'
            onClick={() => {
              openBrowser(
                `${convertShopeeSiteUrl(country)}/search?keyword=${itemName}`,
                sorted,
              );
              _amplitudeMovedToSERP(params.id, itemName, null);
            }}
          >
            <ReactSVG
              src='/assets/icons/outlined/Linkout.svg'
              beforeInjection={(svg) => svg.setAttribute('class', 'fill-grey-900')}
            />
            <p className='pl-1 text-M/Regular text-grey-800'>키워드 검색결과 확인하기</p>
          </button>
        </div>
      </div>
    </div>
  );
};
