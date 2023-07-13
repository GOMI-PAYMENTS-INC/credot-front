import { REPORT_CONTENT, REPORT_CONTENTS } from '@/preview/constants/reportData';
import { useMemo } from 'react';

interface TDetailReportSectionHeaderProps {
  id: REPORT_CONTENT;
}

export const DetailReportSectionHeader = ({ id }: TDetailReportSectionHeaderProps) => {
  const headerSpaceStyle = useMemo(() => {
    const space = 150;
    return { marginTop: -space, paddingTop: space + 30 };
  }, []);
  const title = REPORT_CONTENTS.find((content) => content.key === id)?.text;
  return (
    <div
      id={id}
      style={headerSpaceStyle}
      className='detailReport-h1-header relative mb-6 flex items-center text-2XL/Bold text-black'
    >
      <h1>{title}</h1>
    </div>
  );
};
