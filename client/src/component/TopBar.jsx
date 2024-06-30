import React, { useState } from 'react';
import { Button, Menu, MenuItem } from '@mui/material';

const TopBar = ({ saveDrawing, loadDrawing, clearSavedDrawing, clearCanvas, downloadDrawing, users }) => {
  const [fileMenuAnchorEl, setFileMenuAnchorEl] = useState(null);
  const [usersMenuAnchorEl, setUsersMenuAnchorEl] = useState(null);

  const handleFileMenuClick = (event) => {
    setFileMenuAnchorEl(event.currentTarget);
  };

  const handleUsersMenuClick = (event) => {
    setUsersMenuAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setFileMenuAnchorEl(null);
    setUsersMenuAnchorEl(null);
  };

  return (
    <div className="topbar">
      <Button
        aria-controls="file-menu"
        aria-haspopup="true"
        onClick={handleFileMenuClick}
        sx={{
          color: 'white',
          backgroundColor: 'transparent',
          '&:hover': { backgroundColor: '#555' },
          fontSize: '0.8em',
          marginRight: '1rem', // Adjust spacing as needed
        }}
      >
        File
      </Button>
      <Menu
        id="file-menu"
        anchorEl={fileMenuAnchorEl}
        keepMounted
        open={Boolean(fileMenuAnchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={saveDrawing}>Save</MenuItem>
        <MenuItem onClick={loadDrawing}>Load</MenuItem>
        <MenuItem onClick={clearSavedDrawing}>Delete</MenuItem>
        <MenuItem onClick={clearCanvas}>Clear</MenuItem>
        <MenuItem onClick={downloadDrawing}>Download</MenuItem>
      </Menu>

      {/* Users Menu */}
      <Button
        aria-controls="users-menu"
        aria-haspopup="true"
        onClick={handleUsersMenuClick}
        sx={{
          color: 'white',
          backgroundColor: 'transparent',
          '&:hover': { backgroundColor: '#555' },
          fontSize: '0.8em',
        }}
      >
        Users
      </Button>
      <Menu
        id="users-menu"
        anchorEl={usersMenuAnchorEl}
        keepMounted
        open={Boolean(usersMenuAnchorEl)}
        onClose={handleClose}
      >
        {users.map((user, index) => (
          <MenuItem key={index} onClick={handleClose}>{user}</MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default TopBar;
