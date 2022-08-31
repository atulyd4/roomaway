import {
  Button, Grid, Stack, TextField, Box, MenuItem, InputLabel, FormControl, Select, Input, Alert,
} from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addhotel } from 'src/api/hotels';
import useNotification from 'src/hooks/use-notification';
import MultipleSelectCheckmarks from './amenitiescard';

function Hotelform() {
  const [hotelname, setHotelname] = useState('');
  const [addressone, setAddressone] = useState('');
  const [addresstwo, setAddresstwo] = useState('');
  const [city, setCity] = useState('');
  const [statename, setStatename] = useState('');
  const [roomscount, setRoomscount] = useState('');
  const [type, setType] = useState('');
  const [price, setPrice] = useState('');
  const [amenities, setAmenities] = useState([]);
  const [image, setImage] = useState([]);
  const [errors, setErrors] = useState({});

  const { showSuccessMessage, showErrorMessage } = useNotification();

  const navigate = useNavigate();

  const onSubmit = (event) => {
    event.preventDefault();
    addhotel({
      hotelname, addressone, addresstwo, city, statename, roomscount, type, price, amenities,
    }, image)
      .then(() => {
        showSuccessMessage('Hotel Added Sucessfully');
        navigate('/managehotel', { replace: true });
      }).catch((e) => {
        setErrors(e);
      });
  };

  const onNameChange = (e) => {
    setHotelname(e.target.value);
  };
  const onAddressoneChange = (e) => {
    setAddressone(e.target.value);
  };
  const onAddresstwoChange = (e) => {
    setAddresstwo(e.target.value);
  };
  const onCountChange = (e) => {
    setRoomscount(e.target.value);
  };
  const onCityChange = (e) => {
    setCity(e.target.value);
  };
  const onStatenameChange = (e) => {
    setStatename(e.target.value);
  };
  const onTypeChange = (event) => {
    setType(event.target.value);
  };
  const onPriceChange = (e) => {
    setPrice(e.target.value);
  };
  const onImageChange = (e) => {
    setImage(e.target.files);
  };

  return (
    <Grid container justifyContent="center" direction="column" style={{ marginTop: 20 }}>

      <h2>Add Your Hotel</h2>
      <form style={{ alignSelf: 'center' }}>
        <Box sx={{
          display: 'flex', flexDirection: 'column', width: 700, marginTop: 10,
        }}
        >

          <TextField
            error={errors && Object.keys(errors).includes('username')}
            helperText={errors && Object.keys(errors).includes('username') ? errors.username?.join('\n') : ''}
            value={hotelname}
            onChange={onNameChange}
            id="outlined-basic"
            style={{ marginTop: 10 }}
            label="Hotel name"
            variant="outlined"
          />
          <Stack direction={{ xs: 'column', sm: 'row' }} style={{ width: '100%', marginTop: 10 }} spacing={2}>
            <TextField
              fullWidth
              label="Address line one"
              value={addressone}
              onChange={onAddressoneChange}
            />
            <TextField
              fullWidth
              label="Address line two"
              value={addresstwo}
              onChange={onAddresstwoChange}
            />
          </Stack>
          <Stack direction={{ xs: 'column', sm: 'row' }} style={{ width: '100%', marginTop: 10 }} spacing={2}>
            <TextField
              fullWidth
              label="City"
              value={city}
              onChange={onCityChange}
            />
            <TextField
              fullWidth
              label="State"
              value={statename}
              onChange={onStatenameChange}
            />
          </Stack>

          <TextField
            error={errors && Object.keys(errors).includes('password')}
            helperText={errors && Object.keys(errors).includes('password') ? errors.password?.join('\n') : ''}
            value={roomscount}
            onChange={onCountChange}
            type="number"
            id="outlined-basic"
            label="total rooms"
            style={{ marginTop: 10 }}
            variant="outlined"
          />
          <Box sx={{ minWidth: 120, marginTop: 2 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Room Type</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={type}
                label="Room Type"
                onChange={onTypeChange}
              >
                <MenuItem value="NOR">Normal</MenuItem>
                <MenuItem value="LUX">Luxary</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <TextField
            error={errors && Object.keys(errors).includes('username')}
            helperText={errors && Object.keys(errors).includes('username') ? errors.username?.join('\n') : ''}
            value={price}
            onChange={onPriceChange}
            id="outlined-basic"
            style={{ marginTop: 10 }}
            label="Room Price"
            variant="outlined"
            type="number"
          />
          <MultipleSelectCheckmarks amenities={amenities} setAmenities={setAmenities} />
          <Input
            style={{ marginTop: '20px' }}
            onChange={onImageChange}
            inputProps={{
              multiple: true,
            }}
            type="file"
          />
          <Button
            fullWidth
            size="large"
            type="submit"
            onClick={onSubmit}
            variant="contained"
            style={{ marginTop: 10 }}
          >
            Save

          </Button>

        </Box>
      </form>
    </Grid>
  );
}
export default Hotelform;
