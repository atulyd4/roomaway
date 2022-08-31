import {
  Alert, Box, Button, Grid, TextField,
} from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../app/auth-slice';
import { login as apiLogin } from '../../api/auth';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = () => {
    apiLogin({ username, password })
      .then((response) => {
        dispatch(login(response));
        navigate('/');
      })
      .catch((e) => {
        setErrors(e);
      });
  };

  const onUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (

    <Grid container justifyContent="center" direction="column" style={{ marginTop: 20 }}>
      <form style={{ alignSelf: 'center' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', width: 500 }}>
          <TextField
            fullWidth
            size="large"
            error={errors && Object.keys(errors).includes('username')}
            helperText={errors && Object.keys(errors).includes('username') ? errors.username?.join('\n') : ''}
            type="text"
            value={username}
            onChange={onUsernameChange}
            id="outlined-basic"
            label="Username"
            style={{ marginTop: 10 }}
            variant="outlined"
          />
          <TextField
            fullWidth
            size="large"
            type="password"
            value={password}
            onChange={onPasswordChange}
            id="outlined-basic"
            label="Password"
            style={{ marginTop: 10 }}
            variant="outlined"
          />
          <Button fullWidth size="large" variant="contained" style={{ marginTop: 10 }} onClick={onSubmit}>Login</Button>
        </Box>
        {errors && Object.keys(errors).length > 0 ? (
          <span style={{ margin: 10 }}>
            <Alert severity="error">{errors?.detail}</Alert>
          </span>
        ) : null}
      </form>
      <span style={{ margin: 10 }}>
        { 'Don\'t have an account ?'}
        <Link to="/">Register </Link>
      </span>
    </Grid>
  );
}
export default Login;
