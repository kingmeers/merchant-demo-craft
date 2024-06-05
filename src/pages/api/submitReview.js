import fs from "fs";
import path from "path";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { id, review, rating } = req.body;

  if (!id || !review || typeof rating !== "number" || rating < 1 || rating > 5 || review.length > 120) {
    return res.status(400).json({
      error: "Invalid input. Ensure your rating is between 1 and 5 and the review is not more than 120 characters."
    });
  }

  const booksDirectory = path.join(process.cwd(), "public", "books", id);
  const reviewsFile = path.join(booksDirectory, "reviews.json");

  let reviews = [];
  if (fs.existsSync(reviewsFile)) {
    const data = fs.readFileSync(reviewsFile);
    reviews = JSON.parse(data);
  }

  reviews.push({ review, rating });

  fs.writeFileSync(reviewsFile, JSON.stringify(reviews, null, 2));

  // After updating the local reviews, send them to the Python API
  const bookJsonPath = path.join(booksDirectory, "book.json");
  let bookData = {};
  if (fs.existsSync(bookJsonPath)) {
    bookData = JSON.parse(fs.readFileSync(bookJsonPath, 'utf8'));
  }

  try {
    const response = await fetch('http://0.0.0.0:3010/feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id,
        review: { review, rating },
        bookData // sending entire book data
      })
    });

    if (!response.ok) {
      throw new Error('Failed to send review to the supporter API');
    }
    const responseData = await response.json();
    return res.status(200).json({ message: "Review submitted successfully.", responseData });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to communicate with supporter API." });
  }
}
