import { PATH } from '@/router/routeList';
import { useLocation } from 'react-router-dom';
import { _patchUserCard, _deleteUserCard, clearUserCards } from '@/subscribe/container';
import { useSetRecoilState } from 'recoil';
import { UserCardsAtom } from '@/atom';

interface ISwitchOption {
  userCard: TUserCard;
}

export const SwitchOption = ({ userCard }: ISwitchOption) => {
  const isSubscriptionPage = useLocation().pathname === PATH.SUBSCRIBE;
  const setUserCards = useSetRecoilState(UserCardsAtom);
  if (isSubscriptionPage) {
    return (
      <>
        {userCard.isMain ? (
          <p className='self-center text-M/Regular'>기본</p>
        ) : (
          <div className='flex gap-[14px] '>
            <button
              className='text-M/Regular underline'
              onClick={async () => {
                _patchUserCard(userCard.id, setUserCards, true);
              }}
            >
              변경
            </button>
            <button
              className='text-M/Regular text-grey-500 underline decoration-grey-500'
              onClick={() => {
                _deleteUserCard(userCard.id, setUserCards);
              }}
            >
              삭제
            </button>
          </div>
        )}
      </>
    );
  }

  return <></>;
};
