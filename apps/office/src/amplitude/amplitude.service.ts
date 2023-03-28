import { amplitudeConstant } from '@/amplitude/amplitude.constant';

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
  void _setAmplitudeEvents(amplitudeConstant.introPageViewed, {
    page_category: pageCategory,
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
  void _setAmplitudeEvents(amplitudeConstant.movedToSolution, {
    page_category: pageCategory,
    cta_type: ctaType,
    cta_location: ctaLocation,
    cta_text: ctaText,
  });
};
