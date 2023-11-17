import { CrawlingResponseDto, RequestCrawlingDto } from '@/generated-rest/api/front';
import { ViewType } from '@/v2/apply/Apply';
import { ApplyFormCard } from '@/v2/apply/components/ApplyFormCard';
import { FailView } from '@/v2/apply/components/FailView';
import { MLoginView } from '@/v2/apply/components/MLoginView';
import { ProgressView } from '@/v2/apply/components/ProgressView';
import Logo from '@/v2/landing/assets/logo.png';

export type MApplyProps = {
  viewType: ViewType;
  prefund: number;
  checkVanLogin(input: RequestCrawlingDto): Promise<boolean>;
  searchMyBond(input: RequestCrawlingDto): Promise<CrawlingResponseDto[]>;
  loading: boolean;
  setViewType(viewType: ViewType): void;
};

const Circle = ({
  value,
  title,
  selected,
}: {
  value: number;
  title: string;
  selected: boolean;
}) => {
  return (
    <div className='inline-block'>
      <div
        className={`${
          selected ? 'bg-orange-400' : 'bg-grey-400'
        } mx-auto h-[34px] w-[34px] rounded-[41px]  text-center text-L/Bold leading-[34px] text-white`}
      >
        {value}
      </div>
      <div className={`mt-[4px] ${selected ? 'text-M/Bold' : 'text-M/Medium'}`}>
        {title}
      </div>
    </div>
  );
};

export const MApply = ({
  viewType,
  checkVanLogin,
  searchMyBond,
  setViewType,
  loading,
  prefund,
}: MApplyProps) => {
  const isApplyStep = viewType === ViewType.RESULT;
  return (
    <>
      <div className='w-full bg-white py-[32px] pb-[16px]'>
        <img src={Logo} width={195} className='mx-auto' />
      </div>
      <div className='flex justify-center pt-[40px]'>
        <Circle value={1} title='정산금 조회' selected={!isApplyStep} />
        <div className='mx-[26px] h-[1px] w-[60px] self-center bg-grey-400' />
        <Circle value={2} title='서비스 신청' selected={isApplyStep} />
      </div>
      {isApplyStep && prefund > 0 && (
        <div className='mt-[30px] px-[20px]'>
          <div className='text-L/Medium text-grey-800'>오늘 받을 수 있는 금액</div>
          <div className='text-3XL/Bold text-orange-400'>
            {prefund.toLocaleString()}원
          </div>
        </div>
      )}
      <div className='mt-[30px] px-[20px]'>
        <div className='w-full items-center justify-between rounded-b-[8px] rounded-r-[8px] bg-white px-[14px] py-[30px] shadow-[0px_0px_50px_0px_rgba(0,0,0,0.04)]'>
          {!isApplyStep && (
            <>
              {viewType === ViewType.LOGIN && (
                <MLoginView
                  checkVanLogin={checkVanLogin}
                  searchMyBond={searchMyBond}
                  loading={loading}
                />
              )}
              {viewType === ViewType.FAIL && (
                <FailView onChange={(type: ViewType) => setViewType(type)} />
              )}
              {viewType === ViewType.PROGRESS && <ProgressView />}
            </>
          )}
          {isApplyStep && <ApplyFormCard />}
        </div>

        {[ViewType.LOGIN, viewType === ViewType.FAIL].includes(viewType) && (
          <div
            className='mt-[30px] cursor-pointer text-center text-S/Medium text-blue-600 underline underline-offset-8'
            onClick={() => setViewType(ViewType.RESULT)}
          >
            정산금 조회 없이 서비스 신청하기
          </div>
        )}
      </div>
    </>
  );
};
