import React, { useEffect } from 'react';
import { IconButton } from '@mui/material';

const ToolButton = ({ 
  toolItem, 
  setTool, 
  isActive,
  undoDrawing
}) => {

  const handleClick = () => {
    if (toolItem.action === 'undo') {
      undoDrawing();
    } else {
      setTool(toolItem.action);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.key === 'z') {
        undoDrawing();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [undoDrawing]);

  return (
    <IconButton
      onClick={handleClick}
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
