import {
  Button, Grid, Stack, TextField, Box, Checkbox, useMediaQuery,
} from '@mui/material';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from 'src/api/auth';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useTheme } from '@emotion/react';

function Register() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));

  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checked, setChecked] = React.useState(false);

  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      const params = {
        firstname, lastname, username, email, password, checked,
      };
      await register(params);
      navigate('/login', { replace: true });
    } catch (error) {
      setErrors(error);
    }
  };

  const onFirstnameChange = (e) => {
    setFirstname(e.target.value);
  };
  const onLastnameChange = (e) => {
    setLastname(e.target.value);
  };
  const onNameChange = (e) => {
    setUsername(e.target.value);
  };
  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <Grid container justifyContent="center" direction="column" style={{ marginTop: 20 }}>
      <form style={{ alignSelf: 'center',width:'100%' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', width:matches ? 500 : 'auto' }}>
          <Stack direction={{ xs: 'column', sm: 'row' }} style={{ width: '100%' }} spacing={2}>
            <TextField
              fullWidth
              name="firstName"
              label="First name"
              value={firstname}
              onChange={onFirstnameChange}
            />
            <TextField
              fullWidth
              name="lastName"
              label="Last name"
              value={lastname}
              onChange={onLastnameChange}
            />
          </Stack>
          <TextField
            error={errors && Object.keys(errors).includes('username')}
            helperText={errors && Object.keys(errors).includes('username') ? errors.username?.join('\n') : ''}
            value={username}
            onChange={onNameChange}
            id="outlined-basic"
            style={{ marginTop: 10 }}
            label="username"
            variant="outlined"
          />
          <TextField
            error={errors && Object.keys(errors).includes('email')}
            helperText={errors && Object.keys(errors).includes('email') ? errors.email?.join('\n') : ''}
            value={email}
            onChange={onEmailChange}
            type="email"
            id="outlined-basic"
            label="Email Address"
            style={{ marginTop: 10 }}
            variant="outlined"
          />
          <TextField
            error={errors && Object.keys(errors).includes('password')}
            helperText={errors && Object.keys(errors).includes('password') ? errors.password?.join('\n') : ''}
            value={password}
            onChange={onPasswordChange}
            type="password"
            id="outlined-basic"
            label="Password"
            style={{ marginTop: 10 }}
            variant="outlined"
          />
          <FormControlLabel
            control={(
              <Checkbox
                checked={checked}
                onChange={handleChange}
                inputProps={{ 'aria-label': 'controlled' }}
              />
            )}
            label="Register as a manager"
          />
          <Button
            fullWidth
            size="large"
            type="submit"
            onClick={onSubmit}
            variant="contained"
            style={{ marginTop: 10 }}
          >
            Register

          </Button>

        </Box>
      </form>
      <span style={{ margin: 10 }}>
        Already have an account ?
        <Link to="/login">Login </Link>
      </span>
    </Grid>
  );
}
export default Register;
