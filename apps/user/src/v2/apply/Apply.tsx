import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { CrawlingDto } from '@/generated-rest/api/front';
import { ApplyFormCard } from '@/v2/apply/components/ApplyFormCard';
import { FailView } from '@/v2/apply/components/FailView';
import { LoginView } from '@/v2/apply/components/LoginView';
import { PrefundCard } from '@/v2/apply/components/PrefundCard';
import { PrefundResultContent } from '@/v2/apply/components/PrefundResultContent';
import { ProgressView } from '@/v2/apply/components/ProgressView';
import { useGetInterlock } from '@/v2/apply/hooks/interlock.hook';
import { useMyPrefund } from '@/v2/apply/hooks/prefund.hook';
import Logo from '@/v2/landing/assets/logo.png';
import { useCheckVanLogin } from '@/v2/landing/hooks/interlock.hook';
import { useSearchMyPrefund } from '@/v2/landing/hooks/prefund.hook';

export enum ViewType {
  RESULT = 'RESULT',
  LOGIN = 'LOGIN',
  PROGRESS = 'PROGRESS',
  'FAIL' = 'FAIL',
}

const Apply = () => {
  const [searchParams] = useSearchParams();
  const requestIdsQueryParams = searchParams.get('requestIds');
  const [isStopPollingStatus, setIsStopPollingStatus] = useState<boolean>(false);

  const [viewType, setViewType] = useState<ViewType>(ViewType.LOGIN);
  const [requestIds, setRequestIds] = useState<number[]>(
    requestIdsQueryParams
      ? `${requestIdsQueryParams}`.split(',').map((requestId) => Number(requestId))
      : [],
  );

  /*** 선정산 요청 상태 조회 API ***/
  const { data: requestStatusData, isLoading: isRequestStatusLoading } = useGetInterlock(
    requestIds,
    isStopPollingStatus,
  );

  /*** 선정산 요청 로그인 체크 API ***/
  const { mutateAsync: checkVanLogin, isLoading: checkVanLoginLoading } =
    useCheckVanLogin();

  /*** 선정산 요청 API ***/
  const {
    mutateAsync: searchMyBond,
    data: searchMyBondResult,
    isLoading: requestBondLoading,
  } = useSearchMyPrefund();

  /*** 선정산 요청 결과 API ***/
  const { data: myPrefundData, isLoading: isRequestResultLoading } = useMyPrefund(
    requestStatusData?.status === CrawlingDto.status.DONE ? requestIds[0] : null,
  );

  // 선정산 요청 상태를 처리할 때
  useEffect(() => {
    if (requestStatusData?.status === CrawlingDto.status.FAILED) {
      setViewType(ViewType.FAIL);
      return;
    }

    if (requestStatusData?.status === CrawlingDto.status.REQUEST) {
      setViewType(ViewType.PROGRESS);
      return;
    }

    if (requestStatusData?.status === CrawlingDto.status.DONE) {
      setViewType(ViewType.RESULT);
      return;
    }
  }, [requestStatusData]);

  // 내 선정산 정보 결과가 성공적으로 왔을 때
  useEffect(() => {
    if (myPrefundData) {
      setViewType(ViewType.RESULT);
      setIsStopPollingStatus(true);
      return;
    }
  }, [myPrefundData]);

  // 신청 페이지에서 로그인 후 선정산 요청 정보를 설정할 때
  useEffect(() => {
    if (searchMyBondResult) {
      setRequestIds(searchMyBondResult.map((result) => result.crawlingId));
    }
  }, [searchMyBondResult]);

  // 랜딩에서 조회 후 신청페이지 왔을 경우 뷰타입 재설정
  useEffect(() => {
    if (requestIdsQueryParams) {
      setViewType(ViewType.PROGRESS);
      return;
    }
  }, []);

  return (
    <>
      <div className='h-screen h-full bg-grey-100 pb-[174px]'>
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
                <PrefundResultContent prefund={myPrefundData?.prefund || 0} />
              )}
              {viewType === ViewType.FAIL && (
                <FailView onChange={(type: ViewType) => setViewType(type)} />
              )}
              {viewType === ViewType.PROGRESS && <ProgressView />}
              {viewType === ViewType.LOGIN && (
                <LoginView
                  checkVanLogin={checkVanLogin}
                  searchMyBond={searchMyBond}
                  loading={checkVanLoginLoading || requestBondLoading}
                />
              )}
            </PrefundCard>
          </div>
          <div className='mt-[40px]'>
            <ApplyFormCard />
          </div>
        </div>
      </div>
    </>
  );
};

export default Apply;
