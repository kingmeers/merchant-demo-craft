import type { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold text-center my-4">Welcome to Merchant</h1>
      <div className="grid grid-cols-3 gap-4">
        {/* Product cards will go here */}
      </div>
    </div>
  );
}

export default Home;
