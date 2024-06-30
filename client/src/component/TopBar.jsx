import React, { useState, useEffect, useRef } from 'react';
import { Button, Menu, MenuItem } from '@mui/material';

const TopBar = ({ saveDrawing, loadDrawing, clearSavedDrawing, clearCanvas, downloadDrawing }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="topbar">
      <Button
        aria-controls="file-menu"
        aria-haspopup="true"
        onClick={handleClick}
        sx={{
          color: 'white',
          backgroundColor: 'transparent',
          '&:hover': { backgroundColor: '#555' },
          fontSize: '0.8em'
        }}
      >
        File
      </Button>
      <Menu
        id="file-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={saveDrawing}>Save</MenuItem>
        <MenuItem onClick={loadDrawing}>Load</MenuItem>
        <MenuItem onClick={clearSavedDrawing}>Delete</MenuItem>
        <MenuItem onClick={clearCanvas}>Clear</MenuItem>
        <MenuItem onClick={downloadDrawing}>Download</MenuItem>
      </Menu>
    </div>
  );
};

export default TopBar;
