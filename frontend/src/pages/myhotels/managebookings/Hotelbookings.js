import React from 'react';
import {
  Box, Button, Card, CardContent, CardMedia, Typography,
} from '@mui/material';
import moment from 'moment';

function MyHotelBookings({ booking, onBookingClick }) {
  return (
    <Card
      sx={{
        display: 'flex', height: 300, marginTop: 5, padding: 5,
      }}
      elevation={0}
      square
    >

      <CardMedia
        component="img"
        sx={{ width: 200 }}
        image={booking?.hotel_id.photos[0]}
        alt="Live from space album cover"
      />
      <Box sx={{
        display: 'flex', justifyContent: 'space-evenly', flexDirection: 'row', textAlign: 'start',
      }}
      >
        <CardContent>
          <Typography component="div" variant="h4" paddingBottom="10px">
            {`Username : ${booking?.booked_by.username}`}
          </Typography>
          <Typography color="text.secondary" component="div" paddingBottom="10px">
            <span>
              {`Name : ${booking?.booked_by.first_name}`}
            </span>
            <span>
              {booking?.booked_by.last_name}
            </span>
          </Typography>
          <Typography color="text.secondary" component="div" paddingBottom="10px">
            {`Email : ${booking?.booked_by.email}`}
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
            <div>
              {`Checkin Time : ${moment(booking?.check_in_time).format('LLL')} `}
            </div>
          </Typography>
          { booking?.check_out_time ? (
            <Typography marginTop={1}>
              <div>
                {`Checkout Time : ${moment(booking?.check_out_time).format('LLL')} `}
              </div>
            </Typography>
          ) : null }
        </Box>
        <div>
          {booking.check_in_time === null || booking.check_out_time === null ? (
            <span>
              { booking.check_in_time === null ? (
                <Button variant="outlined" onClick={() => onBookingClick(booking)}>check in </Button>
              ) : (
                <Button variant="outlined" color="error" onClick={() => onBookingClick(booking)}>check out </Button>
              ) }
            </span>
          )
            : null}

        </div>
      </Box>

    </Card>
  );
}

export default MyHotelBookings;
