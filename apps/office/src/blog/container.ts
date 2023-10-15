export const getCardCss = (type: 'main' | '') => {
  const cardCss = {
    imgStyle: 'border-[1px] rounded-t-lg border-b-0 border-grey-300',
    contentInfoStyle: 'rounded-b-lg border-[1px] border-t-0',
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

    cardCss.contentInfoStyle = `${cardCss.contentInfoStyle} border-b-0 rounded-b-[0px] flex-col flex p-5 lg:text-S/Regular sm:text-S/Medium `;
    cardCss.contentStyle = 'text-M/Medium leading-[27px] text-grey-700';
  }

  return cardCss;
};

export const getPath = (pathname: string, movedPath: string) => {
  if (pathname.includes('content')) {
    const path = pathname.split('/');
    path.pop();

    return path.join('/') + `/${movedPath}`;
  }
  return pathname + `/content/${movedPath}`;
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
