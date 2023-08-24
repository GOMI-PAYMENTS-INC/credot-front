import { SetStateAction, useState, Dispatch, useEffect } from 'react';
import { ModalComponent } from '@/components/modals/ModalComponent';
import { useNavigate } from 'react-router-dom';
import { searchRequestHandler } from '@/search/container';
import { SEARCH_MODAL_INIT_VALUE } from '@/search/newSearch/constants';

import { Modal } from '@/report/keyword/elements/Modal';
import { MODAL_TYPE_ENUM } from '@/types/enum.code';
import { HackleId } from '@/atom/common/hackle.atom';
import { useRecoilValue } from 'recoil';

interface IReportGeneratorModal {
  _modalState: TNSearchModalStatus;
  _modalDispatch: Dispatch<SetStateAction<TNSearchModalStatus>>;
  _state: TSearchProps;
  parameter: TReportParams;
}

export const ReportGeneratorModal = (props: IReportGeneratorModal) => {
  const { _modalState, _modalDispatch, _state, parameter } = props;
  const { modalType, response } = _modalState;
  const hackleId = useRecoilValue(HackleId);
  const navigate = useNavigate();
  return (
    <ModalComponent isOpen={modalType !== ''}>
      <Modal
        cleanUpFunction={() => _modalDispatch(SEARCH_MODAL_INIT_VALUE)}
        modalType={modalType}
        createdAt={response}
        successCallback={() => {
          if (modalType === MODAL_TYPE_ENUM.MakeDuplicateReportSuccesses) {
            navigate(`/report/${response}`);
          }
          if (
            [
              MODAL_TYPE_ENUM.LessMonthlyKeywordVolume,
              MODAL_TYPE_ENUM.SameKeywordReportExisted,
            ].includes(modalType as MODAL_TYPE_ENUM)
          ) {
            searchRequestHandler({
              _modalState,
              _state,
              _modalDispatch,
              parameter,
              hackleId,
            });
          } else {
            _modalDispatch(SEARCH_MODAL_INIT_VALUE);
          }
        }}
        failedCallback={() => {
          _modalDispatch(SEARCH_MODAL_INIT_VALUE);
        }}
      />
    </ModalComponent>
  );
};
