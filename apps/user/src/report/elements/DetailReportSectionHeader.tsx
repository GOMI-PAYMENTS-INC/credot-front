import { STYLE_ENUM, TITLE } from '@/types/enum.code';
import { convertTitle } from '@/utils/convertEnum';
import { ReactSVG } from 'react-svg';
import { PlacesType, Tooltip } from 'react-tooltip';
import { useMemo } from 'react';

interface TDetailReportSectionHeaderProps {
  id: TITLE;
  isTooltip?: boolean;
  tooltipInfo?: {
    iconPath: string;
    tooltipPlace?: PlacesType;
    tooltipText?: string;
    tooltipRender?: JSX.Element;
  };
}

export const DetailReportSectionHeader = ({
  id,
  isTooltip = false,
  tooltipInfo,
}: TDetailReportSectionHeaderProps) => {
  const headerSpaceStyle = useMemo(() => {
    const paddingTop = STYLE_ENUM.REPORT_DETAIL_BODY_PADDING_TOP;
    const headerHeight = STYLE_ENUM.REPORT_DETAIL_HEADER_HEIGHT;
    const space = paddingTop + headerHeight;

    return { marginTop: -space, paddingTop: space };
  }, []);

  return (
    <div
      id={id}
      style={headerSpaceStyle}
      className='detailReport-h1-header relative flex items-center text-2XL/Bold text-black'
    >
      <h1>{convertTitle(id)}</h1>
      {isTooltip && tooltipInfo && (
        <div className='tooltip-container'>
          <a data-tooltip-id={id} data-tooltip-html={tooltipInfo.tooltipText || ''}>
            <ReactSVG src={tooltipInfo.iconPath} className='inline-block pl-[7px]' />
          </a>

          <Tooltip
            id={id}
            place={tooltipInfo.tooltipPlace || 'right'}
            variant='light'
            render={() => tooltipInfo.tooltipRender || 'null'}
          ></Tooltip>
        </div>
      )}
    </div>
  );
};
