"use client"

import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import FlipBook from './FlipBook';
import CustomSlider from './ui/CustomSlider';
import { TextField, Button } from '@mui/material';

const StorybookGenerator: React.FC = () => {
  const [description, setDescription] = useState<string>('');
  const [pages, setPages] = useState<number>(0);
  const [data, setData] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:8000/get_storybook/?des=${encodeURIComponent(description)}&pgs=${pages}`);
      const responseData = await response.json();
      setData(responseData.task_id);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="m-5">
      <form onSubmit={handleSubmit}>
        <TextField
          type="text"
          value={description}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)}
          id="outlined-multiline-static"
          label="Sentence/topic to use..."
          multiline
          fullWidth
          rows={4}
          sx={{
            color: '#e8e8ed;',
          }}
          placeholder="Set in the cowboy bebop universe, write a story about Benny, the bandit who travels to Mars in search of secret treasure"
        />
        <p className="my-6 pb-1 font-light text-sm">Number of pages...</p>
        <CustomSlider
          aria-label="Pages"
          value={pages}
          onChange={(e: Event, newValue: number | number[]) => setPages(newValue as number)}
        />
        <Button className="m-1" type="submit" variant="outlined">
          Generate Storybook
        </Button>
      </form>

      {data !== null && <FlipBook taskID={data} totalPages={pages} />}
    </div>
  );
};

export default StorybookGenerator;