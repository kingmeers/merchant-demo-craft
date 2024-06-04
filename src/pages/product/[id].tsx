import { useRouter } from 'next/router';
import type { NextPage } from 'next';

const ProductPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold text-center my-4">Product Details - {id}</h1>
      {/* Details of the product */}
    </div>
  );
}

export default ProductPage;
