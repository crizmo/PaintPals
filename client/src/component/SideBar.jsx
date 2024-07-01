import React, { useState } from 'react';
import ToolButton from './ToolButton';
import { Box, Typography, List, ListItem, ListItemText, Slider } from '@mui/material';
import BrushSizeControl from './BrushSizeControl';

const SideBar = ({
  users, 
  tools,
  brushSize, 
  setBrushSize, 
  brushColor, 
  setBrushColor, 
  setTool, 
  undoDrawing 
}) => {
  const [activeTool, setActiveTool] = useState(null);

  const handleToolClick = (action) => {
    setTool(action);
    setActiveTool(action);
  };

  return (
    <Box sx={{
      width: '10%',
      backgroundColor:
        '#3c3c3c',
      color: 'white',
      p: 1,
    }}>
      <Box sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 1,
        mb: 2,
        p: 1,
        justifyContent: 'center',

      }}>
        {tools.map((toolItem, index) => (
          <ToolButton
            key={index}
            toolItem={toolItem}
            setTool={handleToolClick}
            isActive={toolItem.action === activeTool}

            undoDrawing={undoDrawing}
          />
        ))}
      </Box>
      <BrushSizeControl brushSize={brushSize} setBrushSize={setBrushSize} />
      <Slider
        value={brushSize}
        onChange={(e, newValue) => setBrushSize(newValue)}
        min={1}
        max={100}
        step={1}
        orientation="horizontal"
        aria-labelledby="vertical-slider"

        sx={{
          color: 'white',
          width: '90%',
          margin: '0 auto',
        }}
      />

    </Box>
  );
};

export default SideBar;
