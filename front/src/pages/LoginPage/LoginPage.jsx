import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Box,
  Typography,
  Container,
} from '@mui/material/';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import axios from 'axios';
import AuthContext from '../../context/AuthContext';

const defaultTheme = createTheme();

const LoginPage = () => {
  const navigate = useNavigate();
  const { getLoggedIn, loggedIn } = useContext(AuthContext);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const userData = {
      email: data.get('email'),
      password: data.get('password'),
    };
    console.log(userData);

    try {
      const { data } = await axios.post(
        'http://localhost:3003/api/users/login',
        userData
      );
      console.log(data);
      await getLoggedIn();
      const username = data.user.username;
      localStorage.setItem('userInfo', JSON.stringify(data.user));
      navigate(`/map/${username}`);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    console.log('navigate');
    if (loggedIn) {
      navigate('/map/takato');
    }
  }, []);

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1, width: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'} // <-- This is where the magic happens
              id="password"
              autoComplete="current-password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Link href="/register" variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default LoginPage;
