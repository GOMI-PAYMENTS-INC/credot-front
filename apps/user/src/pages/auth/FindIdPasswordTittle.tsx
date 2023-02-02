interface IFindIdPasswordTittleForm {
  title: string;
  subTitle?: string;
}

export const FindIdPasswordTittle = ({ title, subTitle }: IFindIdPasswordTittleForm) => {
  return (
    <div className='text-grey-800'>
      <h3 className='mb-1 text-3XL/medium'>
        {title && <div dangerouslySetInnerHTML={{ __html: title }} />}
      </h3>
      <p className='text-L/Regular'>
        {subTitle && <div dangerouslySetInnerHTML={{ __html: subTitle }} />}
      </p>
    </div>
  );
};
