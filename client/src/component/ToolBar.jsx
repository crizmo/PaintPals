import React from 'react';
import { Box, Input } from '@mui/material';

const ToolBar = ({ brushColor, setBrushColor }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', backgroundColor: '#3c3c3c', p: 1 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', ml: 'auto' }}>
        <span sx={{ mr: 2, color: '#ccc' }}>Color:</span>
        <Input
          type="color"
          value={brushColor}
          onChange={(e) => setBrushColor(e.target.value)}
          sx={{
            width: '36px',
            height: '36px',
            backgroundColor: 'white',
            borderRadius: '4px',
            border: 'none'
          }}
        />
      </Box>
    </Box>
  );
};

export default ToolBar;
