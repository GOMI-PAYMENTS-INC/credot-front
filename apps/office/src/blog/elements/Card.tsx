import { getCardCss } from '@/blog/container';
import { isFalsy } from '@/utils/isFalsy';
import { useNavigate, useLocation, Link } from 'react-router-dom';

interface ICard {
  type?: TCard;
}

export const Card = ({ type = '' }: ICard) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { imgStyle, contentInfoStyle, contentStyle, titleStyle, contentInfoDivStyle } =
    getCardCss(type);
  const mainFrameStyle = type === 'recommandation' ? '' : 'flex-col';

  return (
    <Link to={'/blog/category/insight/serp'}>
      <div
        className={`flex cursor-pointer ${mainFrameStyle} rounded-lg shadow-[0px_0px_50px_0px_rgba(0,0,0,0.04)] lg:max-w-[334px]`}
      >
        <img className={imgStyle} src='/assets/images/main.png' />
        <div id='content_info' className={contentInfoStyle}>
          <p className={titleStyle}>SERP, 검색결과 화면 분석의 중요성</p>
          <div className={contentInfoDivStyle}>
            <p className={contentStyle}>
              이커머스 플랫폼 매출의 86%가 '키워드 검색'으로부터 시작되는만큼, 검색결과
              화면에 내 상품을 노출시키는 것이 중요해요. 우리는 Shopee의 검색 알고리즘이
              로직으로 상품의 노출 순위를 정하는지 알 수 없기 때문에, 상위 노출 상품들의
              공
            </p>
          </div>
        </div>
        {isFalsy(type) && (
          <div
            id='author'
            className={`flex justify-between rounded-b-lg rounded-r border-[1px] border-t-0 bg-grey-200 py-[14px] px-5`}
          >
            <div className='flex gap-2.5'>
              <img className='h-[44px]  w-[44px]' src='/assets/images/Kai.png' />
              <div>
                <p className='text-M/Medium'>Kai</p>
                <p className='text-S/Regular text-grey-700'>CEO & Co-Founder</p>
              </div>
            </div>

            <div className='flex flex-col gap-[3px] text-end'>
              <p className='text-S/Medium'>업데이트 일자</p>
              <p className='text-S/Regular text-grey-700'>2023.08.17</p>
            </div>
          </div>
        )}
      </div>
    </Link>
  );
};
