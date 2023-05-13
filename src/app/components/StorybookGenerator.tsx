"use client"

import React, { useState, FormEvent } from 'react';
import Image from 'next/image';

interface StorybookGeneratorProps {
  endpoint: string;
}

interface StoryData {
  title: string;
  parsed_image_description: string[];
  parsed_text_description: string[];
  total_pages: number;
  user_input: string;
  illustrations: string[]; 
}

const StorybookGenerator: React.FC<StorybookGeneratorProps> = ({ endpoint }) => {
  const [inputText, setInputText] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const [data, setData] = useState<StoryData | null>(null);

  const fetchStorybook = async () => {
    const res = await fetch(`${endpoint}/get_storybook/?desc=${encodeURIComponent(inputText)}&pgs=${pageNumber}`);
    const data: StoryData = await res.json();
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
      {data && (
        <div>
          <h2>{data.title}</h2>
          <p>User Input: {data.user_input}</p>
          <p>Total Pages: {data.total_pages}</p>
          <h3>Parsed Image Description:</h3>
          <ul>
            {data.parsed_image_description.map((desc, index) => (
              <li key={index}>{desc}</li>
            ))}
          </ul>
          <h3>Parsed Text Description:</h3>
          <ul>
            {data.parsed_text_description.map((desc, index) => (
              <li key={index}>{desc}</li>
            ))}
          </ul>
          <h3>Illustrations:</h3>
          <div>
            {data.illustrations.map((illustration, index) => (
              <div key={index}>
                <Image 
                  src={`data:image/png;base64,${illustration}`}
                  alt={`Illustration ${index + 1}`}
                  width={500}  // Replace with your desired image width
                  height={500}  // Replace with your desired image height
                  layout="responsive"  // Optional: Makes the image scale up and down based on its container
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default StorybookGenerator;