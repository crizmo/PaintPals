import React from 'react';
import { Box, Input } from '@mui/material';

const ToolBar = ({ brushColor, setBrushColor, brushSize, setBrushSize, tools, setTool, userName, undoDrawing }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', backgroundColor: '#3c3c3c', p: 1 }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {/* Tool Selection */}
        {tools.map((tool) => (
          <Box
            key={tool.name}
            sx={{
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              color: 'white',
              mr: 2,
              p: 1,
              borderRadius: 1,
              '&:hover': { backgroundColor: '#565656' },
            }}
            onClick={() => (tool.action === 'undo' ? undoDrawing() : setTool(tool.action))}
          >
            {tool.icon}
          </Box>


        ))}
      </Box>

      <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center', gap: 2 }}>
        {/* Brush Size Input */}
        <Input
          type="number"
          value={brushSize}
          onChange={(e) => setBrushSize(Number(e.target.value))}
          sx={{
            width: '50px',
            color: 'white',
            '& input': { color: 'white', textAlign: 'center' },
          }}
          inputProps={{ min: 1, max: 100 }}
        />

        {/* Brush Color Input */}
        <Input
          type="color"
          value={brushColor}
          onChange={(e) => setBrushColor(e.target.value)}
          sx={{
            width: '50px',
            height: '50px',
            p: 0,
            m: 0,
            border: 'none',
            backgroundColor: 'transparent',
          }}
        />

        {/* Username Display */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ marginRight: '8px', color: '#ccc' }}>Username:</span>
          <Box sx={{ width: '3px' }} />
          <span style={{ color: 'white' }}>{userName}</span>
        </Box>
      </Box>
    </Box>
  );
};

export default ToolBar;
