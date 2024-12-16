import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography, Box, Paper, Divider } from '@mui/material';
import { styled } from '@mui/system';

const BackgroundImage = styled('div')({
  background: 'url(https://i.ibb.co/41ctcCT/image.png) no-repeat center center fixed',
  backgroundSize: 'cover',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '0 20px',
  overflow: 'hidden',
});

const ScrollContainer = styled('div')({
  width: '100%',
  overflowY: 'scroll',
  height: '80vh',
  padding: '20px 0',
  boxSizing: 'border-box',
});

const FormPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  width: '100%',
  maxWidth: '400px',
  textAlign: 'center',
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(10px)',
  borderRadius: '15px',
  marginBottom: theme.spacing(6),
}));

const Section = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  margin: theme.spacing(6, 0),
  padding: theme.spacing(2),
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  borderRadius: '15px',
}));

const SectionImage = styled('img')(({ theme }) => ({
  width: '45%',
  borderRadius: '10px',
}));

const SectionText = styled('div')(({ theme }) => ({
  width: '45%',
  textAlign: 'left',
}));

const Footer = styled('div')(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(4, 0),
  backgroundColor: 'rgba(0, 0, 0, 0.8)',
  color: '#fff',
}));

const AnimatedButton = styled(Button)(({ theme }) => ({
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'scale(1.05)',
  },
  borderRadius: '25px',
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  margin: theme.spacing(2, 0),
}));

const RoomSetup = ({ name, setName, roomName, setRoomName, password, setPassword }) => {
  const navigate = useNavigate();

  const handleJoinRoom = () => {
    navigate(`/room/${roomName}/${name}`);
  };

  return (
    <BackgroundImage>
      <ScrollContainer >
        <Container
          maxWidth="md"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
          }}
        >
          <Typography
            variant="h2"
            gutterBottom
            sx={{
              color: 'black',
              fontWeight: 'bold',
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
              mb: 3
            }}
          >
            Welcome to PaintPals
          </Typography>
          <Typography variant="h5" gutterBottom sx={{ color: '#ff3e43', mb: 3 }}>
            A collaborative, multiplayer drawing application inspired by MS Paint.
          </Typography>
          <Typography variant="body1" sx={{ my: 2, color: 'black' }}>
            Create or join a room to start drawing with your friends in real-time. You can save your drawings, load previous sessions, and download your creations as images. Enjoy a variety of tools including different brush sizes, colors, and more!
          </Typography>
          <FormPaper elevation={3}>
            <Typography variant="h4" gutterBottom>
              Join or Create a Room
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Box
              component="form"
              sx={{
                '& .MuiTextField-root': { my: 2, width: '100%' },
              }}
              noValidate
              autoComplete="off"
            >
              <StyledTextField
                label="Your Name"
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <StyledTextField
                label="Room Name"
                variant="outlined"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
              />
              <StyledTextField
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
          </FormPaper>

          {/* Example Section 1 */}
          <Section>
            <SectionImage src="https://via.placeholder.com/350" alt="Example Image 1" />
            <SectionText>
              <Typography variant="h5" gutterBottom>
                How it Works
              </Typography>
              <Typography variant="body1">
                Step 1: Enter your name and the room name. If the room doesn't exist, it will be created.
                Enter the room password to ensure privacy.
              </Typography>
            </SectionText>
          </Section>

          {/* Example Section 2 */}
          <Section>
            <SectionText>
              <Typography variant="h5" gutterBottom>
                Real-time Collaboration
              </Typography>
              <Typography variant="body1">
                Step 2: Join the room and start drawing with your friends in real-time. Use various tools and
                colors to create amazing artworks together.
              </Typography>
            </SectionText>
            <SectionImage src="https://via.placeholder.com/350" alt="Example Image 2" />
          </Section>
        </Container>
      </ScrollContainer>
    </BackgroundImage>
  );
};

export default RoomSetup;
