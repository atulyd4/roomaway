import {
  Card,
  CardContent,
  Dialog, DialogContent, DialogTitle, IconButton,
  Box,
  Button,

  Grid, Stack, TextField, MenuItem, InputLabel, FormControl, Select,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { editMyHotel } from 'src/api/hotels';
import MultipleSelectCheckmarks from 'src/pages/addhotel/amenitiescard';
import useNotification from 'src/hooks/use-notification';
import useResponsive from 'src/components/layout/useResponsive';

function EditModal({
  hotel, onClose,
}) {
  const isMobile = useResponsive('down', 'sm');

  const initialState = {
    name: hotel?.name,
    address_line_one: hotel?.address.address_line_one,
    address_line_two: hotel?.address.address_line_two,
    city: hotel?.address.city,
    state: hotel?.address.state,
    total_rooms: hotel.total_rooms,
    room_type: hotel?.rooms.room_type,
    price: hotel?.rooms.price,
    amenities: hotel.amenities,
  };
  const [hotelname, setHotelname] = useState(initialState.name);
  const [addressone, setAddressone] = useState(initialState.address_line_one);
  const [addresstwo, setAddresstwo] = useState(initialState.address_line_two);
  const [city, setCity] = useState(initialState.city);
  const [statename, setStatename] = useState(initialState.state);
  const [roomscount, setRoomscount] = useState(initialState.total_rooms);
  const [type, setType] = useState(initialState.room_type);
  const [price, setPrice] = useState(initialState.price);
  const [amenities, setAmenities] = useState([]);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();
  const { showSuccessMessage, showErrorMessage } = useNotification();

  const onSubmit = (event) => {
    event.preventDefault();
    editMyHotel(hotel.id, {
      name: hotelname,
      address_line_one: addressone,
      address_line_two: addresstwo,
      city,
      state: statename,
      total_rooms: roomscount,
      room_type: type,
      price,
      amenities: amenities.length === 0 ? initialState.amenities.map((res) => res.id) : amenities,
    })
      .then(() => {
        showSuccessMessage('Updated successfully.');
        navigate('/', { replace: true });
      }).catch((e) => {
        showErrorMessage(e);
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

  return (
    <Dialog open disableEscapeKeyDown maxWidth="xl">
      <DialogTitle>
        Edit Your hotel
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
      <DialogContent>
        <Card sx={{ width:isMobile? '100%': 800, height: 'auto', overflow: 'visible' }} elevation={0}>

          <CardContent>
            <Grid container justifyContent="center" direction="column" style={{ marginTop: 20 }}>
              <h2>Update hotel details.. </h2>
              <form style={{ alignSelf: 'center' }}>
                <Box sx={{
                  display: 'flex', flexDirection: 'column', width:isMobile?'auto': 700, marginTop: 10,
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

                  <Button
                    fullWidth
                    size="large"
                    type="submit"
                    onClick={onSubmit}
                    variant="contained"
                    style={{ marginTop: 10 }}
                  >
                    Save Changes

                  </Button>

                </Box>
              </form>
            </Grid>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}

export default EditModal;
