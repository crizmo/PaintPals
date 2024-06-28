import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography, Box, Paper } from '@mui/material';

const RoomSetup = ({ name, setName, roomName, setRoomName, password, setPassword }) => {
  const navigate = useNavigate();

  const handleJoinRoom = () => {
    navigate(`/room/${roomName}/${name}`);
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          width: '100%',
          maxWidth: '400px',
          textAlign: 'center',
        }}
      >
        <Typography variant="h4" gutterBottom>
          Join or Create a Room
        </Typography>
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { my: 2, width: '100%' },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            label="Your Name"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="Room Name"
            variant="outlined"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
          />
          <TextField
            label="Room Password"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 3, width: '100%' }}
            onClick={handleJoinRoom}
          >
            Join Room
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default RoomSetup;
