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
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useSelector, useDispatch } from 'react-redux';
import { signupUser, userSelector, clearState } from './services/userSlice';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
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

export default function SignUp() {

    const dispatch = useDispatch();
    const history = useNavigate();
    const { isFetching, isSuccess, isError, errorMessage } = useSelector(
      userSelector
    );
    const [visitor, setVisitor]= React.useState(false)
    const [newsletter, setNewsletter]= React.useState(false)
  
    React.useEffect(() => {
      return () => {
        dispatch(clearState());
      };
    }, []);
    React.useEffect(() => {
      if (isSuccess) {
        dispatch(clearState());
        history('/thank-you');
      }
      if (isError) {
        toast.error(errorMessage);
        dispatch(clearState());
      }
    }, [isSuccess, isError]);
  
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    var submitdata={
        user_email_address: data.get('user_email_address'),
        user_phone: data.get('user_phone'),
        user_name: data.get('user_name'),
        user_password: data.get('user_password'),
        user_Confirmpassword:data.get('user_Confirmpassword'),
        visitor:visitor? "YES":"NO"
    };
    dispatch(signupUser(submitdata));
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
      ) :
    (<ThemeProvider theme={theme}>
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
            Register
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  autoComplete="given-name"
                  name="user_name"
                  required
                  fullWidth
                  id="firstName"
                  label="Full Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} >
                <TextField
                  autoComplete="given-name"
                  name="user_phone"
                  fullWidth
                  id="user_phone"
                  label="Phone Number"
                  
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="user_email_address"
                  label="Email Address"
                  name="user_email_address"
                  autoComplete="email"
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="user_password"
                  label="Password"
                  type="password"
                  id="user_password"
                  
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="user_Confirmpassword"
                  label="Confirm Password"
                  type="password"
                  id="user_Confirmpassword"
                 
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="yes" onChange={e => {
                    // console.log(e.target.checked);
                     setVisitor(e.target.checked);
                  }} color="primary" />}
                  label="I am a visitor"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="yes" onChange={e => {
                    // console.log(e.target.checked);
                    setNewsletter(e.target.checked);
                  }} color="primary" />}
                  label="I want to receive inspiration and event updates."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Register
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/" variant="body2">
                  Already  registered? Checkin
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>)}</>
  );
}