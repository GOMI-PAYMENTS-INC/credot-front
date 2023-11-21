import { Upload, UploadFile } from 'antd';
import { ReactNode, useEffect, useState } from 'react';

import { FileDto } from '@/generated-rest/api/front';
import { OpenAPI } from '@/generated-rest/api/front/core/OpenAPI';
import { request as __request } from '@/generated-rest/api/front/core/request';
import { useGetFiles } from '@/hooks/upload.hook';
export const PUpload = ({
  children,
  onChange,
  defaultFileIds = [],
  onRemove,
  maxCount,
}: {
  children: ReactNode;
  onChange?(fileList: UploadFile<FileDto>[]): void;
  defaultFileIds?: number[];
  onRemove?: any;
  maxCount?: number;
}) => {
  const [fileList, setFileList] = useState<UploadFile<FileDto>[]>([]);
  const { data: fileInfos } = useGetFiles(defaultFileIds);

  useEffect(() => {
    if (fileInfos?.length) {
      setFileList(
        fileInfos.map((fileInfo) => ({
          uid: String(fileInfo.id),
          name: fileInfo.name,
          fileName: fileInfo.name,
          url: fileInfo.url,
          status: 'done',
          percent: 100,
          thumbUrl: '',
          response: fileInfo,
          xhr: fileInfo,
          preview: '',
        })),
      );
    }
  }, [fileInfos]);

  return (
    <Upload
      fileList={fileList}
      onRemove={onRemove}
      maxCount={maxCount}
      onChange={(info) => {
        info.fileList = info.fileList.map((file) => {
          if (file.response) {
            file.url = file.response.url;
          }
          return file;
        });
        setFileList(info.fileList);
        onChange?.(info.fileList);
      }}
      customRequest={({ file, onProgress, onSuccess, onError }) => {
        if (typeof file === 'string') {
          return;
        }

        const controller = new AbortController();
        __request(OpenAPI, {
          method: 'POST',
          url: '/upload',
          onUploadProgress: ({ loaded, total }: { loaded: number; total: number }) =>
            onProgress!({ percent: (loaded / total) * 100 }),
          headers: {
            'Content-Type': file.type,
            signal: controller.signal,
          },
          formData: {
            file,
          },
        })
          .then((res) => onSuccess!(res))
          .catch((e) => onError!(e));

        return {
          abort() {
            controller.abort();
          },
        };
      }}
    >
      {children}
    </Upload>
  );
};
