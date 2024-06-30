import React from 'react';
import { IconButton } from '@mui/material';

const ToolButton = ({ toolItem, setTool, isActive }) => {
  return (
    <IconButton
      onClick={() => setTool(toolItem.action)}
      sx={{
        color: 'white',
        backgroundColor: isActive ? '#1f1f1f' : 'transparent',
        borderRadius: '4px',
        '&:hover': { 
          backgroundColor: isActive ? '#1f1f1f' : '#333',
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
