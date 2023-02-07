interface IFindIdPasswordTittleForm {
  title: string;
  subTitle?: string;
}

export const FindIdPasswordTittle = ({ title, subTitle }: IFindIdPasswordTittleForm) => {
  return (
    <div className='text-grey-800'>
      <div className='mb-1 text-3XL/medium'>
        {title && <div dangerouslySetInnerHTML={{ __html: title }} />}
      </div>
      <div className='text-L/Regular'>
        {subTitle && <div dangerouslySetInnerHTML={{ __html: subTitle }} />}
      </div>
    </div>
  );
};
