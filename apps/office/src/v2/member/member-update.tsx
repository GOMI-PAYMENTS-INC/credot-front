import {
  ExclamationCircleOutlined,
  MinusCircleOutlined,
  PlusOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import {
  Button,
  Col,
  Divider,
  Form,
  Input,
  message,
  Modal,
  Radio,
  Row,
  Select,
  Space,
} from 'antd';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { Default } from '@/common/layouts';
import { PUpload } from '@/components/PUpload';
import { CrawlingTypeEnum, UserTypeEnum } from '@/generated-rest/api/front';
import { Header } from '@/v2/member/components/header';
import {
  useDeleteFranchise,
  useUpdateMember,
  useUserCrawlingInfoHook,
  useUserHook,
} from '@/v2/member/hooks/member.hook';
import { cardCompanyOptions } from '@/v2/member/member-register';

interface FranchiseInfo {
  id?: number;
  cardCompanyName: string;
  franchiseNumber: string;
}

interface MemberUpdateFormType {
  type: UserTypeEnum;
  companyName: string;
  businessNumber: string;
  companyEmail: string;
  corporateRegistrationNumber: string;
  industryType: string;
  businessType: string;
  companyAddress: string;
  managerPosition: string;
  managerName: string;
  phoneNumber: string;
  bankName: string;
  bankAccountHolder: string;
  password: string;
  bankAccount: string;
  crawlingType: CrawlingTypeEnum;
  crawlingAccountId: string;
  crawlingPassword: string;
  businessLicenseFileId: number;
  corporateRegisterFileId: number;
  certificateOfCorporateSealFileId: number;
  crawlingFranchiseInfos: FranchiseInfo[];
}

export const MemberUpdate = () => {
  const { memberId } = useParams();
  const { data, refetch: refetchUser } = useUserHook(Number(memberId));
  const { data: crawlingInfos, refetch: refetchCrawlingInfo } = useUserCrawlingInfoHook(
    Number(memberId),
  );
  const [form] = Form.useForm<MemberUpdateFormType>();
  const { mutateAsync: updateMember, isLoading } = useUpdateMember();
  const { mutateAsync: deleteFranchise } = useDeleteFranchise();
  const handleFinish = (values: MemberUpdateFormType) => {
    Modal.confirm({
      title: '회원 수정',
      icon: <ExclamationCircleOutlined />,
      content: '수정하시겠습니까?',
      okText: '수정',
      cancelText: '취소',
      onOk: () => {
        updateMember({ id: Number(memberId), data: values }).then(() => {
          refetchUser();
          refetchCrawlingInfo();
        });
      },
    });
  };

  /* 프랜차이즈 정보 삭제 */
  const handleDeleteCrawlingFranchise = (id: number) => {
    return deleteFranchise(id).then(() => {
      refetchUser();
      refetchCrawlingInfo();
    });
  };
  /* 프랜차이즈 정보 삭제 */

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        ...data,
        companyName: data.name,
      });
    }
  }, [data]);

  useEffect(() => {
    if (crawlingInfos?.length) {
      form.setFieldsValue({
        crawlingType: crawlingInfos[0].type,
        crawlingAccountId: crawlingInfos[0].accountId,
        crawlingPassword: crawlingInfos[0].password,
        crawlingFranchiseInfos: [
          ...crawlingInfos[0].franchiseInfos,
          ...cardCompanyOptions
            .filter(
              (option) =>
                !crawlingInfos[0].franchiseInfos.find(
                  (franchise) => franchise.cardCompanyName === option.value,
                ),
            )
            .map((option) => ({
              id: undefined,
              franchiseNumber: '',
              cardCompanyName: option.value,
            })),
        ],
      });
    }
  }, [crawlingInfos]);

  return (
    <Default useGap>
      <Header title='회원 수정' />
      <div className='mt-[20px] h-full bg-grey-50'>
        <div className='mx-auto w-[1280px] py-[20px]'>
          <Form colon={false} form={form} onFinish={handleFinish}>
            <div>
              <div className='mb-[16px] text-L/Bold text-grey-800'>업체 정보</div>
              <Row gutter={[16, 16]}>
                <Col span={6}>
                  <Form.Item
                    name='type'
                    label='종류'
                    labelAlign='left'
                    labelCol={{ span: 3 }}
                  >
                    <Radio.Group
                      defaultValue={UserTypeEnum.CORPORATE}
                      buttonStyle='solid'
                    >
                      <Radio.Button value={UserTypeEnum.CORPORATE}>법인</Radio.Button>
                      <Radio.Button value={UserTypeEnum.INDIVIDUAL}>개인</Radio.Button>
                    </Radio.Group>
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    name='companyName'
                    label='상호명'
                    rules={[{ required: true, message: '상호명을 입력해주세요.' }]}
                    labelAlign='left'
                    labelCol={{ span: 5 }}
                  >
                    <Input placeholder='상호명을 입력하세요.' className='w-[180px]' />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    name='businessNumber'
                    label='사업자 번호'
                    labelAlign='left'
                    labelCol={{ span: 6 }}
                  >
                    <Input placeholder='사업자번호를 입력하세요.' className='w-[180px]' />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    name='corporateRegistrationNumber'
                    label='법인등록번호'
                    labelAlign='left'
                    labelCol={{ span: 7 }}
                  >
                    <Input
                      placeholder='법인등록번호를 입력하세요.'
                      className='w-[180px]'
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={[16, 16]}>
                <Col span={6}>
                  <Form.Item
                    name='industryType'
                    label='업종'
                    labelAlign='left'
                    labelCol={{ span: 3 }}
                  >
                    <Input placeholder='업종을 입력하세요.' className='w-[180px]' />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    name='businessType'
                    label='업태'
                    labelAlign='left'
                    labelCol={{ span: 3 }}
                  >
                    <Input placeholder='업태를 입력하세요.' className='w-[180px]' />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    name='companyAddress'
                    label='사업장 주소'
                    labelAlign='left'
                    labelCol={{ span: 6 }}
                  >
                    <Input
                      placeholder='사업장 주소를 입력하세요.'
                      className='w-[180px]'
                    />
                  </Form.Item>
                </Col>
              </Row>
            </div>
            <Divider />
            <div>
              <div className='mb-[16px] text-L/Bold text-grey-800'>담당자 정보</div>
              <Row gutter={[16, 16]}>
                <Col span={6}>
                  <Form.Item
                    name='managerPosition'
                    label='직급'
                    labelAlign='left'
                    labelCol={{ span: 3 }}
                  >
                    <Input placeholder='직급을 입력하세요.' className='w-[180px]' />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    name='managerName'
                    label='이름'
                    labelAlign='left'
                    labelCol={{ span: 3 }}
                  >
                    <Input placeholder='이름을 입력하세요.' className='w-[180px]' />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    name='phoneNumber'
                    label='연락처'
                    labelAlign='left'
                    labelCol={{ span: 7 }}
                  >
                    <Input placeholder='연락처를 입력하세요.' className='w-[180px]' />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    label='담당자 이메일'
                    labelAlign='left'
                    name='companyEmail'
                    labelCol={{ span: 7 }}
                  >
                    <Input
                      placeholder='담당자 이메일을 입력하세요.'
                      className='w-[180px]'
                    />
                  </Form.Item>
                </Col>
              </Row>
            </div>
            <Divider />
            <div>
              <div className='mb-[16px] text-L/Bold text-grey-800'>
                가맹점주 페이지 계정 정보
              </div>
              <Row gutter={[16, 16]}>
                <Col span={6}>
                  <Form.Item label='이메일' labelAlign='left' labelCol={{ span: 5 }}>
                    <Input
                      placeholder='이메일을 입력하세요.'
                      disabled
                      value={data?.email}
                      className='w-[180px]'
                    />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    label='비밀번호'
                    name='password'
                    labelAlign='left'
                    labelCol={{ span: 5 }}
                  >
                    <Input.Password
                      placeholder='비밀번호를 입력하세요.'
                      className='w-[180px]'
                    />
                  </Form.Item>
                </Col>
              </Row>
            </div>
            <Divider />
            <div>
              <div className='mb-[16px] text-L/Bold text-grey-800'>계좌 정보</div>
              <Row gutter={[16, 16]}>
                <Col span={6}>
                  <Form.Item
                    name='bankName'
                    label='은행명'
                    labelAlign='left'
                    labelCol={{ span: 4 }}
                  >
                    <Input placeholder='은행명을 입력해주세요.' className='w-[180px]' />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    name='bankAccountHolder'
                    label='예금주'
                    labelAlign='left'
                    labelCol={{ span: 4 }}
                  >
                    <Input placeholder='예금주를 입력하세요.' className='w-[180px]' />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    name='bankAccount'
                    label='계좌번호'
                    labelAlign='left'
                    labelCol={{ span: 6 }}
                  >
                    <Input placeholder='계좌번호를 입력하세요.' className='w-[180px]' />
                  </Form.Item>
                </Col>
              </Row>
            </div>
            <Divider />
            <div>
              <div className='mb-[16px] text-L/Bold text-grey-800'>데이터 수집 정보</div>
              <Row gutter={[16, 16]}>
                <Col span={6}>
                  <Form.Item
                    name='crawlingType'
                    label='사이트명'
                    labelAlign='left'
                    labelCol={{ span: 5 }}
                  >
                    <Select
                      defaultValue={CrawlingTypeEnum.CREDIT_FINANCE}
                      className='!w-[180px]'
                    >
                      <Select.Option value={CrawlingTypeEnum.CREDIT_FINANCE}>
                        여신금융협회
                      </Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    name='crawlingAccountId'
                    label='아이디'
                    labelAlign='left'
                    labelCol={{ span: 4 }}
                  >
                    <Input placeholder='아이디를 입력하세요.' className='w-[180px]' />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    name='crawlingPassword'
                    label='비밀번호'
                    labelAlign='left'
                    labelCol={{ span: 6 }}
                  >
                    <Input.Password
                      placeholder='비밀번호를 입력하세요.'
                      className='w-[180px]'
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <div className='mb-3'>가맹점 정보</div>
                  <Form.List name='crawlingFranchiseInfos'>
                    {(fields, { add, remove }, { errors }) => (
                      <>
                        {fields.map((field, index) => {
                          console.log(field);
                          return (
                            <Form.Item required={false} key={field.key}>
                              <div>
                                <Space>
                                  <Form.Item
                                    name={[field.name, 'cardCompanyName']}
                                    validateTrigger={['onChange', 'onBlur']}
                                    noStyle
                                  >
                                    <Select
                                      className='!w-60'
                                      options={cardCompanyOptions}
                                    />
                                  </Form.Item>
                                  <Form.Item
                                    name={[field.name, 'franchiseNumber']}
                                    validateTrigger={['onChange', 'onBlur']}
                                    noStyle
                                  >
                                    <Input className='w-80' />
                                  </Form.Item>
                                  {fields.length > 1 ? (
                                    <MinusCircleOutlined
                                      className='dynamic-delete-button'
                                      onClick={async () => {
                                        const deleteFranchise =
                                          crawlingInfos?.[0].franchiseInfos.find(
                                            (item, index) => index === field.key,
                                          );
                                        if (!deleteFranchise?.id) {
                                          message.warning('다시 시도해주세요.');
                                          return;
                                        }

                                        Modal.confirm({
                                          title: '가맹점 삭제',
                                          content: '해당 가맹점 정보를 삭제하시겠습니까?',
                                          icon: <ExclamationCircleOutlined />,
                                          okText: '삭제',
                                          cancelText: '취소',
                                          onOk: () => {
                                            handleDeleteCrawlingFranchise(
                                              deleteFranchise.id,
                                            );
                                            remove(field.name);
                                          },
                                        });
                                      }}
                                    />
                                  ) : null}
                                </Space>
                              </div>
                            </Form.Item>
                          );
                        })}
                        <Form.Item>
                          <Button
                            type='dashed'
                            onClick={() => add()}
                            icon={<PlusOutlined />}
                          >
                            가맹점 추가하기
                          </Button>
                          <Form.ErrorList errors={errors} />
                        </Form.Item>
                      </>
                    )}
                  </Form.List>
                </Col>
              </Row>
            </div>
            <Divider />
            <div>
              <div className='mb-[16px] text-L/Bold text-grey-800'>서류 정보</div>
              <Row gutter={[16, 16]}>
                <Col span={6}>
                  <Form.Item
                    name='businessLicenseFileId'
                    label='사업자등록증'
                    labelAlign='left'
                    labelCol={{ span: 7 }}
                  >
                    <PUpload
                      maxCount={1}
                      defaultFileIds={
                        data?.businessLicenseFileId ? [data?.businessLicenseFileId] : []
                      }
                      onChange={(fileList) => {
                        fileList.length &&
                          form.setFieldsValue({
                            businessLicenseFileId: fileList[0]?.response?.id,
                          });
                      }}
                    >
                      <Button icon={<UploadOutlined />}>업로드</Button>
                    </PUpload>
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    name='corporateRegisterFileId'
                    label='법인등기부등본'
                    labelAlign='left'
                    labelCol={{ span: 8 }}
                  >
                    <PUpload
                      maxCount={1}
                      defaultFileIds={
                        data?.corporateRegisterFileId
                          ? [data?.corporateRegisterFileId]
                          : []
                      }
                      onChange={(fileList) => {
                        fileList.length &&
                          form.setFieldsValue({
                            corporateRegisterFileId: fileList[0]?.response?.id,
                          });
                      }}
                    >
                      <Button icon={<UploadOutlined />}>업로드</Button>
                    </PUpload>
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    name='certificateOfCorporateSealFileId'
                    label='법인인감증명서'
                    labelAlign='left'
                    labelCol={{ span: 8 }}
                  >
                    <PUpload
                      maxCount={1}
                      defaultFileIds={
                        data?.certificateOfCorporateSealFileId
                          ? [data?.certificateOfCorporateSealFileId]
                          : []
                      }
                      onChange={(fileList) => {
                        fileList.length &&
                          form.setFieldsValue({
                            certificateOfCorporateSealFileId: fileList[0]?.response?.id,
                          });
                      }}
                    >
                      <Button icon={<UploadOutlined />}>업로드</Button>
                    </PUpload>
                  </Form.Item>
                </Col>
              </Row>
            </div>

            <Form.Item className='mt-[60px] text-center'>
              <Button
                type='primary'
                htmlType='submit'
                loading={isLoading}
                className='h-[56px] w-[288px] text-M/Bold'
              >
                수정
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </Default>
  );
};
