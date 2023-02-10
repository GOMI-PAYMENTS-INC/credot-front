export interface IStatusTagProps {
  text: string;
  sentiment: 'neutral' | 'positive' | 'negative' | 'attentive' | 'informative';
}

export const StatusTag = ({ text, sentiment }: IStatusTagProps) => {
  let statusTagStyle = ' ';
  let badgeStyle = '';
  switch (sentiment) {
    case 'neutral':
      statusTagStyle = 'bg-grey-100';
      badgeStyle = 'bg-grey-600';
      break;
    case 'positive':
      statusTagStyle = 'bg-green-100';
      badgeStyle = 'bg-green-600';
      break;
    case 'negative':
      statusTagStyle = 'bg-red-100';
      badgeStyle = 'bg-red-600';
      break;
    case 'attentive':
      statusTagStyle = 'bg-yellow-100';
      badgeStyle = 'bg-yellow-500';
      break;
    case 'informative':
      statusTagStyle = 'bg-blue-100';
      badgeStyle = 'bg-blue-500';
      break;
  }

  return (
    <div className={`inline-flex items-center rounded p-1 pl-2 ${statusTagStyle}`}>
      <i className={`inline-block h-2 w-2 rounded-2xl ${badgeStyle}`}></i>
      <span className='text-gery-900 mx-1 text-XS/Regular'>{text}</span>
    </div>
  );
};
