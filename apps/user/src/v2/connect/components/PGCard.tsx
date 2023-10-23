export interface PGCardProps {
  image: string;
  pgName: string;
  onClick(): void;
  selected: boolean;
}

export const PGCard = ({ pgName, image, onClick, selected }: PGCardProps) => {
  return (
    <div className={`rounded-[20px] shadow-sm w-[168px] text-center hover:bg-gomi-200 py-[27px] cursor-pointer ${selected ? 'border-gomi-600 bg-gomi-200 border-2' : 'border-grey-300 border'}`} onClick={onClick}>
      <img src={image} className="ml-auto mr-auto" />
      <div className="w-[20px] h-[3px] bg-grey-300 ml-auto mr-auto mt-[16px] mb-[12px]"></div>
      <div className="text-grey-900 text-lg font-medium">{pgName}</div>
    </div>
  )
}