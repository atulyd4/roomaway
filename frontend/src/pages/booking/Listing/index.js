import { Button, Grid, Stack } from '@mui/material';
import React, { useEffect, useReducer, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { bookRoom, getHotels } from 'src/api/hotels';
import { storeHotels } from 'src/app/hotel-slice';
import SelectCityDropdown from 'src/components/common/Dropdown';
import useResponsive from 'src/components/layout/useResponsive';
import NewBookingModal from '../New';
import { initialState, reducer } from '../New/reducer';
import HotelCard from './HotelCard';

function Listing() {
  const isMobile = useResponsive('down', 'sm');
  const [showNewBooking, setShowNewBooking] = useState();
  const [selectedHotel, setSelectedHotel] = useState();
  const [city, setCity] = useState('');

  const [state, dispatch] = useReducer(reducer, initialState);

  const user = useSelector((s) => s.auth.user);
  const hotels = useSelector((s) => s.hotels.list);

  const rdispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    getHotels({ city }).then((response) => rdispatch(storeHotels(response)));
  }, [city]);

  const onBookingConfirm = () => {
    const body = {
      from_date: state.from_date.format('YYYY-MM-DD'),
      to_date: state.to_date.format('YYYY-MM-DD'),
      check_in_time: null,
      check_out_time: null,
      hotel_id: selectedHotel.id,
      booked_by: user.id,
      rooms_count: state.rooms_count,
      guest_count: state.guest_count,
      total_amount: selectedHotel.rooms.price * state.rooms_count,
    };

    bookRoom(body).then(() => {
      navigate('/bookings');
    });
  };

  const onBookingClick = (hotel) => {
    setShowNewBooking(true);
    setSelectedHotel(hotel);
  };

  const onClose = () => {
    setShowNewBooking(false);
    setSelectedHotel(null);
  };

  const removeFilter = () => {
    setCity('');
  };

  return (
    <div>
      { showNewBooking ? (
        <NewBookingModal
          state={state}
          dispatch={dispatch}
          hotel={selectedHotel}
          onClose={onClose}
          onBookingConfirm={onBookingConfirm}
        />
      ) : null }
      <Grid container width="100%" marginTop={isMobile?'10px':0} marginLeft={isMobile?'10px':0}>
        <SelectCityDropdown hotels={hotels} city={city} setCity={setCity} />
        { city && <Button size="small" variant="" onClick={removeFilter}>Clear filter</Button>}
      </Grid>

      {hotels.map((hotel) => (
        <HotelCard
          key={hotel.id}
          selectedHotel={selectedHotel}
          hotel={hotel}
          onBookingClick={onBookingClick}
        />
      ))}
    </div>
  );
}

export default Listing;
