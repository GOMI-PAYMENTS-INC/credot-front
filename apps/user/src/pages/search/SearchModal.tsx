import { Dispatch, Fragment, SetStateAction, useEffect, useState } from 'react';
import { switchModal } from '@/containers/search';
import { convertTime } from '@/utils/parsingTimezone';
import { MODAL_SIZE_ENUM, MODAL_TYPE_ENUM } from '@/types/enum.code';
import { useNavigate } from 'react-router-dom';

interface ISearchModalPrpos {
  data?: any;
  _state: TSearchState;
  _dispatch: Dispatch<TSearchActionType>;
  size: string;
  _setTrigger: Dispatch<SetStateAction<boolean>>;
}

export const SearchModal = ({
  _state,
  _dispatch,
  data,
  size,
  _setTrigger,
}: ISearchModalPrpos) => {
  const createdAt = convertTime(_state.createdAt, 'YYYY.MM.DD');
  const [eventTrigger, setEventTrigger] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (eventTrigger === false) return;
    const switchModalAsync = async () => {
      await switchModal({ _setTrigger, _dispatch, _state, data });
      setEventTrigger(false);
    };
    switchModalAsync();
  }, [eventTrigger]);

  const modalType = () => {
    switch (_state.modalType) {
      case MODAL_TYPE_ENUM.MakeReportSuccesses:
        return {
          title: '리포트 요청 완료!',
          content: <Fragment>리포트 생성이 완료되면, 문자로 알려드릴께요!</Fragment>,
          onCancel: {
            name: '다음 키워드 검색하기',
            cancelEvent: async () => {
              await switchModal({ _setTrigger, _dispatch });
            },
          },
        };
      case MODAL_TYPE_ENUM.MakeDuplicateReportSuccesses:
        return {
          title: '리포트 생성 완료!',
          content: <Fragment>생성된 리포트를 지금 확인하실 수 있습니다.</Fragment>,
          onConfirm: {
            name: '리포트 확인하기',
            confirmEvent: () => navigate(`/report/${_state.newReportId}`),
          },
        };

      case MODAL_TYPE_ENUM.LessMonthlyKeywordVolume:
        return {
          title: '키워드 수요가 많지 않아요!',
          content: <Fragment>다른 키워드로 리포트를 생성하는걸 권장드려요. </Fragment>,
          onCancel: {
            name: '다른 키워드 검색',
            cancelEvent: async () => {
              await switchModal({ _setTrigger, _dispatch });
            },
          },
          onConfirm: {
            name: '그래도 생성하기',
            confirmEvent: async () => {
              await switchModal({ _setTrigger, _dispatch, _state, data });
            },
          },
        };

      case MODAL_TYPE_ENUM.NotBeOverDayReport:
        return {
          title: '24시간 이내로 발행한 동일한 키워드 리포트가 있어요.',
          content: (
            <Fragment>
              생성일 : {`${createdAt}`}
              <br />
              다른 키워드로 다시 검색해주세요.
            </Fragment>
          ),
          onCancel: {
            name: '다른 키워드 검색',
            cancelEvent: async () => {
              await switchModal({ _setTrigger, _dispatch });
            },
          },
        };

      default:
        return {
          title: '동일한 키워드 리포트가 있어요.',
          content: (
            <Fragment>
              최근 생성일 : {`${createdAt}`}
              <br />
              리포트를 새로 생성할까요?
            </Fragment>
          ),
          onCancel: {
            name: '다른 키워드 검색',
            cancelEvent: async () => {
              await switchModal({ _setTrigger, _dispatch });
            },
          },
          onConfirm: {
            name: '새로 생성하기',
            confirmEvent: async () => {
              await switchModal({ _setTrigger, _dispatch, _state, data });
            },
          },
        };
    }
  };

  const modal: IModalType = modalType();

  return (
    <Fragment>
      <div
        className={`${
          size === MODAL_SIZE_ENUM.LARGE ? ' h-[244px] w-[400px]' : 'h-[211px] w-[298px]'
        } relative max-w-md md:h-auto`}
      >
        <div className='relative rounded-[10px] bg-white p-6'>
          <header className='pb-2'>
            <h3
              className={`${
                size === MODAL_SIZE_ENUM.LARGE ? ' text-2XL/Bold' : 'text-L/Bold'
              } text-center text-grey-900`}
            >
              {modal.title}
            </h3>
          </header>
          {modal.content && (
            <section
              className={`${
                size === MODAL_SIZE_ENUM.LARGE ? 'text-L/Medium' : 'text-M/Medium'
              } py-2 text-grey-800`}
            >
              {modal.content}
            </section>
          )}

          <footer className='flex justify-between pt-4'>
            {modal.onCancel && (
              <button
                type='button'
                className='button-filled-normal-large-grey-false-false-true w-full'
                onClick={() => modal.onCancel?.cancelEvent()}
                disabled={eventTrigger}
              >
                {modal.onCancel.name}
              </button>
            )}
            {modal.onConfirm && (
              <Fragment>
                <div className='w-4' />
                <button
                  type='button'
                  className='button-filled-normal-large-primary-false-false-true w-full'
                  onClick={() => {
                    modal.onConfirm?.confirmEvent() || setEventTrigger(true);
                  }}
                >
                  {eventTrigger ? (
                    <div className=' scale-[0.2]'>
                      <div id='loader-white' />
                    </div>
                  ) : (
                    <Fragment>{modal.onConfirm.name}</Fragment>
                  )}
                </button>
              </Fragment>
            )}
          </footer>
        </div>
      </div>
    </Fragment>
  );
};
