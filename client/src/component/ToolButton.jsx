import React from 'react';
import { IconButton } from '@mui/material';

const ToolButton = ({ toolItem, setTool }) => {
  return (
    <IconButton
      onClick={() => setTool(toolItem.action)}
      sx={{
        color: 'white',
        backgroundColor: 'transparent',
        '&:hover': { 
          backgroundColor: '#555',
          color: 'white',
          borderRadius: '4px'
         }
      }}
    >
      {toolItem.icon}
    </IconButton>
  );
};

export default ToolButton;
