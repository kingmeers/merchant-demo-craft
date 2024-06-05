// src/pages/api/getBooks.js

import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
    const booksDirectory = path.join(process.cwd(), 'public', 'books');
    fs.readdir(booksDirectory, (err, files) => {
        if (err) {
            console.error('Failed to read books directory:', err);
            return res.status(500).json({ error: 'Failed to read books directory' });
        }
        res.status(200).json(files);
    });
}
