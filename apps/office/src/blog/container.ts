import { CONTENT_LIST } from '@/blog/constants';

export const getCardCss = (type: TCard) => {
  const cardCss = {
    imgStyle: 'rounded-t-lg border-b-0 border-grey-100 border-[1px]',
    contentInfoStyle: 'rounded-b-lg border-[1px] border-grey-100',
    contentInfoDivStyle: 'overflow-hidden text-ellipsis',
    titleStyle: '',
    contentStyle: '',
  };

  if (type === 'main') {
    cardCss.imgStyle = `${cardCss.imgStyle} h-[511px] w-full`;
    cardCss.titleStyle = 'text-3XL/Bold';
    cardCss.contentInfoDivStyle = `${cardCss.contentInfoDivStyle} h-[92px] w-[500px] `;
    cardCss.contentStyle = 'text-M/Medium leading-[31px] text-grey-700';
    cardCss.contentInfoStyle = `${cardCss.contentInfoStyle} flex justify-between px-[60px] py-[26px]`;
  } else {
    cardCss.imgStyle = `${cardCss.imgStyle} h-[207px] w-full rounded-t-lg`;
    cardCss.contentInfoDivStyle = `${cardCss.contentInfoDivStyle} h-[52px] w-[328px] lg:w-[275px] lg:h-12`;

    cardCss.titleStyle =
      'text-L/Bold w-[328px] h-[56px] text-ellipsis lg:text-M/Bold sm:text-L/Bold';

    cardCss.contentInfoStyle = `${cardCss.contentInfoStyle} border-b-none rounded-b-[0px] flex-col flex p-5 lg:text-S/Regular sm:text-S/Medium `;
    cardCss.contentStyle = 'text-M/Medium leading-[27px] text-grey-700';
  }

  if (type === 'recommandation') {
    cardCss.titleStyle = 'text-L/Bold w-[340px] h-[60px] text-ellipsis';
    cardCss.imgStyle = 'w-[318px] h-[180px] rounded-l-lg';
    cardCss.contentInfoStyle = `border-[1px] rounded-r-lg border-l-none w-full border-grey-100 flex-col flex gap-2.5 p-[25px]`;
    cardCss.contentStyle = 'text-M/Regular leading-[27px] text-grey-700';
    cardCss.contentInfoDivStyle = `overflow-hidden text-ellipsis w-[380px] h-[60px]`;
  }

  return cardCss;
};

export const getPath = (pathname: string, movedPath: string) => {
  if (pathname.includes('serp')) {
    const path = pathname.split('/');
    path.pop();

    return path.join('/');
  }
  if (pathname.includes('category')) {
    const path = pathname.split('/');
    path.pop();

    return path.join('/') + `/${movedPath}`;
  }
  return pathname + `/category/${movedPath}`;
};

export const convertTitle = (title: TCategory) => {
  switch (title) {
    case 'insight':
      return '인사이트';
    case 'news':
      return '뉴스';
    default:
      return '제품';
  }
};

export const getBreadcrumb = (pathname: string) => {
  const path = pathname.split('/');
  const category = path[path.length - 1];
  return CONTENT_LIST.find((content) => content.path.includes(category));
};
