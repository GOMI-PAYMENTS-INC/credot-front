import { InfoCircleOutlined } from '@ant-design/icons';
import { Checkbox, Form, Input, Modal } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { BackIcon } from '@/components/BackIcon';
import { useMeHook } from '@/hooks/user.hook';
import { authTokenStorage } from '@/utils/authToken';
import { Default } from '@/v3/layouts';
import {
  useApplyFutureFund,
  useTodayFutureFundHook,
} from '@/v3/pages/home/hooks/future-fund.hook';
import { localeString, number } from '@/v3/util';

function parseNumber(futureFundPrice: string) {
  return Number(futureFundPrice.replace(/[^0-9]/g, ''));
}

export const FutureFundApply = () => {
  const navigation = useNavigate();
  const [form] = Form.useForm<{ futureFundPrice: string; agreed: boolean }>();
  const [open, setOpen] = useState<boolean>(false);

  const { data: futureFund } = useTodayFutureFundHook();
  useEffect(() => {
    if (futureFund && futureFund.applyStatus) {
      toast.warning('미래 정산을 이미 신청했어요.');
      navigation('/breakdown');
    }
  }, [futureFund]);

  const { data: userQueryData } = useMeHook(authTokenStorage.getToken());

  /* 미래정산신청 */
  const { mutateAsync, isLoading } = useApplyFutureFund();
  const onApply = async () => {
    const values = await form.validateFields();
    if (!userQueryData?.id) {
      return;
    }

    const res = await mutateAsync({
      userId: userQueryData?.id,
      price: parseNumber(values.futureFundPrice),
      date: dayjs().format('YYYY-MM-DD'),
    });

    if (res) {
      setOpen(true);
    }
  };

  return (
    <Default>
      <Form
        requiredMark={false}
        form={form}
        onValuesChange={(values) => {
          form.setFieldsValue({
            ...values,
            futureFundPrice: localeString(number(parseNumber(values.futureFundPrice))),
          });
        }}
      >
        <div
          className={`${isMobile ? 'w-full py-[23px]' : 'mt-[120px] w-[816px]'} mx-auto`}
        >
          <div className={`${isMobile ? 'px-[21px]' : ''}`}>
            <div>
              <BackIcon />
            </div>
            <div className={`mt-[34px] ${isMobile ? 'text-center' : ''}`}>
              <div className='text-L/Regular text-[#787884]'>
                현재 신청 가능한 미래정산금은 최대
              </div>
              <div
                className={`mt-[13px] ${
                  isMobile ? 'text-2XL/Bold' : 'text-2XL/Bold'
                } text-grey-800`}
              >
                <span className='text-purple-600'>
                  {localeString(futureFund?.limit || 0)}
                </span>
                원이에요.
              </div>
            </div>
            <div className={`mt-[49px] flex ${isMobile ? 'flex-col gap-3' : ''}`}>
              <div
                className={`flex justify-between ${
                  isMobile ? 'w-full' : 'mr-[20px] min-w-[360px] max-w-[360px]'
                }`}
              >
                <div className='h-[50px] min-w-[136px] rounded-tl-[8px] rounded-bl-[8px] bg-[#F2F2FF] text-center text-M/Medium leading-[50px] text-[#787884]'>
                  나의 한도
                </div>
                <div className='h-[50px] w-full rounded-tr-[8px] rounded-br-[8px] border-[1px] border-grey-200 px-[20px] text-right text-M/Regular leading-[50px] text-grey-800'>
                  {localeString(userQueryData?.limitFutureFund || 0)}원
                </div>
              </div>

              <div
                className={`flex justify-between ${
                  isMobile ? 'w-full' : 'min-w-[360px] max-w-[360px]'
                }`}
              >
                <div className='h-[50px] min-w-[136px] rounded-tl-[8px] rounded-bl-[8px] bg-[#F2F2FF] text-center text-M/Medium leading-[50px] text-[#787884]'>
                  이용중 금액
                </div>
                <div className='h-[50px] w-full rounded-tr-[8px] rounded-br-[8px] border-[1px] border-grey-200 px-[20px] text-right text-M/Regular leading-[50px] text-grey-800'>
                  {localeString(
                    (userQueryData?.limitFutureFund || 0) - (futureFund?.limit || 0),
                  )}
                  원
                </div>
              </div>
            </div>
          </div>
          <div
            className={`mt-[51px] rounded-[8px] bg-grey-200 py-[29px] ${
              isMobile ? 'px-[21px]' : 'px-[40px]'
            }`}
          >
            <div>
              <div className='text-M/Regular text-black'>신청 금액</div>
            </div>
            <div className='mt-[17px]'>
              <Form.Item
                name='futureFundPrice'
                className='mb-0'
                validateTrigger=''
                rules={[
                  {
                    required: true,
                    message: '미래정산금을 입력해주세요.',
                  },
                  () => ({
                    validator(_, value) {
                      if (!value) {
                        return Promise.resolve();
                      }

                      if (!parseNumber(value) || parseNumber(value) < 500_000) {
                        return Promise.reject(
                          new Error('미래정산금은 최소 50만원 이상부터 신청 가능해요.'),
                        );
                      }

                      if (parseNumber(value) > (futureFund?.limit || 0)) {
                        return Promise.reject(new Error('미래정산금 한도를 초과했어요!'));
                      }

                      return Promise.resolve();
                    },
                  }),
                ]}
                shouldUpdate
              >
                <Input
                  className={`h-[56px] w-full border-0 ${
                    isMobile ? 'text-XL/Bold' : 'text-2XL/Bold'
                  }`}
                  styles={{
                    input: { textAlign: 'right', marginRight: '6px' },
                  }}
                  placeholder={localeString(futureFund?.limit || 0)}
                  suffix={<div className='text-S/Medium'>원</div>}
                />
              </Form.Item>
            </div>
            <div
              className='mt-[11px] cursor-pointer text-right text-S/Medium text-purple-500'
              onClick={() =>
                form.setFieldValue(
                  'futureFundPrice',
                  localeString(futureFund?.limit || 0),
                )
              }
            >
              남은 한도 전액 신청
            </div>

            <div className='mt-[22px]'>
              <div>
                <Form.Item
                  name='agreed'
                  valuePropName='checked'
                  rules={[
                    {
                      validator: (_, value) =>
                        value
                          ? Promise.resolve()
                          : Promise.reject(new Error('위 내용을 확인해주세요.')),
                    },
                  ]}
                >
                  <Checkbox
                    onChange={({ target }) =>
                      form.setFieldValue('agreed', target.checked)
                    }
                  >
                    아래 내용을 모두 확인했어요.
                  </Checkbox>
                  <div
                    className={`mt-[10px] ${isMobile ? '' : 'ml-[30px]'} text-grey-700`}
                  >
                    <div className='flex'>
                      <div className='mr-[8px]'>
                        <InfoCircleOutlined />
                      </div>
                      <div className='self-center'>
                        미래 정산금은 최소 50만원부터 신청이 가능해요.
                      </div>
                    </div>

                    <div className='mt-[4px] flex'>
                      <div className='mr-[8px]'>
                        <InfoCircleOutlined />
                      </div>
                      <div className='self-center'>
                        미래 정산금은 매일 오후 2시 이전 신청건에 한하여 당일 지급되어요.
                      </div>
                    </div>

                    <div className='mt-[4px] flex'>
                      <div className='mr-[8px]'>
                        <InfoCircleOutlined />
                      </div>
                      <div className='self-center'>
                        미래 정산금은 신청 당일 지급되며, 수수료는 익일부터 부과되어요.
                      </div>
                    </div>

                    <div className='my-[4px] flex'>
                      <div className='mr-[8px]'>
                        <InfoCircleOutlined />
                      </div>
                      <div className='self-center'>
                        신청한 미래 정산금의 상환 및 수수료는 익일부터 발생하는 선정산
                        금액에서 자동 차감되어 납부되어요.
                      </div>
                    </div>
                  </div>
                </Form.Item>
              </div>

              <div className='mt-[46px]'>
                <div
                  className='h-[50px] w-full cursor-pointer rounded-[4px] border-[1px] border-purple-400 bg-purple-600 text-center text-L/Bold leading-[50px] text-white'
                  onClick={async () => {
                    await onApply();
                  }}
                >
                  미래정산 신청하기
                </div>
              </div>
            </div>
          </div>
        </div>
      </Form>
      <Modal width={310} footer={null} closable={false} open={open} centered>
        <div className='text-center text-L/Bold'>신청이 완료되었어요.</div>
        <div className='mt-[12px] text-center text-M/Medium'>
          관리자 승인 후 정산금이 입금되어요.
        </div>
        <div
          className='mx-auto mt-[20px] h-[48px] w-full cursor-pointer rounded-[4px] border-[1px] border-purple-400 bg-purple-600 text-center text-M/Bold leading-[48px] text-white'
          onClick={async () => {
            setOpen(false);
            navigation('/breakdown');
          }}
        >
          확인
        </div>
      </Modal>
    </Default>
  );
};
