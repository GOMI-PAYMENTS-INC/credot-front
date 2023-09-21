import { useRecoilValue } from 'recoil';
import { SubscriptionAtom } from '@/atom';
import { calculatorBar } from '@/subscribe/container';
import { useSessionStorage } from '@/utils/useSessionStorage';
import { CACHING_KEY } from '@/types/enum.code';
import { convertPlan } from '@/common/container';
import { convertTime } from '@/utils/parsingTimezone';

export const Usage = () => {
  const subscriptionPlan =
    useRecoilValue(SubscriptionAtom) || useSessionStorage.getItem(CACHING_KEY.USER_PLAN);

  const gageBar = calculatorBar(
    subscriptionPlan.count,
    subscriptionPlan.productUniqueKey,
    168,
  );
  const plan = convertPlan(subscriptionPlan.productUniqueKey as TPlanUniqueKey);
  const convertColor = (() => {
    switch (plan) {
      case 'Free':
        return 'bg-green-600';
      case 'Starter':
        return 'bg-blue-600';
      default:
        return 'bg-orange-600';
    }
  })();

  return (
    <div className='flex w-[200px]'>
      <section className='flex w-full flex-col justify-center gap-3 py-6 px-4'>
        <header>
          <div className='flex items-center justify-between text-M/Medium'>
            <p>키워드 분석</p>
            <div id='keyword_plan_card' className={`rounded-sm ${convertColor}`}>
              <p className='px-3 py-0.5 text-white'>{plan}</p>
            </div>
          </div>
        </header>

        <main className='flex flex-col gap-3'>
          <div className='flex w-[168px] rounded bg-grey-200'>
            <div style={{ width: gageBar }} className={`h-2 rounded  ${convertColor}`} />
          </div>
          <div className='flex justify-between text-S/Medium text-grey-800'>
            <p>리포트 발행 수</p>
            <p>{` ${subscriptionPlan.count}/${subscriptionPlan.totalCount}`}개</p>
          </div>
        </main>

        <footer>
          <p className='text-S/Medium text-grey-600'>
            {convertTime(subscriptionPlan.endedAt, 'YYYY.MM.DD')} 까지
          </p>
        </footer>
      </section>
    </div>
  );
};
