"use client"

import React, { useState, FormEvent } from 'react';

interface BookProps {
  endpoint: string;
}

const Book: React.FC<BookProps> = ({ endpoint }) => {
  const [inputText, setInputText] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const [data, setData] = useState<any | null>(null);

  const fetchStorybook = async () => {
    const res = await fetch(`${endpoint}/get_storybook/?desc=${encodeURIComponent(inputText)}&pgs=${pageNumber}`);
    const data = await res.json();
    setData(data);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    fetchStorybook();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Enter text"
        />
        <input
          type="number"
          value={pageNumber}
          onChange={(e) => setPageNumber(Number(e.target.value))}
          placeholder="Enter page number"
        />
        <button type="submit">Fetch Storybook</button>
      </form>

      {data && <div>{JSON.stringify(data, null, 2)}</div>}
    </div>
  );
};

export default Book;