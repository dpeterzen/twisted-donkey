import * as React from 'react';
import Slider from '@mui/material/Slider';
import { SliderProps } from '@mui/material';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

const iOSBoxShadow =
  '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)';

const IOSSlider = styled(Slider)(({ theme }) => ({
  color: theme.palette.mode === 'dark' ? '#3880ff' : '#3880ff',
  height: 2,
  padding: '15px 0',
  '& .MuiSlider-thumb': {
    height: 18,
    width: 18,
    backgroundColor: '#fff',
    boxShadow: iOSBoxShadow,
    '&:focus, &:hover, &.Mui-active': {
      boxShadow:
        '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)',
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        boxShadow: iOSBoxShadow,
      },
    },
  },
  '& .MuiSlider-valueLabel': {
    fontSize: 16,
    fontWeight: 'normal',
    top: -6,
    backgroundColor: 'unset',
    color: '#3880ff',
    '&:before': {
      display: 'none',
    },
    '& *': {
      background: 'transparent',
    },
  },
  '& .MuiSlider-track': {
    border: 'none',
  },
  '& .MuiSlider-rail': {
    opacity: 0.5,
    backgroundColor: '#bfbfbf',
  },
}));
const CustomSlider: React.FC<SliderProps> = (props) => {
  return (
    <Box>
      <IOSSlider
        aria-label="ios slider"
        valueLabelDisplay="on"
        max={20}
        min={1}
        {...props}
      />
    </Box>
  );
}

export default CustomSlider;
