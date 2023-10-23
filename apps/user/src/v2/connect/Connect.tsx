import { Default as Layout } from '@/common/layouts';
import akMallImage from '@/v2/connect/assets/pg/akmall.png';
import OnlineImage from '@/v2/connect/assets/pg/online.png';
import { BusinessTypeCard } from '@/v2/connect/components/BusinessTypeCard';
import { PGCard } from '@/v2/connect/components/PGCard';
const Connect = () => {
  return (
    <Layout useGap={true}>
      <BusinessTypeCard
        title='온라인 사업자'
        content={
          <>
            자체 온라인 쇼핑몰 또는 <br />
            서비스를 운영하는 사업자
          </>
        }
        image={OnlineImage}
        selected={true}
        onClick={() => {}}
      />
      <br />
      <BusinessTypeCard
        title='온라인 사업자'
        content={
          <>
            자체 온라인 쇼핑몰 또는 <br />
            서비스를 운영하는 사업자
          </>
        }
        image={OnlineImage}
        selected={false}
        onClick={() => {}}
      />
      <br />
      <PGCard
        key={'AK몰'}
        image={akMallImage}
        pgName={'AK몰'}
        onClick={() => {}}
        selected={true}
      />
      <br />
      <PGCard
        key={'AK몰'}
        image={akMallImage}
        pgName={'AK몰'}
        onClick={() => {}}
        selected={false}
      />
    </Layout>
  );
};

export default Connect;
