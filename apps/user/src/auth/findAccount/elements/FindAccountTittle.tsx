interface IFindAccountTittleForm {
  title: string;
  subTitle?: string;
}

export const FindAccountTittle = ({ title, subTitle }: IFindAccountTittleForm) => {
  return (
    <div className='text-grey-800'>
      <div className='mb-1 text-3XL/Medium xs:text-2XL/Medium'>
        {title && <div dangerouslySetInnerHTML={{ __html: title }} />}
      </div>
      <div className='text-L/Regular xs:text-S/Medium'>
        {subTitle && <div dangerouslySetInnerHTML={{ __html: subTitle }} />}
      </div>
    </div>
  );
};
