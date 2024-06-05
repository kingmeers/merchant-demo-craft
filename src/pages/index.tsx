/* eslint-disable @next/next/no-img-element */
// pages/index.js

import fs from 'fs';
import path from 'path';
import { GetStaticProps, NextPage } from 'next';
import Link from 'next/link';

type BookSummary = {
  id: string;
  title: string;
  price_USD: string;
  coverImage: string;
};

type HomeProps = {
  books: BookSummary[];
};

const Home: NextPage<HomeProps> = ({ books }) => {
  return (
    <div className="container mx-auto px-4 mb-10">
      <h1 className="text-2xl font-bold text-center my-4 mb-4">Welcome to Color-topia</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {books && books.map((book) => (
          <Link key={book.id} href={`/product/${book.id}`}>
            <div className="bg-white shadow-md rounded-lg overflow-hidden aspect-w-3 aspect-h-4 cursor-pointer">
              <img src={`/books/${book.id}/images/${book.coverImage}`} alt={book.title} className="w-full h-full object-cover"/>
              <div className="p-4">
                <h3 className="text-lg font-semibold">{book.title}</h3>
                <p className="text-gray-600">${book.price_USD}</p>
                <div className="bg-blue-100 border border-blue-500 text-blue-700 px-4 py-2 rounded relative mt-2">
                  <span className="block sm:inline">Competitive price based on Top Coloring Books in US</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};


export const getStaticProps: GetStaticProps = async () => {
  const booksDirectory = path.join(process.cwd(), 'public', 'books');
  const bookFolders = fs.readdirSync(booksDirectory);

  const books: BookSummary[] = bookFolders.map((bookId) => {
    const bookDirectory = path.join(booksDirectory, bookId);
    const bookDataPath = path.join(bookDirectory, 'book.json');
    const bookData = JSON.parse(fs.readFileSync(bookDataPath, 'utf8'));

    const imagesDirectory = path.join(bookDirectory, 'images');
    const images = fs.readdirSync(imagesDirectory);
    const coverImage = images[0]; // Assuming the first image is the cover

    return {
      id: bookId,
      title: bookData.fields.title,
      price_USD: parseFloat(bookData.price_USD).toFixed(2),
      coverImage
    };
  });

  return {
    props: { books },
  };
};

export default Home;
