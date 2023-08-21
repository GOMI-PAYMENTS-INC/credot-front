import { COUNTRY_TYPE } from '@/types/enum.code';
import { CountryType } from '@/generated/graphql';
import {
  convertCountry,
  convertCountryIconPath,
  convertSortByIconPath,
  convertSortedType,
} from '@/utils/convertEnum';
import { SORT_BY_TYPE } from '@/types/enum.code';

const COUNTRY = Object.keys(COUNTRY_TYPE).map((countryCode) => {
  const countryEnum = CountryType[countryCode as keyof typeof CountryType];

  return {
    value: countryEnum,
    iconPath: convertCountryIconPath(countryEnum),
    text: convertCountry(countryEnum),
  };
});

const SORTING_TYPE: TReportGeneratorType[] = Object.keys(SORT_BY_TYPE).map((sortBy) => {
  const sortByEnum = SORT_BY_TYPE[sortBy as keyof typeof SORT_BY_TYPE];
  return {
    value: sortByEnum,
    text: convertSortedType(sortByEnum),
    iconPath: convertSortByIconPath(sortByEnum),
  };
});

export { CountryType, COUNTRY, SORTING_TYPE, SORT_BY_TYPE };
