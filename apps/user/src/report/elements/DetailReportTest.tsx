export const DetailReportTest = () => {
  return (
    <div className='divide-y-1 mt-[6px] rounded-lg border-[1px] border-grey-300'>
      <header>
        <p>키워드</p>
        <p>상품 타이틀</p>
      </header>
      <main>
        <div className='flex flex-col'>
          <p>국가</p>
          <p>리포트 생성일</p>
          <p>데이터 수집 기준</p>
          <p>적용 환율</p>
        </div>
        <div className='flex-flex-col'>
          <p>싱가포르</p>
          <p>2023.08.18</p>
          <p>연관도순 상위 50개</p>
          <p>1 SGD = 987.66KRW</p>
        </div>
      </main>
      <footer></footer>
    </div>
  );
};
