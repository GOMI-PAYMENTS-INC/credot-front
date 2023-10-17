import { amplitudeConstant } from '@/amplitude/amplitude.constant';
import { pageCategoryConvertor } from '@/amplitude/amplitude.enum';
import { PATH } from '@/common/constants';

declare var amplitude: any;

// ##### Event ##### //
export const _setAmplitudeEvents = async (
  event_name: string,
  payload?: any,
  callBackEvent?: () => void,
) => {
  try {
    switch (event_name) {
      default:
        const result = await amplitude.track(event_name, payload).promise;
        if (result) {
          if (callBackEvent) {
            callBackEvent();
          }
        }
        return result;
    }
  } catch (e) {
    console.log(e);
  }
};

// ##### INTRO PAGE - 1 - 소개 페이지 내 페이지 뷰 발생 시 ##### //
export const _introPageIntroPageViewed = (pageCategory: string, pageUrl: string) => {
  const page_category = pageCategoryConvertor(pageCategory);
  if (location.pathname.includes(PATH.PRICE) === false)
    _setAmplitudeEvents(amplitudeConstant.introPageViewed, {
      page_category,
      page_url: pageUrl,
    });
};

// ##### INTRO PAGE - 2 - 솔루션 페이지로 넘어가는 CTA 클릭 시 ##### //
export const _introPageMovedToSolution = (
  pageCategory: string,
  ctaType: string,
  ctaLocation: string,
  ctaText: string,
) => {
  const page_category = pageCategoryConvertor(pageCategory);

  void _setAmplitudeEvents(amplitudeConstant.movedToSolution, {
    page_category,
    cta_type: ctaType,
    cta_location: ctaLocation,
    cta_text: ctaText,
  });
};

export const _introPricingPageViewed = () => {
  if (location.pathname === PATH.PRICE)
    _setAmplitudeEvents(amplitudeConstant.pricingPageViewed, {
      feature: 'keyword analysis',
    });
};

export const _blogContentViewed = (props: {
  text: string;
  contentId: number;
  category: TCategory;
}) => {
  _setAmplitudeEvents(amplitudeConstant.contentViewed, {
    category: props.category,
    content_id: props.contentId,
    content_title: props.text,
  });
};
