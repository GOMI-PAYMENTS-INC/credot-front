import { convertTime } from '@/utils/parsingTimezone';
import type { Dispatch, SetStateAction } from 'react';
export const convertedGoogleTrendData = (trend: TGoogleTrendDataType) => {
  const minTurnoverMonth: string[] = [],
    maxTurnoverMonth: string[] = [];

  if (trend.length === 0) {
    minTurnoverMonth.push('-');
    maxTurnoverMonth.push('-');
    return { interest: [], date: [], minTurnoverMonth, maxTurnoverMonth };
  }

  const originInterest = trend.map((data) => data.interest);
  let min = Math.min(...originInterest);
  let max = Math.max(...originInterest);
  const percentage = max / 100;

  const interest = originInterest.map((originInterest) =>
    Math.round(originInterest / percentage),
  );

  const date = trend.map((data) => {
    if (data.interest === min) {
      minTurnoverMonth.push(convertTime(data.trendDate, 'MM'));
    }
    if (data.interest === max) {
      maxTurnoverMonth.push(convertTime(data.trendDate, 'MM'));
    }
    return convertTime(data.trendDate, 'YY.MM');
  });

  return { interest, date, minTurnoverMonth, maxTurnoverMonth };
};

export const _setOpenContent = (params: {
  _dipatch: Dispatch<SetStateAction<number[]>>;
  _state: number[];
  index: number;
}) => {
  const { _state, _dipatch, index } = params;

  if (_state.includes(index)) {
    return _dipatch(_state.filter((number) => number !== index));
  }
  return _dipatch(_state.concat(index));
};
