import RefreshImg from '@/v2/prefund/assets/refresh.png';
export const Header = ({
  title,
  updateAt,
  onRefetch,
}: {
  title: string;
  updateAt: string;
  onRefetch(): void;
}) => {
  return (
    <div className='mx-auto flex w-[1280px] items-center'>
      <div className='mr-[20px] text-XL/Bold text-grey-900'>{title}</div>
      <div className='mr-[10px] text-S/Regular text-grey-800'>업데이트 : {updateAt}</div>
      <div onClick={onRefetch}>
        <img src={RefreshImg} width={28} className='cursor-pointer' />
      </div>
    </div>
  );
};
