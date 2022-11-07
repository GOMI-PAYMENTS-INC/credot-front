const HomePage = () => (
  <div
    className='hero min-h-screen'
    style={{ backgroundImage: 'url("https://placeimg.com/1000/800/arch")' }}
  >
    <div className='hero-overlay bg-opacity-60' />
    <div className='hero-content text-center text-neutral-content'>
      <div className='max-w-md'>
        <p className='mb-5'>글로벌 이커머스 플랫폼 키워드 분석도구</p>
        <h1 className='mb-5 text-5xl font-bold'>GOMI 키워드</h1>
        <button className='btn-primary btn'>Get Started</button>
      </div>
    </div>
  </div>
);

export default HomePage;
