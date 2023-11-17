import { CrawlingResponseDto, RequestCrawlingDto } from '@/generated-rest/api/front';
import { ViewType } from '@/v2/apply/Apply';
import { ApplyFormCard } from '@/v2/apply/components/ApplyFormCard';
import { FailView } from '@/v2/apply/components/FailView';
import { LoginView } from '@/v2/apply/components/LoginView';
import { PrefundCard } from '@/v2/apply/components/PrefundCard';
import { PrefundResultContent } from '@/v2/apply/components/PrefundResultContent';
import { ProgressView } from '@/v2/apply/components/ProgressView';
import Logo from '@/v2/landing/assets/logo.png';

export type PCApplyProps = {
  viewType: ViewType;
  prefund: number;
  checkVanLogin(input: RequestCrawlingDto): Promise<boolean>;
  searchMyBond(input: RequestCrawlingDto): Promise<CrawlingResponseDto[]>;
  loading: boolean;
  setViewType(viewType: ViewType): void;
};

export const PCApply = ({
  viewType,
  prefund,
  loading,
  searchMyBond,
  checkVanLogin,
  setViewType,
}: PCApplyProps) => {
  return (
    <div className='mx-auto w-[1004px] py-[80px]'>
      <div>
        <div className='inline-block'>
          <img src={Logo} width={233} />
        </div>

        <div className='mt-[20px] text-2XL/Medium text-grey-800'>
          정산금 확인 후 서비스 이용 신청서를 작성하시면 24시간 이내 담당자가 연락을
          드려요.
        </div>
      </div>
      <div className='mt-[60px]'>
        <PrefundCard title='묶여 있는 정산금 조회'>
          {viewType === ViewType.RESULT && (
            <PrefundResultContent prefund={prefund || 0} />
          )}
          {viewType === ViewType.FAIL && (
            <FailView onChange={(type: ViewType) => setViewType(type)} />
          )}
          {viewType === ViewType.PROGRESS && <ProgressView />}
          {viewType === ViewType.LOGIN && (
            <LoginView
              checkVanLogin={checkVanLogin}
              searchMyBond={searchMyBond}
              loading={loading}
            />
          )}
        </PrefundCard>
      </div>
      <div className='mt-[40px]'>
        <ApplyFormCard />
      </div>
    </div>
  );
};
