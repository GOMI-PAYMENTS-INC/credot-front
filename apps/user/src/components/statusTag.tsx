import { TAG_SENTIMENT_STATUS } from '@/types/enum.code';

export interface IStatusTagProps {
  text: string;
  sentiment: TAG_SENTIMENT_STATUS;
}

export const StatusTag = ({ text, sentiment }: IStatusTagProps) => {
  let statusTagBoxStyle = ' ';
  let badgeStyle = '';
  switch (sentiment) {
    case TAG_SENTIMENT_STATUS.NEUTRAL:
      statusTagBoxStyle = 'bg-grey-100';
      badgeStyle = 'bg-grey-600';
      break;
    case TAG_SENTIMENT_STATUS.POSITIVE:
      statusTagBoxStyle = 'bg-green-100';
      badgeStyle = 'bg-green-600';
      break;
    case TAG_SENTIMENT_STATUS.NEGATIVE:
      statusTagBoxStyle = 'bg-red-100';
      badgeStyle = 'bg-red-600';
      break;
    case TAG_SENTIMENT_STATUS.ATTENTIVE:
      statusTagBoxStyle = 'bg-yellow-100';
      badgeStyle = 'bg-yellow-500';
      break;
    case TAG_SENTIMENT_STATUS.INFORMATIVE:
      statusTagBoxStyle = 'bg-blue-100';
      badgeStyle = 'bg-blue-500';
      break;
  }

  return (
    <div className={`inline-block rounded p-1 pl-2 ${statusTagBoxStyle}`}>
      <div className='text-XS/Regular'>
        <div className={`inline-block h-2 w-2 rounded-xl ${badgeStyle}`}></div>
        <span className='mx-1 text-grey-900'>{text}</span>
      </div>
    </div>
  );
};
