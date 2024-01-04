import { Collapse, ConfigProvider, Divider } from 'antd';
import { isMobile } from 'react-device-detect';
import styled from 'styled-components';

const CustomFAQWrapper = styled.div`
  .ant-collapse-item {
    border: none;
  }

  .ant-collapse-expand-icon {
    padding-right: ${isMobile ? '12px !important' : '36px !important'};
  }

  .ant-collapse {
    padding-top: ${isMobile ? '24px' : '56px'};
    padding-bottom: ${isMobile ? '24px' : '56px'};
  }
`;

const FAQContents = [
  {
    key: '1',
    label: '크래닷은 어떤 서비스인가요?',
    children:
      '크래닷은 온/오프라인 사장님들께서 PG, 쇼핑몰, VAN사로부터 정산 받으실 금액을 기반으로 빠른 현금 유동성 재무관리를 위해 일정의 수수료를 취하고 선지급을 대신 해드리는 서비스에요.',
  },
  {
    key: '2',
    label: '선정산을 받을 수 있는 한도는 어떤 기준으로 계산되나요?',
    children:
      '사업장의 최근 매출, 선정산 서비스 이용 금액, 업력 등 다양한 내부적인 평가 요소들을 기준으로 한도율을 계산하고 있어요.',
  },
  {
    key: '3',
    label: '어떤 장점이 있고 언제 도움을 받을 수 있나요?',
    children:
      '선정산 서비스는 자금 회전이 잘 되지 않아 발생할 수 있는 흑자도산을 예방하거나 시세변동이 있는 재고(기름, 주류 등)를 다루는 업종에서 저렴한 매입 시기에 많은 재고를 확보할 수 있도록 도움을 드려요.',
  },
  {
    key: '4',
    label: '선정산에 대한 수수료는 얼마인가요?',
    children: (
      <div>
        선정산 서비스 수수료는 정산 단축일 x 선정산 금액의 0.1% 이며, 같은날 발생한
        매출이라도 카드사에 따라 정산 주기가 다르기 때문에 서비스 수수료는 달라질 수
        있어요. <br />
        <small className='mt-[16px] text-orange-500'>
          ex) 3일 후 정산 예정인 A 카드사의 10,000원 매출을 금일 선정산 받는 경우,
          10,000*0.001*3= 30원
        </small>
      </div>
    ),
  },
  {
    key: '5',
    label: '선정산금은 어떻게 납부하나요?',
    children:
      '정산금 납부는 카드사 정산일에 자동으로 이체되어요. 따라서 정산일에는 카드사로부터 들어온 정산금을 사용 또는 출금하지 마시고 그대로 잔액을 유지해 주세요.',
  },
  {
    key: '5',
    label: '그 외 추가적인 문의가 있어요!',
    children:
      '그 외 추가적인 문의가 있으신 경우 kai@gomipayments.com으로 문의주시면 최대한 빠른 답변드릴께요.',
  },
];

export const Faq = () => {
  return (
    <div
      className={`flex flex-col items-center bg-grey-50 ${
        isMobile ? 'py-[60px]' : 'py-[94px]'
      }`}
    >
      <div className={`${isMobile ? 'text-XL/Bold' : 'text-2XL/Bold '}`}>
        <span className='text-purple-500'>자주 묻는 질문을 모았어요.</span>
      </div>
      <div
        className={`mt-[30px] ${
          isMobile ? 'mt-[10px] text-[28px] font-bold leading-[40px]' : 'text-3XL/Bold'
        }`}
      >
        <span className='text-grey-900'>FAQ</span>
      </div>
      <CustomFAQWrapper
        className={isMobile ? 'mt-[30px] px-[24px]' : 'mt-[40px] w-[880px]'}
      >
        <ConfigProvider
          theme={{
            components: {
              Collapse: {
                headerBg: 'white',
              },
            },
          }}
        >
          <Collapse
            className='shadow-sm'
            bordered={false}
            expandIconPosition='end'
            defaultActiveKey={FAQContents.map((item) => item.key)}
            items={FAQContents.map((item, index) => ({
              key: item.key,
              label: (
                <div
                  className={`${
                    isMobile ? 'pl-[12px] text-L/Bold' : 'text-XL/Bold'
                  } px-[36px] text-grey-900`}
                >
                  {item.label}
                </div>
              ),
              children: (
                <>
                  <div
                    className={`${
                      isMobile ? 'pl-[12px] text-S/Regular' : 'text-M/Medium'
                    } px-[36px] text-grey-700`}
                  >
                    {item.children}
                  </div>
                  {FAQContents.length - 1 !== index && <Divider className='mb-0' />}
                </>
              ),
            }))}
          />
        </ConfigProvider>
      </CustomFAQWrapper>
    </div>
  );
};
