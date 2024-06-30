import React from 'react';
import ToolButton from './ToolButton';
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';
import BrushSizeControl from './BrushSizeControl';

const SideBar = ({ users, tools, brushSize, setBrushSize, brushColor, setBrushColor, setTool }) => {
  return (
    <Box sx={{ width: '150px', backgroundColor: '#3c3c3c', color: 'white', p: 2 }}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
        {tools.map((toolItem, index) => (
          <ToolButton key={index} toolItem={toolItem} setTool={setTool} />
        ))}
      </Box>
      <BrushSizeControl brushSize={brushSize} setBrushSize={setBrushSize} />
      <Typography variant="h6" sx={{ color: '#eee', mt: 2 }}>Users</Typography>
      <List>
        {users.map((user, index) => (
          <ListItem key={index}>
            <ListItemText primary={user} sx={{ color: '#ccc' }} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default SideBar;
