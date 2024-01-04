import './styles/ServiceBenefit.css';

import { Layout } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ReactSVG } from 'react-svg';

import { PATH } from '@/common/constants';
import { logo } from '@/v3/pages/landing/assets';
import {
  Customer,
  CustomerType,
  Epilogue,
  Faq,
  FutureFund,
  Intro,
  ServiceFee,
  ServicePreview,
} from '@/v3/pages/landing/components';
import { ServiceBenefit } from '@/v3/pages/landing/components/ServiceBenefit';

const { Header, Content, Footer } = Layout;

export const Landing = () => {
  const navigation = useNavigate();

  return (
    <Layout className='h-full bg-transparent'>
      <Header className='h-auto border-b border-grey-300 bg-transparent'>
        <div className='mx-auto flex w-[1100px] items-center justify-between py-[20px]'>
          <ReactSVG
            src='/assets/en-logo.svg'
            beforeInjection={(svg) => {
              svg.setAttribute('class', 'w-[140px] mx-auto');
            }}
          />
          <div>
            <div className='flex justify-center'>
              <button
                onClick={() => navigation(PATH.SIGN_IN)}
                className='h-[44px] rounded-[8px] border border-grey-300 bg-white px-[20px] text-M/Bold leading-[44px] text-grey-800 shadow-[0px_0px_50px_0px_rgba(0,0,0,0.04)]'
              >
                로그인
              </button>
              <div className='ml-[20px]'></div>
              <button className='h-[44px] rounded-[8px] bg-purple-600 px-[24px] text-M/Bold leading-[44px] text-white shadow-[0px_0px_50px_0px_rgba(0,0,0,0.04)]'>
                도입 문의하기
              </button>
            </div>
          </div>
        </div>
      </Header>
      <div className='h-auto'>
        <Content className='h-full'>
          <Intro />
          <Customer />
          <CustomerType />
          <ServicePreview />
          <ServiceBenefit />
          <ServiceFee />
          <Epilogue />
          <FutureFund />
          <Faq />
        </Content>
      </div>
      <Footer>
        <div className='mx-auto w-[1100px] py-[56px]'>
          <img src={logo} width={168} />
          <div className='mt-[24px] text-L/Bold text-grey-800'>고미페이먼츠 주식회사</div>
          <div className='mt-[24px] text-M/Regular leading-[30px] text-grey-700'>
            대표이사 : 엄희찬 | 개인정보관리책임자 : 안형준 <br />
            사업자등록번호 : 813-81-02548 <br />
            주소 : 서울시 강남구 강남대로 624, ICT 타워 7층 <br />
            메일 : kai@gomipayments.com <br />
          </div>
          <div className='mt-[24px] text-S/Medium text-grey-500'>
            Copyright © 2022 Gomi payments Inc. All rights reserved
          </div>
        </div>
      </Footer>
    </Layout>
  );
};
