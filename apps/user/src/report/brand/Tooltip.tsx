import { ContentPack } from '@/components/UseTooltip';
import { useMemo } from 'react';
export const Tooltips = () => {
  const TotalSales = () => {
    return (
      <ContentPack children='선택된 브랜드 상품들이 최근 30일간 판매된 매출 합계에요.' />
    );
  };

  const TotalAmount = () => {
    return (
      <ContentPack children='선택된 브랜드 상품들이 최근 30일간 판매된 판매량 합계에요.' />
    );
  };

  const AvgSales = () => {
    return (
      <ContentPack children='선택된 브랜드 상품들이 최근 30일간 판매된 평균 매출이에요.' />
    );
  };

  const AvgAmount = () => {
    return (
      <ContentPack children='선택된 브랜드 상품들이 최근 30일간 판매된 평균 판매량이에요.' />
    );
  };

  const AvgSalesPrice = () => {
    return (
      <ContentPack children='선택된 브랜드 상품들이 판매되고 있는 평균 판매가에요.' />
    );
  };
  const Place = () => {
    return <ContentPack children='선택된 브랜드 상품들의 매출 합계 순위에요.' />;
  };
  return useMemo(
    () => [
      TotalSales(),
      TotalAmount(),
      AvgSales(),
      AvgAmount(),
      AvgSalesPrice(),
      Place(),
    ],
    [],
  );
};
