import MoneyImage from '@/v2/apply/assets/money.png';

export const PrefundResultContent = ({ prefund }: { prefund: number }) => {
  return (
    <>
      <div className='text-XL/Medium text-grey-800'>
        <div className='mb-[10px]'>이지샵(KICC)을 통해 사장님께서</div>
        <div>아직 정산 받지 못한 금액을 불러왔어요.</div>
      </div>
      <div className='flex items-center'>
        <img src={MoneyImage} width={131} className='mr-[24px]' />
        <div>
          <div className='text-L/Bold text-grey-800'>오늘 받을 수 있는 금액</div>
          <div className='text-3XL/Bold text-orange-400'>
            {(prefund || 0).toLocaleString()}원
          </div>
        </div>
      </div>
    </>
  );
};
