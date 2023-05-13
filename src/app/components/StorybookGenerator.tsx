"use client"

import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import FlipBook from './FlipBook'; // Assuming FlipBook is in the same directory

const StorybookGenerator: React.FC = () => {
  const [description, setDescription] = useState<string>('');
  const [pages, setPages] = useState<number>(0);
  const [data, setData] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const response = await fetch(`http://localhost:4000/get_storybook/?desc=${description}&pgs=${pages}`);
    const data = await response.json();
    setData(data);
    setIsLoading(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={description} onChange={(e: ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)} />
        <input className='m-1' type="number" value={pages} onChange={(e: ChangeEvent<HTMLInputElement>) => setPages(parseInt(e.target.value))} />
        <button className='m-1' type="submit">Generate Storybook</button>
      </form>

      {isLoading ? <p>Generating...</p> : data && <FlipBook data={data} />}
    </div>
  );
};

export default StorybookGenerator;