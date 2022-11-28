import { useState } from 'react';

import ModalComponent from '@/components/Modal/modal';
import { ModalComponentProps } from '@/components/Modal/types';

export const JoinModalComponent = ({ isModalVisible, hide }: ModalComponentProps) => {
  // 인증번호 발송 진행중 여부
  const [isSending, setSending] = useState<boolean>(false);

  // 인증번호 발송 횟수
  const [countSend, setCountSend] = useState<number>(0);

  // 인증 완료 여부
  const [isMobileCheck, setMobileCheck] = useState<boolean>(false);

  // 인증번호 발송
  const waitSend = () => {
    alert('발송중입니다. 조금만 기다려주세요');
  };

  // 인증번호 발송
  const sendMobileCheck = () => {
    // 인증번호 발송 시작
    setSending(true);
    setTimeout(() => {
      // TODO : 인증번호 발송 작동
      // 인증완료 처리
      setMobileCheck(true);
      // 인증 진행 완료
      setSending(false);
    }, 2000);
  };

  // 인증번호 발송 프로세스
  const sendMobileCheckP = () => {
    // TODO : 인증 버튼 여러번 눌렀을 경우에만 아래 코드 실행
    if (!isSending) {
      // TODO : 인증번호 발송 작동
      sendMobileCheck();
      // 발송 횟수 추가
      setCountSend(countSend + 1);
    } else {
      // 발송중
      waitSend();
    }
  };

  // 초기화
  const init = () => {
    // 발송 완료 상태 초기화
    setCountSend(0);
    setSending(false);
    setMobileCheck(false);
  };

  // 모달 닫을 때 상태 초기화

  return isModalVisible ? (
    <ModalComponent hide={hide} title='회원가입' onCancel={init}>
      <form action='' className='space-y-5'>
        <div className='space-y-2'>
          <div className='space-y-2'>
            <input
              className=' w-full rounded border border-gray-300 px-4  py-2 text-base focus:border-green-400 focus:outline-none'
              type='email'
              name='email'
              placeholder='이메일'
            />
            <p className='text-2xs-regular text-functional-error'>
              올바른 이메일주소를 입력하세요.
            </p>
          </div>
          <div className='space-y-2'>
            <input
              className='w-full content-center rounded border border-gray-300 px-4  py-2 text-base focus:border-green-400 focus:outline-none'
              type='password'
              name='password'
              placeholder='비밀번호'
            />
          </div>
          <div className='space-y-2'>
            <input
              className='w-full content-center rounded border border-gray-300 px-4  py-2 text-base focus:border-green-400 focus:outline-none'
              type='password'
              name='password'
              placeholder='비밀번호 확인'
            />
            <p className=' text-2xs-regular text-functional-error'>
              비밀번호가 일치하지 않습니다.
            </p>
          </div>
          <div className='flex items-center'>
            <input
              className='w-full content-center rounded border border-gray-300 px-4  py-2 text-base focus:border-green-400 focus:outline-none'
              type='text'
              name='phone'
              placeholder='휴대폰번호 - 없이 입력'
            />

            {/* 발송 여부에 따른 버튼 출력이 다름 시작 */}
            {/* eslint-disable-next-line no-nested-ternary */}
            {/* 발송하기전 */}
            {countSend === 0 ? (
              <button
                type='button'
                className='ml-2 min-w-[4.6875rem] rounded border border-primary-red-orange bg-orange-100 p-2.5  text-sm font-medium text-functional-error'
                onClick={sendMobileCheckP}
              >
                인증
              </button>
            ) : !isSending ? (
              <button
                type='button'
                className='ml-2 min-w-[4.6875rem] rounded border border-primary-red-orange bg-orange-100 p-2.5  text-sm font-medium text-functional-error'
                onClick={sendMobileCheckP}
              >
                재발송
              </button>
            ) : (
              <button
                type='button'
                className='ml-2 min-w-[4.6875rem] rounded border-0 bg-gray-300  p-2.5 text-sm  text-gray-500'
                onClick={sendMobileCheckP}
              >
                재발송
              </button>
            )}
            {/* 발송 여부에 따른 버튼 출력이 다름 끝 */}
          </div>
          <div className='space-y-2'>
            <div className='w-full content-center rounded border border-gray-300 px-4  py-2 text-base focus:border-green-400 focus:outline-none'>
              <input
                className='w-5/6 border-0'
                type='password'
                name='password'
                placeholder='인증번호'
              />
              <span className='inline-block w-1/6 text-right text-functional-error'>
                1:00
              </span>
            </div>
            <p className='text-2xs-regular text-functional-error'>
              인증시간이 만료되었습니다. 다시 인증해 주세요.
            </p>
          </div>
        </div>

        <div className='space-y-5'>
          <ul className='space-y-3'>
            <li>
              <input type='checkbox' name='all-agree' id='all-agree' />
              <label htmlFor='all-agree' className='m-regular inline-block'>
                이용약관, 개인정보 수집 및 이용에 모두 동의합니다.
              </label>
            </li>
            <li className='flex justify-between'>
              <input type='checkbox' name='use-agree' id='use-agree' />
              <label htmlFor='use-agree' className='m-regular inline-block'>
                이용약관 동의(필수)
              </label>

              <a href='#' className='s-regular'>
                보기 &gt;
              </a>
            </li>
            <li className='flex justify-between'>
              <input type='checkbox' name='personal-agree' id='personal-agree' />
              <label htmlFor='personal-agree' className='m-regular inline-block'>
                개인정보 수집 및 이용 동의(필수)
              </label>

              <a href='#' className='s-regular'>
                보기 &gt;
              </a>
            </li>
            <li className='flex justify-between'>
              <input type='checkbox' name='marketing-agree' id='marketing-agree' />
              <label htmlFor='marketing-agree' className='m-regular inline-block'>
                마케팅 정보 활용 및 서비스 관련 수신 동의(선택)
              </label>
              <a href='#' className='s-regular'>
                보기 &gt;
              </a>
            </li>
          </ul>
          <div>
            <button
              type='submit'
              className='flex w-full cursor-pointer justify-center rounded bg-primary-red-orange p-2.5 text-xl-medium text-white'
            >
              가입하기
            </button>
          </div>
        </div>
      </form>
    </ModalComponent>
  ) : null;
};
function waitSend() {
  throw new Error('Function not implemented.');
}
