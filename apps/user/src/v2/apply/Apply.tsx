import { useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { useSearchParams } from 'react-router-dom';

import { CrawlingDto } from '@/generated-rest/api/front';
import { useGetInterlock } from '@/v2/apply/hooks/interlock.hook';
import { useMyPrefund } from '@/v2/apply/hooks/prefund.hook';
import { MApply } from '@/v2/apply/MApply';
import { PCApply } from '@/v2/apply/PCApply';
import { useCheckVanLogin } from '@/v2/landing/hooks/interlock.hook';
import { useSearchMyPrefund } from '@/v2/landing/hooks/prefund.hook';

export enum ViewType {
  RESULT = 'RESULT',
  LOGIN = 'LOGIN',
  PROGRESS = 'PROGRESS',
  FAIL = 'FAIL',
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
        {!isMobile && (
          <PCApply
            viewType={viewType}
            setViewType={setViewType}
            checkVanLogin={checkVanLogin}
            searchMyBond={searchMyBond}
            loading={checkVanLoginLoading || requestBondLoading}
            prefund={myPrefundData?.prefund || 0}
          />
        )}
        {isMobile && (
          <MApply
            viewType={viewType}
            setViewType={setViewType}
            checkVanLogin={checkVanLogin}
            searchMyBond={searchMyBond}
            loading={checkVanLoginLoading || requestBondLoading}
            prefund={myPrefundData?.prefund || 0}
          />
        )}
      </div>
    </>
  );
};

export default Apply;
