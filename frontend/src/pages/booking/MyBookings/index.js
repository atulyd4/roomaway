import React, { useEffect, useState } from 'react';
import {
  Box, Card, CardContent, CardMedia, CircularProgress, Typography,
} from '@mui/material';
// import Carousel from 'react-material-ui-carousel';
// import Amenities from 'src/components/common/Amenities';
import { getbookings } from 'src/api/hotels';
import moment from 'moment';
import useResponsive from 'src/components/layout/useResponsive';

function MyBookings() {
  const isMobile = useResponsive('down', 'sm');
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getbookings().then((res) => {
      setBookings(res);
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

  if (!loading && bookings.length === 0) {
    return (
      <h1> No booking avilable yet ! </h1>
    );
  }

  return (
    <>
      {bookings.map((booking) => (
        <Card
          sx={{
            display: 'flex',flexDirection:isMobile?'column':'row', height:isMobile?'auto': 300, marginTop:isMobile?1: 5, padding:isMobile?1: 5,
          }}
          elevation={0}
          square
        >

          <CardMedia
            component="img"
            sx={{ width:isMobile?'auto': 200 }}
            image={booking?.hotel_id.photos[0]}
            alt="Live from space album cover"
          />
          <Box sx={{
            display: 'flex', justifyContent: 'space-evenly', flexDirection: 'row', textAlign: 'start',
          }}
          >
            <CardContent>
              <Typography component="div" variant="h4" paddingBottom="10px">
                {booking?.hotel_id.name}
              </Typography>
              <Typography color="text.secondary" component="div" paddingBottom="10px">
                <span>
                  {booking?.hotel_id.address.address_line_one}
                </span>
                <span>
                  {booking?.hotel_id.address.address_line_two}
                </span>
              </Typography>
              <Typography color="text.secondary" component="div" paddingBottom="10px">
                {booking?.hotel_id.address.city}
                <span>
                  {booking?.hotel_id.address.state}
                </span>
              </Typography>
              <Typography sx={{ color: 'red', fontSize: '20px', fontWeight: 'bold' }}>
                {`Total Paid Amount: ₹ ${booking.total_amount}`}
              </Typography>

            </CardContent>
            <Box marginTop="22px">
              <h3>bookig details</h3>
              <Typography marginTop={1}>
                {`Booking id : ${booking.id}`}

              </Typography>
              <Typography marginTop={1}>
                <div>
                  {`From Date : ${booking.from_date} - 12:00 PM`}
                </div>
              </Typography>
              <Typography marginTop={1}>
                <div>
                  {`To Date : ${booking.to_date} - 11:00 AM`}
                </div>
              </Typography>
              <Typography marginTop={1}>
                {`${booking.rooms_count} Rooms ${booking.guest_count} Guests`}
              </Typography>
              <Typography marginTop={1}>

                {`Created_at : ${moment(booking?.created_at).format('LLL')} `}

              </Typography>
            </Box>
          </Box>
        </Card>
      ))}
    </>
  );
}

export default MyBookings;
