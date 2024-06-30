import React from 'react';
import { Box, Typography, InputBase, IconButton } from '@mui/material';
import SyncIcon from '@mui/icons-material/Sync';

const BrushSizeControl = ({ brushSize, setBrushSize }) => {
  const handleInputChange = (event) => {
    setBrushSize(event.target.value === '' ? '' : Number(event.target.value));
  };

  const handleBlur = () => {
    if (brushSize < 1) {
      setBrushSize(1);
    } else if (brushSize > 100) {
      setBrushSize(100);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#3c3c3c',
        padding: '4px 8px',
        borderRadius: '4px',
        mb: 2,
      }}
    >
      <Typography variant="body2" sx={{ color: '#ccc', mr: 1 }}>
        Size:
      </Typography>
      <InputBase
        value={brushSize}
        onChange={handleInputChange}
        onBlur={handleBlur}
        placeholder="Size"
        inputProps={{
          step: 1,
          min: 1,
          max: 100,
          type: 'number',
          'aria-labelledby': 'brush-size-input',
        }}
        sx={{
          width: '60px',
          color: '#fff',
          backgroundColor: '#333',
          padding: '2px 4px',
          textAlign: 'right',
          borderRadius: '4px',
          mr: 1,
          '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
            WebkitAppearance: 'none',
            margin: 0,
          },
          '&[type=number]': {
            MozAppearance: 'textfield',
          },
        }}
      />
    </Box>
  );
};

export default BrushSizeControl;
