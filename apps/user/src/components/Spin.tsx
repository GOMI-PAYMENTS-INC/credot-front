export type SpinSize = 'large' | 'small';
export type SpinColor = 'primary' | 'white';
export const Spin = ({
  size = 'large',
  color = 'primary',
}: {
  size?: SpinSize;
  color?: SpinColor;
}) => {
  return (
    <div className='flex h-[21px] w-full justify-center'>
      <div
        className={`${
          size === 'large' ? 'gomi-spinner' : 'gomi-spinner-small'
        } gomi-spinner-${size}-${color} self-center`}
      />
    </div>
  );
};
