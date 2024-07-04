import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography, Box, Paper } from '@mui/material';
import { styled } from '@mui/system';

const GradientBackground = styled('div')({
  background: 'linear-gradient(135deg, #ff4081, #81d4fa)',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const AnimatedButton = styled(Button)({
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'scale(1.05)',
  },
});

const RoomSetup = ({ name, setName, roomName, setRoomName, password, setPassword }) => {
  const navigate = useNavigate();

  const handleJoinRoom = () => {
    navigate(`/room/${roomName}/${name}`);
  };

  return (
    <GradientBackground>
      <Container
        maxWidth="md"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          textAlign: 'center',
          padding: 2,
        }}
      >
        <Typography variant="h2" gutterBottom sx={{ color: '#fff', fontWeight: 'bold' }}>
          Welcome to CoDraw!
        </Typography>
        <Typography variant="h5" gutterBottom sx={{ color: '#ffecb3' }}>
          A collaborative, multiplayer drawing application inspired by MS Paint.
        </Typography>
        <Typography variant="body1" sx={{ my: 2, color: '#fff' }}>
          Create or join a room to start drawing with your friends in real-time. You can save your drawings, load previous sessions, and download your creations as images. Enjoy a variety of tools including different brush sizes, colors, and more!
        </Typography>
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            width: '100%',
            maxWidth: '400px',
            textAlign: 'center',
            mt: 4,
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
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
            <AnimatedButton
              variant="contained"
              color="primary"
              sx={{ mt: 3, width: '100%' }}
              onClick={handleJoinRoom}
            >
              Join Room
            </AnimatedButton>
          </Box>
        </Paper>
      </Container>
    </GradientBackground>
  );
};

export default RoomSetup;
