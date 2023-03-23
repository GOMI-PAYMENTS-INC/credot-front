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
export const _introPageIntroPageViewed = (page_category: string, page_url: string) => {
  void _setAmplitudeEvents(amplitudeConstant.introPageViewed, {
    page_category,
    page_url,
  });
};

// ##### INTRO PAGE - 2 - 솔루션 페이지로 넘어가는 CTA 클릭 시 ##### //
export const _introPageMovedToSolution = (
  page_category: string,
  cta_type: string,
  cta_location: string,
  cta_text: string,
  move_link: string,
) => {
  void _setAmplitudeEvents(amplitudeConstant.movedToSolution, {
    page_category,
    cta_type,
    cta_location,
    cta_text,
  });
  window.open(`${move_link}`, '_blank');
};
