import { SetStateAction, useState, Dispatch, useEffect } from 'react';
import { ModalComponent } from '@/components/modals/ModalComponent';
import { useNavigate } from 'react-router-dom';
import {
  updateSortingType,
  initializeModal,
  searchRequestHandler,
} from '@/report/keyword/container';

import { Selector } from '@/report/keyword/elements/Selector';
import { convertSortByIconPath } from '@/utils/convertEnum';
import { getQueryResult } from '@/report/keyword/api';

import { CountryType } from '@/generated/graphql';
import { Modal } from '@/report/keyword/elements/Modal';
import { SORTING_TYPE } from '@/report/keyword/elements/constants';
import { MODAL_TYPE_ENUM } from '@/types/enum.code';
import { SubscriptionAtom } from '@/atom';
import { useSetRecoilState } from 'recoil';

interface IReportGeneratorModal {
  reportTrigger: TSearchTrigger;
  setReportTrigger: Dispatch<SetStateAction<TSearchTrigger>>;
}
export const ReportGeneratorModal = ({
  reportTrigger,
  setReportTrigger,
}: IReportGeneratorModal) => {
  const { isOpen, text, country } = reportTrigger;
  const navigate = useNavigate();
  const [sortingType, setSortingType] = useState<TReportGeneratorType>(SORTING_TYPE[0]);
  const [isRequested, setIsRequested] = useState<boolean>(false);
  const setSubscription = useSetRecoilState(SubscriptionAtom);
  const [modal, setModal] = useState<TModalStatus>({
    modalType: '',
    response: '',
  });

  const { response, isLoading } = getQueryResult({
    country: country as CountryType,
    sortBy: sortingType.value,
    text: text,
    trigger: isRequested,
  });

  const _state = {
    keyword: text,
    country: country!,
    sortBy: sortingType.value,
    modalType: modal.modalType,
  };
  const parameter = {
    reportInvokeId: response?.reportInvokeId,
    count: response?.main.count,
  };

  useEffect(() => {
    if (isRequested && response) {
      searchRequestHandler({
        _dispatch: setModal,
        _state,
        parameter,
        isOpen,
        setSubscription,
      });
    }
  }, [response]);

  return (
    <ModalComponent isOpen={isOpen}>
      {modal.modalType ? (
        <Modal
          cleanUpFunction={() => {
            setSortingType(SORTING_TYPE[0]);
            setIsRequested(false);
            setModal({ modalType: '', response: '' });
          }}
          modalType={modal.modalType}
          createdAt={modal.response}
          successCallback={() => {
            if (modal.modalType === MODAL_TYPE_ENUM.MakeDuplicateReportSuccesses) {
              navigate(`/report`);
              // navigate(`/report/${modal.response}`);
            }
            if (
              [
                MODAL_TYPE_ENUM.LessMonthlyKeywordVolume,
                MODAL_TYPE_ENUM.SameKeywordReportExisted,
              ].includes(modal.modalType)
            ) {
              searchRequestHandler({
                _dispatch: setModal,
                _state,
                parameter,
                isOpen,
                setSubscription,
              });
            } else {
              initializeModal(reportTrigger, setReportTrigger);
            }
          }}
          failedCallback={() => {
            initializeModal(reportTrigger, setReportTrigger);
          }}
        />
      ) : (
        <div className='flex flex-col gap-2.5 rounded-[10px] border-[1px] border-grey-200 bg-white p-[23px] shadow-[0_1px_2px_0_rgba(0,0,0,0.15)]'>
          <p className='text-2XL/Bold'>리포트를 생성하시겠어요?</p>
          <p className='mb-[13px] text-M/Medium text-grey-700'>{text}</p>
          <Selector
            name='filterOption'
            minWidth={140}
            value={sortingType.text}
            isUseIcon={true}
            iconPath={convertSortByIconPath(sortingType.value)}
            options={SORTING_TYPE}
            onClickOption={(item) => {
              updateSortingType(item as string, SORTING_TYPE, setSortingType);
            }}
          />
          <div className='mt-[14px] flex h-12 w-[352px] gap-4 xs:w-[262px]'>
            <button
              type='button'
              className='button-filled-normal-large-grey-false-false-true w-full self-center py-3'
              onClick={() => {
                initializeModal(reportTrigger, setReportTrigger);
              }}
            >
              닫기
            </button>
            <button
              className='button-filled-normal-large-primary-false-false-true w-full'
              disabled={isRequested}
              onClick={() => {
                setIsRequested(true);
                if (response?.main.text === text) {
                  searchRequestHandler({
                    _dispatch: setModal,
                    _state,
                    parameter,
                    isOpen,
                    setSubscription,
                  });
                }
              }}
            >
              {isRequested ? (
                <div className='scale-[0.2]'>
                  <div id='loader-white' />
                </div>
              ) : (
                '생성하기'
              )}
            </button>
          </div>
        </div>
      )}
    </ModalComponent>
  );
};
