/* eslint-disable @next/next/no-img-element */
// pages/products/[id].js

import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import fs from "fs";
import path from "path";
import { useState } from "react";

const StarRating = ({ rating, onRating }: any) => {
  return (
    <div>
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <button
            type="button"
            key={index}
            className={index <= rating ? "text-yellow-500" : "text-gray-400"}
            onClick={() => onRating(index)}
          >
            <span className="text-2xl">&#9733;</span>
          </button>
        );
      })}
    </div>
  );
};

type PrimaryContributor = {
  authorPrefix: string;
  authorFirstName: string;
  authorMiddleName: string;
  authorLastName: string;
  authorSuffix: string;
};

type BookData = {
  id: string;
  fields: {
    edition: string;
    subtitle: string;
    title: string;
  };
  primaryContributor: PrimaryContributor;
  price_USD: string;
  ckeditor: string;
  keywords: string[];
  placements: string[];
  book_type: string;
  demographic: string;
  theme: string;
  objects: string[];
  manuscript: string;
  coverFile: string;
  images: string[];
};

type Props = {
  bookData: BookData;
  images: string[];
};

const ProductPage: NextPage<Props> = ({ bookData, images }) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [showBook, setShowBook] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const submitReview = async () => {
    const response = await fetch("/api/submitReview", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: bookData.id,
        review,
        rating,
      }),
    });

    if (response.ok) {
      setSubmitSuccess(true);
      setReview("");
      setRating(0);
    }
  };

  return (
    <div className="container mx-auto px-12 py-8">
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h1 className="text-3xl font-bold text-gray-900">
            {bookData.fields.title}
          </h1>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            {bookData.fields.subtitle}
          </p>
        </div>
        <div className="flex overflow-x-scroll hide-scroll-bar mb-10">
          <div className="flex flex-nowrap">
            {images &&
              images.map((image, index) => (
                <img
                  key={index}
                  src={`/books/${bookData.id}/images/${image}`}
                  alt={`Image ${index}`}
                  className="max-h-300 object-cover mr-4"
                  style={{
                    maxHeight: "200px",
                    filter: `blur(${index > 3 && !showAlert ? 14 : 0}px)`,
                  }} // Ensures the image height does not exceed 200px
                />
              ))}
          </div>
        </div>
        {showBook ? null : showAlert ? (
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4"
            onClick={() => setShowBook(true)}
          >
            Download PDF
          </button>
        ) : (
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
            onClick={() => setShowAlert(true)}
          >
            Buy Coloring Book
          </button>
        )}
        {showBook && (
          <div>
            <iframe
              src={`/books/${bookData.id}/cover_output.pdf`}
              frameBorder="0"
              width="100%"
              height="1000px"
              allow="autoplay"
            ></iframe>
            <iframe
              src={`/books/${bookData.id}/output_bookie_a4.pdf`}
              frameBorder="0"
              width="100%"
              height="1000px"
              allow="autoplay"
            ></iframe>
          </div>
        )}
        {showAlert && (
          <div className="p-4 mt-4 rounded bg-green-200 text-green-800 text-sm">
            Success! Thank you for your purchase.
          </div>
        )}
        <div className="border-t border-gray-200 mt-4">
          <dl>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Edition</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {bookData.fields.edition}
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Price</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                ${parseFloat(bookData.price_USD).toFixed(2)}
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Author</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {`${bookData.primaryContributor.authorPrefix} ${bookData.primaryContributor.authorFirstName} ${bookData.primaryContributor.authorMiddleName} ${bookData.primaryContributor.authorLastName} ${bookData.primaryContributor.authorSuffix}`.trim()}
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Description</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {bookData.ckeditor}
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Keywords</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {bookData.keywords.join(", ")}
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Placements</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {bookData.placements.join(", ")}
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Book Type</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {bookData.book_type}
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Demographic</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {bookData.demographic}
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Theme</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {bookData.theme}
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Objects</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {bookData.objects.join(", ")}
              </dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="mt-4">
        <textarea
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          rows={4}
          placeholder="Write a review..."
          value={review}
          onChange={(e) => setReview(e.target.value)}
        />
        <StarRating rating={rating} onRating={setRating} />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
          onClick={submitReview}
        >
          Submit Review
        </button>
        {submitSuccess && (
          <p className="text-green-500">Thanks for reviewing!</p>
        )}
      </div>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const booksDirectory = path.join(process.cwd(), "public", "books");
  const bookFolders = fs.readdirSync(booksDirectory);
  const paths = bookFolders.map((bookId) => ({ params: { id: bookId } }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const bookId = params?.id;
  const bookDirectory = path.join(
    process.cwd(),
    "public",
    "books",
    bookId as string
  );
  const bookData = JSON.parse(
    fs.readFileSync(path.join(bookDirectory, "book.json"), "utf8")
  );
  const imagesDirectory = path.join(bookDirectory, "images");
  const images = fs.readdirSync(imagesDirectory); // Fetch all image filenames

  console.log(images);
  return {
    props: { bookData, images },
  };
};

export default ProductPage;
