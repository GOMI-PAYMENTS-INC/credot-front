interface ICustomRaioButton {
  isSelected: boolean;
}

const RaioButton = ({ isSelected }: ICustomRaioButton) => {
  return (
    <div className='flex h-full items-center'>
      <div
        className={`flex h-5 w-5 items-center justify-center rounded-full border-[2px] ${
          isSelected ? 'border-orange-400' : ''
        }`}
      >
        <div
          className={`h-3 w-3 rounded-full bg-orange-400 p-1 ${
            isSelected ? '' : 'hidden'
          }`}
        />
      </div>
    </div>
  );
};

export default RaioButton;
