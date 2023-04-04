import { ReactSVG } from 'react-svg';

const Landing = () => {
  return (
    <div className='flex h-full flex-col'>
      <div className='flex h-full flex-col items-center justify-center'>
        <ReactSVG src='/assets/icons/outlined/Translation.svg' />
        <p className='pt-4 text-L/Medium text-grey-800'>번역할 키워드를 입력해주세요.</p>

        <div className='mt-6 flex w-[312px] flex-col rounded-[10px] bg-grey-300'>
          <div className='flex flex-col px-3 py-3 text-XS/Regular text-grey-800'>
            <h1 className='text-XS/Bold text-grey-900'>서비스 안내</h1>
            <p className='pt-1'>
              키워드 번역은 OpenAI에서 제공하는 ChatGPT 서비스를
              <br />
              활용해 키워드 추출 및 번역을 도와드리는 서비스에요.
            </p>
          </div>
        </div>

        <div className='mt-2 flex w-[312px] flex-col rounded-[10px] bg-grey-300'>
          <div className='flex flex-col px-3 py-3 text-XS/Regular text-grey-800'>
            <h1 className='text-XS/Bold text-grey-900'>주의해주세요.</h1>
            <p className='pt-1'>
              본 서비스의 주체는 고미인사이트가 아닌 OpenAI에 의해
              <br />
              제공되며, 2021년 이후 생성된 신규 단어이거나 입력된 키워
              <br />
              드에 따라 정확하지 않은 정보가 제공될 수 있어요.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const NoneDataError = () => {
  return (
    <div className='flex h-full flex-col items-center justify-center'>
      <ReactSVG
        src='/assets/icons/outlined/ExclamationCircle.svg'
        beforeInjection={(svg) => {
          svg.setAttribute('class', `w-[35px] h-[35px] fill-grey-400`);
        }}
      />
      <div className='flex flex-col items-center pt-[18.5px] text-center'>
        <p className='text-L/Medium text-grey-800'>
          서버로부터 데이터를 불러오지 못했어요.
          <br />
          잠시 후 다시 시도 해주세요.
        </p>
      </div>
    </div>
  );
};

const NoneDataLoading = () => {
  return (
    <div className='flex h-full flex-col items-center justify-center'>
      <div className='flex h-[100px] w-[100px] items-center justify-center opacity-[0.3] '>
        <img src='/assets/images/GptLoading.gif' />
      </div>
      <p className='text-L/Medium text-grey-800'>
        관련 키워드들을 추출하고 번역중이에요.
      </p>
    </div>
  );
};

export { NoneDataError, NoneDataLoading, Landing };
