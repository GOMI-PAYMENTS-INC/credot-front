import { Fragment } from 'react';
import { MODAL_TYPE_ENUM } from '@/types/enum.code';
import { convertTime } from '@/utils/parsingTimezone';
import { IRequestReportModalType } from '@/report/keyword/elements/Modal';

export const ReportModalType = ({
  modalType,
  createdAt,
  successCallback,
  failedCallback,
}: IRequestReportModalType) => {
  const _createdAt = convertTime(createdAt, 'YYYY.MM.DD');

  switch (modalType) {
    case MODAL_TYPE_ENUM.MakeReportSuccesses:
      return {
        title: '리포트 요청 완료!',
        content: <Fragment>리포트 생성이 완료되면, 문자로 알려드릴께요!</Fragment>,
        onCancel: {
          name: '다음 키워드 검색하기',
          cancelEvent: async () => {
            failedCallback();
          },
        },
      };
    case MODAL_TYPE_ENUM.MakeDuplicateReportSuccesses:
      return {
        title: '리포트 생성 완료!',
        content: <Fragment>생성된 리포트를 확인해주세요.</Fragment>,
        onCancel: {
          name: '닫기',
          cancelEvent: async () => {
            failedCallback();
          },
        },
        onConfirm: {
          name: '바로 확인하기',
          confirmEvent: () => successCallback(),
        },
      };

    case MODAL_TYPE_ENUM.LessMonthlyKeywordVolume:
      return {
        title: '키워드 수요가 많지 않아요!',
        content: <Fragment>다른 키워드로 리포트를 생성하는걸 권장드려요. </Fragment>,
        onCancel: {
          name: '다른 키워드 검색',
          cancelEvent: async () => {
            failedCallback();
          },
        },
        onConfirm: {
          name: '그래도 생성하기',
          confirmEvent: async () => {
            successCallback();
          },
        },
      };

    case MODAL_TYPE_ENUM.NotBeOverDayReport:
      return {
        title: '24시간 이내로 발행한 동일한 키워드 리포트가 있어요.',
        content: (
          <Fragment>
            생성일 : {`${_createdAt}`}
            <br />
            다른 키워드로 다시 검색해주세요.
          </Fragment>
        ),
        onCancel: {
          name: '다른 키워드 검색',
          cancelEvent: async () => {
            failedCallback();
          },
        },
      };

    default:
      return {
        title: '동일한 키워드 리포트가 있어요.',
        content: (
          <Fragment>
            최근 생성일 : {`${_createdAt}`}
            <br />
            리포트를 새로 생성할까요?
          </Fragment>
        ),
        onCancel: {
          name: '다른 키워드 검색',
          cancelEvent: async () => {
            failedCallback();
          },
        },
        onConfirm: {
          name: '새로 생성하기',
          confirmEvent: async () => {
            successCallback();
          },
        },
      };
  }
};
