import { gasStationIcon, hospitalIcon, restaurantIcon } from '@/v3/pages/landing/assets';

function CustomerItems({
  icon,
  content1 = [],
  content2 = [],
}: {
  icon: string;
  content1?: string[];
  content2?: string[];
}) {
  return (
    <div className='flex min-w-[1035px]'>
      <div className='w-[90px] text-center'>
        <div className='h-[90px] rounded-[50px] bg-white'>
          <img src={icon} className='mx-auto py-[19px]' width={50} />
        </div>
        <div className='mt-[6px] text-M/Bold text-white'>병원</div>
      </div>
      <div className='mx-[50px] h-[40px] w-[1px] self-center bg-grey-400' />
      <div className='self-center'>
        {(content1.length && (
          <div className='flex text-L/Medium text-white'>
            {content1.map((content, index) => (
              <div className={`mr-[25px] opacity-${100 - index * 10}`} key={content}>
                {content}
              </div>
            ))}
          </div>
        )) ||
          null}
        {(content2.length && (
          <div className='mt-[14px] flex text-L/Medium text-white'>
            {content2.map((content, index) => (
              <div className={`mr-[25px] opacity-${100 - index * 10}`} key={content}>
                {content}
              </div>
            ))}
          </div>
        )) ||
          null}
      </div>
    </div>
  );
}

export const Customer = () => {
  return (
    <div className='w-full bg-gradient-to-b from-purple-300 to-purple-900 py-[92px]'>
      <div className='mx-auto w-[1100px]'>
        <div className='mt-[80px] text-center text-[27px] font-bold text-white'>
          다양한 업종의 사업자분들과 <br />
          안정적인 비즈니스를 함께 만들어갑니다.
        </div>

        <div className='flex-start mx-auto mt-[50px] flex flex-col gap-10'>
          <CustomerItems
            icon={hospitalIcon}
            content1={[
              '마인드 성형외과',
              '나우리 신경외과',
              '인천퍼스트안과',
              '서울밝은안과',
              '엠에스안과 평택',
              'ABC 병원',
              '위드힘 병원',
            ]}
            content2={[
              '삼성새봄안과',
              '우아한피부과',
              '엠에스안과 향동',
              '밝은눈안과',
              '메디업파트너스',
              '감자와눈사람',
            ]}
          />
          <CustomerItems
            icon={gasStationIcon}
            content1={[
              '강상주유소',
              '백석주유소',
              '은혜주유소',
              '엑스포주유소',
              '인천주유소',
              '안성주유소',
            ]}
            content2={['음성IC주유소', 'GED 포함', '디케이본']}
          />
          <CustomerItems
            icon={restaurantIcon}
            content1={[
              '디오픈',
              '신사꽃게당',
              '청담 윤',
              '회이락',
              '클로우드',
              '새로이',
              'BGN케어',
            ]}
          />
        </div>
        <div className='col mt-[40px] flex flex-col items-center gap-5'>
          <div className='h-[16px] w-[16px] rounded-[50px] bg-white opacity-40' />
          <div className='h-[16px] w-[16px] rounded-[50px] bg-white opacity-30' />
          <div className='h-[16px] w-[16px] rounded-[50px] bg-white opacity-20' />
        </div>
      </div>
    </div>
  );
};
