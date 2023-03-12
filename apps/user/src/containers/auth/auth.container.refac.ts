import { Dispatch, SetStateAction } from 'react';

export const isClickVerifyBtn = (
  _state: TVerifyButtonState,
  _setState: Dispatch<SetStateAction<TVerifyButtonState>>,
) => {
  const { firstCalled, theElseCalled } = _state;

  if (firstCalled === false) {
    const payload = Object.assign({}, _state, { firstCalled: true });
    _setState(payload);
    return;
  }

  const payload = Object.assign({}, _state, { theElseCalled: !theElseCalled });
  _setState(payload);
};

/*
시간이 초기화 되어야 할 때
case 1. 인증 성공 시
case 2. 시간이 초과되었을 경우
case 3. 재요청 5회 초과 시 5분
*/
