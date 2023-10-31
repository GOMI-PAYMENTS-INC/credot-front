export type SpinSize = 'large' | 'small';

export const Spin = ({ size = 'large' }: { size?: SpinSize }) => {
  return (
    <div className='flex h-[21px] w-full justify-center'>
      <div
        className={`${
          size === 'large' ? 'gomi-spinner' : 'gomi-spinner-small'
        } self-center`}
      />
    </div>
  );
};
