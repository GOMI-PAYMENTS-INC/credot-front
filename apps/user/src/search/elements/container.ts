import { SEARCH_ACTION } from '@/search/reducer';

import { isFalsy } from '@/utils/isFalsy';
import { MODAL_TYPE_ENUM, STATUS_CODE } from '@/types/enum.code';

import { getReportExisted, postCreateReport } from '@/search/api';

import {
  _amplitudeKeywordReportRequested,
  _amplitudeKeywordSearched,
} from '@/amplitude/amplitude.service';

const makeJobId = () => {
  const PREFIX = 'cr_report_';

  const date = new Date();
  const month = date.getMonth() + 1;
  const [_, _a, day, year, time] = date.toString().split(' ');
  const _time = time.split(':').join('');
  return PREFIX + year + month + day + _time;
};

const requestReport = async ({
  _state,
  parameter,
  _dispatch,
  _setTrigger,
}: TRequestReport) => {
  const { keyword, country, sortBy } = _state;
  const { count } = parameter;

  try {
    if (_state.isModalOpen === false) {
      const res = await getReportExisted({
        country: country,
        sortBy: sortBy,
        text: keyword,
      });

      const reportInfo = res?.data;

      if (isFalsy(reportInfo?.data) === false) {
        const { isDaily, createdAt } = reportInfo!.data!;
        if (isDaily) {
          _dispatch({
            type: SEARCH_ACTION.SWITCH_MODAL,
            payload: { isModalOpen: true, modalType: MODAL_TYPE_ENUM.NotBeOverDayReport },
          });
        } else {
          _dispatch({
            type: SEARCH_ACTION.SWITCH_MODAL,
            payload: {
              isModalOpen: true,
              modalType: MODAL_TYPE_ENUM.SameKeywordReportExisted,
            },
          });
          _dispatch({ type: SEARCH_ACTION.UPDATE_CREATED_AT, payload: createdAt });
        }
        return _setTrigger(false);
      }

      if (isFalsy(count) || count! < 300) {
        _dispatch({
          type: SEARCH_ACTION.SWITCH_MODAL,
          payload: {
            isModalOpen: true,
            modalType: MODAL_TYPE_ENUM.LessMonthlyKeywordVolume,
          },
        });
        return _setTrigger(false);
      }
    }
    return await createReport({ _dispatch, _state, parameter, _setTrigger });
  } catch (error) {
    console.error(error);
  }
};

const createReport = async (props: TRequestReport) => {
  const {
    parameter: { reportInvokeId },
    _state,
    _dispatch,
    _setTrigger,
  } = props;

  const { keyword, country, sortBy } = _state;
  const jobId = makeJobId();
  if (isFalsy(reportInvokeId)) throw new Error('리포트 생성 로직에 문제가 있습니다.');
  try {
    const postReport = await postCreateReport({
      reportInvokeId: reportInvokeId!,
      country: country,
      sortBy: sortBy,
      jobId: jobId,
    });

    if (postReport?.code === STATUS_CODE.SUCCESS) {
      const { isSendSms, reportId } = postReport?.data;
      if (isSendSms) {
        _dispatch({
          type: SEARCH_ACTION.SWITCH_MODAL,
          payload: {
            isModalOpen: true,
            modalType: MODAL_TYPE_ENUM.MakeReportSuccesses,
          },
        });
      } else {
        _dispatch({
          type: SEARCH_ACTION.SWITCH_MODAL,
          payload: {
            isModalOpen: true,
            modalType: MODAL_TYPE_ENUM.MakeDuplicateReportSuccesses,
          },
        });
      }
      _dispatch({ type: SEARCH_ACTION.SET_NEW_REPORT_ID, payload: reportId });
      _setTrigger(false);
      _amplitudeKeywordReportRequested(reportId, country, sortBy, keyword, jobId);
    }

    return postReport;
  } catch (error) {
    console.error(error);
  }
};

export const searchRequestHandler = (props: TRequestReport) => {
  requestReport({ ...props });
};

export const switchModal = ({ _dispatch, _setTrigger }: TSwitchModal) => {
  _setTrigger ?? _setTrigger(false);
  _dispatch({
    type: SEARCH_ACTION.SWITCH_MODAL,
    payload: { isModalOpen: false },
  });
};
