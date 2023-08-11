import { STYLE_ENUM, TITLE } from '@/types/enum.code';
import { convertTitle } from '@/utils/convertEnum';
import { useMemo } from 'react';

interface TDetailReportSectionHeaderProps {
  id: TITLE;
}

export const DetailReportSectionHeader = ({ id }: TDetailReportSectionHeaderProps) => {
  const headerSpaceStyle = useMemo(() => {
    const paddingTop = STYLE_ENUM.REPORT_DETAIL_BODY_PADDING_TOP;
    const headerHeight = STYLE_ENUM.REPORT_DETAIL_HEADER_HEIGHT;
    const space = paddingTop + headerHeight;

    return { marginTop: -space + 30, paddingTop: space };
  }, []);

  return (
    <div
      id={id}
      style={headerSpaceStyle}
      className='detailReport-h1-header relative flex items-center text-2XL/Bold text-black'
    >
      <h1>{convertTitle(id)}</h1>
    </div>
  );
};
