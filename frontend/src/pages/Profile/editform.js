import {
  Button, Grid, Stack, TextField, Box,
} from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { editprofile } from 'src/api/hotels';
import { updateUser } from 'src/app/auth-slice';
import useResponsive from 'src/components/layout/useResponsive';

function Editform({ user, cancelEdit }) {
  const isMobile = useResponsive('down', 'sm');
  const initialState = {
    username: user.username,
    firstname: user.first_name,
    lastname: user.last_name,
    email: user.email,
  };
  const [firstname, setFirstname] = useState(initialState.firstname);
  const [lastname, setLastname] = useState(initialState.lastname);
  const [email, setEmail] = useState(initialState.email);
  const [errors, setErrors] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    editprofile({
      first_name: firstname,
      last_name: lastname,
      email,
    })
      .then((response) => {
        dispatch(updateUser({ user: response }));
      }).catch((er) => {
        setErrors(er);
      }).finally(() => setSubmitting(false));
  };

  const onFirstnameChange = (e) => {
    setFirstname(e.target.value);
  };
  const onLastnameChange = (e) => {
    setLastname(e.target.value);
  };

  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <Grid container justifyContent="center" direction="column" style={{ marginTop: 20 }}>
      <form style={{ alignSelf: 'center' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', width:isMobile?'100%': 500 }}>
          <TextField
            error={errors && Object.keys(errors).includes('email')}
            helperText={errors && Object.keys(errors).includes('email') ? errors.email?.join('\n') : ''}
            value={initialState.username}
            id="outlined-basic"
            label="Username"
            style={{ marginTop: 10 }}
            variant="outlined"
            disabled
          />
          <Stack direction={{ xs: 'column', sm: 'row' }} style={{ width: '100%', marginTop: 10 }} spacing={2}>
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
          <Grid container justifyContent="space-between" direction="row">
            <Button onClick={cancelEdit}>
              Cancel
            </Button>
            <Button
              size="large"
              type="submit"
              disabled={submitting}
              onClick={onSubmit}
              variant="contained"
              style={{ marginTop: 10 }}
            >
              { submitting ? 'Saving changes...' : 'Save changes' }
            </Button>
          </Grid>
        </Box>
      </form>
    </Grid>
  );
}
export default Editform;
