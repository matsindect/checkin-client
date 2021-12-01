import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useSelector, useDispatch } from 'react-redux';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { fetchUserBytoken, userSelector, clearState } from './services/userSlice';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import DoneIcon from '@mui/icons-material/Done';
import ClipLoader from "react-spinners/ClipLoader";
function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://dubaiadventist.org/">
        Seventh Day Adventist Church
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignIn() {

  const dispatch = useDispatch();
  const history = useNavigate();
  const { isFetching, isError } = useSelector(userSelector);
  React.useEffect(() => {
    dispatch(fetchUserBytoken({ token: localStorage.getItem('token') }));
  }, []);

  const { username, user_email_address } = useSelector(userSelector);

  React.useEffect(() => {
    if (isError) {
      dispatch(clearState());
      history('/login');
    }
  }, [isError]);

  const onLogOut = () => {
    localStorage.removeItem('token');
    history('/login');
  };

  return (
      <>
    {isFetching ? (
        <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 30,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
        <ClipLoader color="#00BFFF" height={100} size={50} />
        </Box>
        
      </Container>
    </ThemeProvider>
      ) : (<ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 30,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <DoneIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Thank you
          </Typography>
          <div className="container mx-auto">
            Welcome <h3>{username}</h3>
          </div>
          <Grid container justifyContent="flex-center">
          <Button
              type="button"
              fullWidth
              variant="contained"
              onClick={onLogOut}
              sx={{ mt: 3, mb: 2 }}
            >
              Log out
            </Button>
            </Grid>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>)}
    </>
  );
}