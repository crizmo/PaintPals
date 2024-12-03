import React from 'react';
import { Box } from '@mui/material';

const ToolBar = ({ brushColor, setBrushColor, brushSize, setBrushSize, tools, setTool, userName, undoDrawing }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#222',
        position: 'absolute',
        p: 1,
        gap: 2,
        top: '20%',
        left: 0,
        margin: '0 10px',
        borderRadius: '10px',
      }}
    >
      {/* Tool Selection */}
      {tools.map((tool) => (
        <Box
          key={tool.name}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
            color: 'white',
            p: 1,
            borderRadius: '10%',
            '&:hover': { backgroundColor: '#565656' },
          }}
          onClick={() => (tool.action === 'undo' ? undoDrawing() : setTool(tool.action))}
        >
          {tool.icon}
        </Box>
      ))}

      {/* Brush Size Input */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 1,
          mt: 'auto',
        }}
      >
        <input
          type="number"
          value={brushSize}
          onChange={(e) => setBrushSize(Number(e.target.value))}
          style={{
            width: '50px',
            color: 'white',
            background: 'transparent',
            border: '1px solid white',
            borderRadius: '5px',
            textAlign: 'center',
          }}
        />

        {/* Brush Color Input */}
        <input
          type="color"
          value={brushColor}
          onChange={(e) => setBrushColor(e.target.value)}
          style={{
            width: '40px',
            height: '40px',
            padding: 0,
            border: 'none',
            borderRadius: '50%',
          }}
        />
      </Box>

      {/* Username Display */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mt: 2,
        }}
      >
        <span style={{ color: '#ccc', fontSize: '12px' }}>Username</span>
        <span style={{ color: 'white', fontSize: '14px' }}>{userName}</span>
      </Box>
    </Box>
  );
};

export default ToolBar;
