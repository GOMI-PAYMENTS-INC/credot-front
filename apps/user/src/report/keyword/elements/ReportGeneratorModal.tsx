import { SetStateAction, useState, Dispatch } from 'react';
import { ModalComponent } from '@/components/modals/ModalComponent';
import { SORT_BY_TYPE } from '@/types/enum.code';
import { updateSortingType, initializeModal } from '@/report/keyword/container';

import { Selector } from '@/report/keyword/elements/Selector';
import { convertSortByIconPath, convertSortedType } from '@/utils/convertEnum';
import { DROPDOWN_STATUS, DROPDOWN_VARIANTS } from '@/components/dropDown';

interface IReportGeneratorModal {
  reportTrigger: TSearchTrigger;
  setReportTrigger: Dispatch<SetStateAction<TSearchTrigger>>;
}
export const ReportGeneratorModal = ({
  reportTrigger,
  setReportTrigger,
}: IReportGeneratorModal) => {
  const { isOpen, text } = reportTrigger;
  const init: TReportGeneratorType[] = Object.keys(SORT_BY_TYPE).map((sortBy) => {
    const sortByEnum = SORT_BY_TYPE[sortBy as keyof typeof SORT_BY_TYPE];
    return {
      value: sortByEnum,
      text: convertSortedType(sortByEnum),
      iconPath: convertSortByIconPath(sortByEnum),
    };
  });

  const [sortingType, setSortingType] = useState<TReportGeneratorType>(init[0]);

  return (
    <ModalComponent isOpen={isOpen}>
      <div className='flex flex-col gap-2.5 rounded-[10px] border-[1px] border-grey-200 bg-white p-[23px] shadow-[0_1px_2px_0_rgba(0,0,0,0.15)]'>
        <p className='text-2XL/Bold'>리포트를 생성하시겠어요?</p>
        <p className='mb-[13px] text-M/Medium text-grey-700'>{text}</p>
        <Selector
          name='filterOption'
          minWidth={140}
          value={sortingType.text}
          isUseIcon={true}
          iconPath={convertSortByIconPath(sortingType.value)}
          options={init}
          status={DROPDOWN_STATUS.FILLED}
          variants={DROPDOWN_VARIANTS.CLEAR}
          onClickOption={(item) => {
            updateSortingType(item as string, init, setSortingType);
          }}
        />
        <button
          className='button-filled-normal-large-primary-false-false-true mt-[14px] w-[352px] xs:w-[262px]'
          onClick={() => {
            console.log(reportTrigger, 'reportTrigger');
            initializeModal(reportTrigger, setReportTrigger);
          }}
        >
          생성하기
        </button>
      </div>
    </ModalComponent>
  );
};
