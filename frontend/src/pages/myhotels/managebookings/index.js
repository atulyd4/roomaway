import { CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { managebookingscheckin, managebookingscheckout, managehotelbookings } from 'src/api/hotels';
import CheckingModal from './Checkingmodal';
import MyHotelBookings from './Hotelbookings';

function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [showBooking, setShowBooking] = useState();
  const [selectedBooking, setSelectedBooking] = useState();
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [value, setValue] = useState(new Date());

  useEffect(() => {
    setLoading(true);
    managehotelbookings().then((response) => {
      setBookings(response);
    })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <CircularProgress />
    );
  }
  const onBookingClick = (booking) => {
    setShowBooking(true);
    setSelectedBooking(booking);
  };
  const onClose = () => {
    setShowBooking(false);
    setSelectedBooking(null);
  };
  const onCheckinClick = () => {
    managebookingscheckin(selectedBooking.id, value)
      .then(() => {
        onclose();
      });
  };
  const onCheckoutClick = () => {
    managebookingscheckout(selectedBooking.id, value)
      .then(() => {
        onClose();
      });
  };
  return (
    <div>
      { showBooking ? (
        <CheckingModal
          booking={selectedBooking}
          onClose={onClose}
          startDate={startDate}
          setStartDate={setStartDate}
          value={value}
          setValue={setValue}
          onCheckinClick={onCheckinClick}
          onCheckoutClick={onCheckoutClick}
        />
      ) : null }
      {bookings.map((booking) => (
        <MyHotelBookings
          key={booking.id}
          booking={booking}
          onBookingClick={onBookingClick}
        />
      ))}
    </div>
  );
}

export default Bookings;
