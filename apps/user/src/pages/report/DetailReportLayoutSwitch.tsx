import { Fragment, ReactNode } from 'react';
import { Default } from '@/components/layouts';
import { isFalsy } from '@/utils/isFalsy';
interface IDetailReportSwitchProps {
  isUser: boolean;
  children?: ReactNode;
  main: (TGetMainReportDataType & TKeywordInfo & TMarketSize & TRecommendKeyword) | null;
}

export const DetailReportLayoutSwitch = ({
  isUser,
  children,
  main,
}: IDetailReportSwitchProps) => {
  let Layout;
  if (isUser) {
    Layout = Default;
  } else {
    Layout = Fragment;
  }
  if (isFalsy(main) || main === null) {
    return (
      <Layout>
        <div className='flex h-full flex-col items-center justify-center self-center'>
          <div className='absolute scale-[0.3] pb-[84px]'>
            <div id='loader' />
          </div>
        </div>
      </Layout>
    );
  }

  return <Layout>{children}</Layout>;
};
