"use client"

import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import FlipBook from './FlipBook';
import { TextField, Button, Slider } from '@mui/material';
import CustomSlider from './ui/CustomSlider';
import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

const FlashingText = styled.p`
  animation: ${keyframes`
    0% {opacity: 1;}
    75% {opacity: 1;}
    76% {opacity: 0;}
    99% {opacity: 0;}
    100% {opacity: 1;}
  `} 2s linear infinite;
`;

const StorybookGenerator: React.FC = () => {
  const [description, setDescription] = useState<string>('');
  const [pages, setPages] = useState<number>(0);
  const [data, setData] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const response = await fetch(`http://localhost:4000/get_storybook/?des=${description}&pgs=${pages}`);
    const data = await response.json();
    setData(data);
    setIsLoading(false);
  };

  return (
<div className='m-5'>
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
      placeholder='Set in the cowboy bebop universe, write a story about Benny, the bandit who travels to Mars in search of secret treasure'
    />
    <p className='my-6 pb-1 font-light text-sm'>Number of pages...</p>
    <CustomSlider
      aria-label="Pages"
      value={pages}
      onChange={(e: Event, newValue: number | number[]) => setPages(newValue as number)}
    />
    <Button className='m-1' type="submit" variant="outlined">Generate Storybook</Button>
  </form>

  {isLoading ? <FlashingText>Generating...</FlashingText> : data && <FlipBook data={data} />}
</div>
  );
};

export default StorybookGenerator;