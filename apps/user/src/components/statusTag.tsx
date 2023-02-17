import { statusTagSentiment } from '@/types/statusTagSentiment';

export interface IStatusTagProps {
  text: string;
  sentiment: statusTagSentiment;
}

export const StatusTag = ({ text, sentiment }: IStatusTagProps) => {
  let statusTagStyle = ' ';
  let badgeStyle = '';
  switch (sentiment) {
    case statusTagSentiment.NEUTRAL:
      statusTagStyle = 'bg-grey-100';
      badgeStyle = 'bg-grey-600';
      break;
    case statusTagSentiment.POSITIVE:
      statusTagStyle = 'bg-green-100';
      badgeStyle = 'bg-green-600';
      break;
    case statusTagSentiment.NEGATIVE:
      statusTagStyle = 'bg-red-100';
      badgeStyle = 'bg-red-600';
      break;
    case statusTagSentiment.ATTENTIVE:
      statusTagStyle = 'bg-yellow-100';
      badgeStyle = 'bg-yellow-500';
      break;
    case statusTagSentiment.INFORMATIVE:
      statusTagStyle = 'bg-blue-100';
      badgeStyle = 'bg-blue-500';
      break;
  }

  return (
    <div className={`inline-block rounded p-1 pl-2 ${statusTagStyle}`}>
      <div className=' text-XS/Regular'>
        <div className={`inline-block h-2 w-2 rounded-xl ${badgeStyle}`}></div>
        <span className='mx-1 text-grey-900'>{text}</span>
      </div>
    </div>
  );
};
