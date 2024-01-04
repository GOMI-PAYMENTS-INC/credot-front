import { Button, message } from 'antd';
import { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

import { UploadService } from '@/generated-rest/api/front';
import { MemberRecord } from '@/v2/member/components/list/DataTable';

const FileDownloadRender = (fileId: number) => {
  return (
    fileId && (
      <Button
        size='small'
        onClick={() => {
          UploadService.getUploadFile(fileId)
            .then((res) => {
              window.open(res.url);
            })
            .catch(() => {
              message.error('파일을 불러오지 못하였습니다.');
            });
        }}
      >
        다운로드
      </Button>
    )
  );
};
export const getDataTableColumns = (): ColumnsType<MemberRecord> => {
  const navigation = useNavigate();
  return [
    {
      title: '',
      width: 40,
      dataIndex: '',
      key: '',
      render: (_, record: MemberRecord) => (
        <Button
          size='small'
          type='text'
          className='text-purple-500'
          onClick={() => navigation(`/member/update/${record.id}`)}
        >
          수정
        </Button>
      ),
      className: 'text-center',
    },
    {
      title: '등록 일시',
      width: 240,
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (value: string) => dayjs(value).format('YYYY-MM-DD hh:mm:ss'),
      className: 'text-center',
    },
    {
      title: '상호',
      width: 200,
      ellipsis: true,
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '담당자명',
      width: 140,
      dataIndex: 'managerName',
      key: 'managerName',
    },
    {
      title: '담당자 연락처',
      width: 160,
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
    },
    {
      title: '담당자 이메일',
      width: 160,
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: '사업자번호',
      width: 160,
      dataIndex: 'businessNumber',
      key: 'businessNumber',
    },
    {
      title: '법인등록번호',
      width: 160,
      dataIndex: 'corporateRegistrationNumber',
      key: 'corporateRegistrationNumber',
    },
    {
      title: '업종',
      width: 120,
      dataIndex: 'industryType',
      key: 'industryType',
    },
    {
      title: '업태',
      width: 120,
      dataIndex: 'businessType',
      key: 'businessType',
    },
    {
      title: '사업장주소',
      width: 160,
      ellipsis: true,
      dataIndex: 'companyAddress',
      key: 'companyAddress',
    },
    {
      title: '은행명',
      width: 120,
      dataIndex: 'bankName',
      key: 'bankName',
    },
    {
      title: '예금주',
      width: 120,
      dataIndex: 'bankAccountHolder',
      key: 'bankAccountHolder',
    },
    {
      title: '계좌번호',
      width: 160,
      dataIndex: 'bankAccount',
      key: 'bankAccount',
    },
    {
      title: '사업자등록증',
      width: 120,
      dataIndex: 'businessLicenseFileId',
      key: 'businessLicenseFileId',
      render: FileDownloadRender,
      className: 'text-center',
    },
    {
      title: '법인등기부등본',
      width: 120,
      dataIndex: 'corporateRegisterFileId',
      key: 'corporateRegisterFileId',
      render: FileDownloadRender,
      className: 'text-center',
    },
    {
      title: '법인인감증명서',
      width: 120,
      dataIndex: 'certificateOfCorporateSealFileId',
      key: 'certificateOfCorporateSealFileId',
      render: FileDownloadRender,
      className: 'text-center',
    },
  ];
};
