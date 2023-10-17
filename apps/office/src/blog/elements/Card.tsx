import { getCardCss } from '@/blog/container';
import { isFalsy } from '@/utils/isFalsy';
import { useNavigate, useLocation, Link } from 'react-router-dom';

interface ICard {
  type?: TCard;
  content: TContent;
}

export const Card = ({ type = '', content }: ICard) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { text, subscription, name, position, updatedAt, img, path } = content;
  const { imgStyle, contentInfoStyle, contentStyle, titleStyle, contentInfoDivStyle } =
    getCardCss(type);
  const mainFrameStyle = type === 'recommandation' ? '' : 'flex-col';
  const imagePath = type === 'main' ? content.mainImg : img;
  return (
    <Link to={path}>
      <div
        className={`flex cursor-pointer ${mainFrameStyle} rounded-lg shadow-[0px_0px_50px_0px_rgba(0,0,0,0.04)] lg:max-w-[334px]`}
      >
        <img className={imgStyle} src={imagePath} />
        <div id='content_info' className={contentInfoStyle}>
          <p className={titleStyle}>{text}</p>
          <div className={contentInfoDivStyle}>
            <p className={contentStyle}>{subscription}</p>
          </div>
        </div>
        {isFalsy(type) && (
          <div
            id='author'
            className={`flex justify-between rounded-b-lg ${
              type === 'recommandation' ? 'rounded-r' : ''
            } border-[1px] border-grey-100 bg-grey-200 py-[14px] px-5`}
          >
            <div className='flex gap-2.5'>
              <img className='h-[44px]  w-[44px]' src='/assets/images/Kai.png' />
              <div>
                <p className='text-M/Medium'>{name}</p>
                <p className='text-S/Regular text-grey-700'>{position}</p>
              </div>
            </div>

            <div className='flex flex-col gap-[3px] text-end'>
              <p className='text-S/Medium'>업데이트 일자</p>
              <p className='text-S/Regular text-grey-700'>{updatedAt}</p>
            </div>
          </div>
        )}
      </div>
    </Link>
  );
};
