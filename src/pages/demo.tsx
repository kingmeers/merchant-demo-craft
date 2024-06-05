import { useRouter } from 'next/router';
import type { NextPage } from 'next';

const DemoPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold text-center my-4">Watch Merchant Demo</h1>
    </div>
  );
}

export default DemoPage;
