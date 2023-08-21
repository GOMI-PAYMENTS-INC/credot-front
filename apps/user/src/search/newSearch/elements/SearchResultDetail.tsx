import UseTooltip from '@/components/UseTooltip';
import { formatNumber } from '@/utils/formatNumber';
import { RelativeKeywords } from '@/search/newSearch/elements/RelativeKeywords';

interface ISearchDetailResult {
  images: TProductImageType | null;
  response: TSearchResponse | undefined;
  tooltips: { monthly: JSX.Element; relativeKeywords: JSX.Element };
}
export const SearchResultDetail = ({
  images,
  response,
  tooltips: { monthly, relativeKeywords },
}: ISearchDetailResult) => {
  if (response === undefined) {
    return (
      <div className='scale-[0.3]'>
        <div id='loader' />
      </div>
    );
  }

  const productImgs = images?.imageUrl.filter((_, idx) => idx < 4);

  return (
    <div className='mt-[30px] flex w-[420px] flex-col gap-[30px] opacity-90'>
      <header id='imgs'>
        <div className='flex gap-5'>
          {productImgs?.map((img, index) => {
            return (
              <img
                className='h-[90px] w-[90px] rounded-[10px] border-[1px] border-grey-300'
                key={`product_img_${index}`}
                src={img}
              />
            );
          })}
        </div>
      </header>

      <main id='monthly'>
        <div className='grow basis-full rounded-2xl border border-grey-300 bg-white px-6 py-5'>
          <div className='flex items-center'>
            <h3 className='text-L/Medium'>월간 검색량</h3>
            <UseTooltip content={monthly} />
          </div>
          <div className='mt-5'>
            <span className='text-3XL/Bold text-grey-900'>
              {formatNumber(response.main.count)}
            </span>
          </div>
        </div>
      </main>

      <footer id='relativeKeyword'>
        <RelativeKeywords tooltip={relativeKeywords} response={response} />
      </footer>
    </div>
  );
};
