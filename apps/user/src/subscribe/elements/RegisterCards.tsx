import {
  insertDash,
  _getUserCards,
  upgradePlan,
  registerCard,
  switchIsMain,
  getCardImgPath,
} from '@/subscribe/container';
import { ReactSVG } from 'react-svg';
import { useLocation, useNavigate } from 'react-router-dom';

import { useEffect, useState } from 'react';
import { PATH } from '@/router/routeList';
import { isTruthy } from '@/utils/isTruthy';
import { isFalsy } from '@/utils/isFalsy';

import { useRecoilValue, useRecoilState } from 'recoil';
import { UserCardsAtom, UserAtom } from '@/atom';
import { _cardRegistrationStarted } from '@/amplitude/amplitude.service';
import RadioButton from '@/components/RadioButton';
import { SwitchOption } from '@/subscribe/elements/DisplyCards';

interface IRegisterCards {
  uniqueKey?: TPlanUniqueKey;
}

export const RegisterCards = ({ uniqueKey }: IRegisterCards) => {
  const { pathname } = useLocation();
  const [userCards, setUserCards] = useRecoilState(UserCardsAtom);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const userInfo = useRecoilValue(UserAtom)?.me;
  const navigator = useNavigate();

  useEffect(() => {
    _getUserCards(setUserCards);
    return () => {
      setIsLoading(false);
      setIsError(false);
    };
  }, []);

  const isUpgradePage = pathname === PATH.UPGRADE_PLAN;

  const FilledCard = () => {
    return (
      <>
        <div className='flex w-full justify-end'>
          <button
            className='mt-2 flex items-center gap-[6px] pr-2 text-M/Medium'
            onClick={() => {
              _cardRegistrationStarted();
              registerCard(userInfo!.email, userInfo!.id, setUserCards);
            }}
          >
            <ReactSVG
              src='/assets/icons/filled/PlusCircle.svg'
              beforeInjection={(src) =>
                src.setAttribute('class', 'h-5 w-5 fill-grey-800')
              }
            />
            신규 카드등록
          </button>
        </div>
        {isUpgradePage && (
          <div className='mt-8'>
            <p className='text-L/Regular text-grey-800'>
              구독 서비스 설명을 확인하였으며, 30일 간격으로 정기 결제에 동의합니다.
            </p>
            <button
              disabled={isLoading}
              className='button-filled-normal-large-primary-false-false-true mt-3 w-full'
              onClick={() => {
                if (isFalsy(userCards) === false) setIsLoading(true);
                const cardId = userCards.find((card) => card.isMain)!.id;
                upgradePlan({ cardId, uniqueKey, navigator, setIsError, userCards });
              }}
            >
              {isLoading ? (
                <div className=' scale-[0.2]'>
                  <div id='loader-white' />
                </div>
              ) : (
                '업그레이드 하기'
              )}
            </button>
          </div>
        )}
      </>
    );
  };

  const EmptyCard = () => {
    if (pathname === PATH.SUBSCRIBE) {
      return (
        <div className='flex justify-center rounded-lg border-[1px] border-grey-300 bg-grey-50'>
          <p className='py-[35px] text-L/Medium text-grey-500'>등록된 카드가 없어요</p>
        </div>
      );
    }
    return (
      <>
        <div className='border-b-[1px] border-grey-200 pb-[30px]'>
          <button
            id='registed_card'
            className={`flex w-full justify-center rounded-lg border-[1px] ${
              isError ? 'border-red-500' : 'border-grey-300'
            } bg-grey-50`}
            onClick={() => {
              _cardRegistrationStarted();
              if (isError) {
                setIsError(false);
              }

              registerCard(userInfo!.email, userInfo!.id, setUserCards);
            }}
          >
            <div className='flex flex-col items-center justify-center py-[14px]'>
              <ReactSVG
                src='/assets/icons/outlined/PlusCircle.svg'
                className='mb-[6px]'
              />
              <p className='text-L/Medium text-grey-500'>신규 카드등록</p>
            </div>
          </button>
          {isError && (
            <div className='flex items-center pt-[6px]'>
              <ReactSVG
                src='/assets/icons/outlined/ExclamationCircle.svg'
                beforeInjection={(src) =>
                  src.setAttribute('class', 'fill-red-500 w-5 h-5')
                }
              />
              <p className='pl-2 text-M/Regular text-red-500'>
                결제하실 수단을 먼저 등록해주세요.
              </p>
            </div>
          )}
        </div>
        {FilledCard()}
      </>
    );
  };

  return (
    <div className='flex-grow space-y-5 text-2XL/Bold'>
      <p>
        결제 수단
        <span className='ml-[15px] text-M/Medium text-grey-500'>
          정기 결제일에 사용될 카드에요.
        </span>
      </p>
      <div id='registed_card' className='w-[448px]'>
        {isTruthy(userCards) ? (
          <>
            <div
              id='scrollbar'
              className={`max-h-[270px] overflow-auto pr-2 ${
                isUpgradePage && 'border-b-[1px] border-grey-200 pb-5'
              }`}
            >
              {userCards.map((card) => {
                const isMain = card.isMain
                  ? 'border-orange-400 bg-orange-100'
                  : 'border-grey-300 bg-grey-50';
                const upgradePageCss = isUpgradePage ? 'cursor-pointer' : '';
                const cardImgPath = getCardImgPath(card.cardCode);
                return (
                  <div
                    key={`user_card_${card.id}`}
                    className={`mb-[15px] rounded-lg ${isMain} flex items-center border-[1px] ${upgradePageCss}`}
                    onClick={() => {
                      isUpgradePage && switchIsMain(card.id, userCards, setUserCards);
                    }}
                  >
                    {isUpgradePage && (
                      <div className='ml-[18px]'>
                        <RadioButton isSelected={card.isMain} />
                      </div>
                    )}
                    <div className='flex w-full justify-between px-[18px] py-[14px]'>
                      <div className='flex items-center gap-5'>
                        <img
                          src={`/assets/images/cards/${cardImgPath}.png`}
                          className='h-12 w-[100px] border-r-[2px] border-grey-300 pr-5'
                        />
                        <div className='flex flex-col gap-[5px] text-M/Medium'>
                          <p>
                            {card.cardName === '알 수 없음' ? '기타 카드' : card.cardName}
                          </p>
                          <p className='text-M/Regular text-grey-700'>
                            {insertDash(card.cardNumber)}
                          </p>
                        </div>
                      </div>

                      <SwitchOption userCard={card} />
                    </div>
                  </div>
                );
              })}
            </div>
            {FilledCard()}
          </>
        ) : (
          EmptyCard()
        )}
      </div>
    </div>
  );
};
