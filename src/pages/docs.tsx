import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import type { NextPage } from 'next';
import { marked } from 'marked'; // Notice how we import { marked } if the direct default import fails
import 'github-markdown-css';

const DocsPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [markdown, setMarkdown] = useState('');

  useEffect(() => {
    fetch('./../docs/README.md')
      .then(response => response.text())
      .then(async (text) => {
        const html = await marked.parse(text); 
        setMarkdown(html);
      });
  }, []);

  return (
    <div className="container mx-auto px-4 bg-white">
      <h1 className="text-2xl font-bold text-center my-4">Merchant Docs</h1>
      <div className="markdown-body" dangerouslySetInnerHTML={{ __html: markdown }} />
    </div>
  );
};

export default DocsPage;
