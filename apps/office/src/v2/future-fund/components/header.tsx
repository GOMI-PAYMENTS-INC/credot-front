export const Header = ({ title }: { title: string }) => {
  return (
    <div className='mx-auto flex w-[1280px] items-center'>
      <div className='mr-[20px] text-XL/Bold text-grey-900'>{title}</div>
    </div>
  );
};
