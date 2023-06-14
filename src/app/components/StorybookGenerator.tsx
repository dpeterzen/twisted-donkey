"use client"

import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import FlipBook from './FlipBook';
import TestBook from './TestBook';
import CustomSlider from './ui/CustomSlider';
import { TextField, Button } from '@mui/material';

const baseUrl = process.env.NEXT_PUBLIC_API_URL
const username = process.env.NEXT_PUBLIC_API_USERNAME;
const password = process.env.NEXT_PUBLIC_API_PASSWORD;

const StorybookGenerator: React.FC = () => {
  const [description, setDescription] = useState<string>('');
  const [pages, setPages] = useState<number>(0);
  const [taskId, setTaskId] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const headers = {
        'Authorization': 'Basic ' + Buffer.from(username + ":" + password).toString('base64'),
      }
      
      const response = await fetch(
        `${baseUrl}get_storybook/?des=${encodeURIComponent(description)}&pgs=${pages}`,
        { method: 'GET', headers: headers }
      );

      const responseData = await response.json();
      setTaskId(responseData.task_id);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="my-5 mx-auto" style={{ maxWidth: '600px' }}>
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
        <Button className="mt-1 mb-4" type="submit" variant="outlined">
          Generate Storybook
        </Button>
      </form>

      {/* {taskId !== null && <FlipBook taskID={taskId} totalPages={pages} />} */}
      {taskId !== null && <TestBook taskId={taskId} />}

    </div>
  );
};

export default StorybookGenerator;