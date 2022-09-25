import {
  Box,
  Card,
  CardContent,
  CardMedia, Dialog, DialogContent, DialogTitle, IconButton,
  Typography,
  Button,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { DateRangePicker, isInclusivelyBeforeDay } from 'react-dates';
import moment from 'moment';
import CloseIcon from '@mui/icons-material/Close';
import { getavailbility } from 'src/api/hotels';
import Roomcard from 'src/components/layout/Roomcard';
import useResponsive from 'src/components/layout/useResponsive';

function NewBookingModal({
  hotel, onClose, state, dispatch, onBookingConfirm,
}) {
  const isMobile = useResponsive('down', 'sm');
  const [focusedInput, setFocusedInput] = useState(null);
  const [availableRooms, setAvailableRooms] = useState(0);
  const [guest, setGuest] = useState(0);

  useEffect(() => {
    if (state.from_date && state.to_date) {
      getavailbility(hotel.id, state.from_date.format('YYYY-MM-DD'), state.to_date.format('YYYY-MM-DD'))
        .then((res) => {
          setAvailableRooms(res.available_rooms);
        });
    }
  }, [focusedInput]);

  return (
    <Dialog open disableEscapeKeyDown maxWidth="xl">
      <DialogTitle>
        New Booking
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
        <Card sx={{ width:isMobile?'auto': 800, overflow: 'visible' }} elevation={0}>
          <CardMedia
            component="img"
            height={isMobile?'auto':400}
            image={hotel?.photos[0]}
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h3" component="div">
              {hotel.name}
            </Typography>

            <DateRangePicker
              marginbottom="20px"
              startDate={state.from_date}
              startDateId="startDate"
              endDate={state.to_date}
              endDateId="endDate"
              onDatesChange={({ startDate, endDate }) => {
                dispatch({ type: 'from_date_change', payload: startDate });
                dispatch({ type: 'to_date_change', payload: endDate });
              }}
              focusedInput={focusedInput}
              onFocusChange={setFocusedInput}
              isOutsideRange={(day) => isInclusivelyBeforeDay(day, moment())}
              initialVisibleMonth={() => moment().subtract(1)}
              numberOfMonths={2}
              displayFormat={() => 'DD/MM/YYYY'}
              orientation="horizontal"
            />
            <hr style={{
              color: 'gray', backgroundColor: 'gray', height: 0.5, marginTop: '20px', marginbottom: '20px',
            }}
            />
            { state.from_date && state.to_date ? (
              <Roomcard
                guest={guest}
                setguest={setGuest}
                availableRooms={availableRooms}
                state={state}
                dispatch={dispatch}
              />
            ) : null }

            <hr style={{
              color: 'gray', backgroundColor: 'gray', height: 0.5, marginTop: '20px', marginbottom: '20px',
            }}
            />
            <Box display="flex" justifyContent="space-between" sx={{ fontSize: '20px', fontWeight: 'bold' }}>
              <div>
                Total price :

              </div>
              <div>
                { `₹ ${state.rooms_count === 0 ? (
                  hotel.rooms.price
                ) : hotel.rooms.price * state.rooms_count}`}
              </div>
            </Box>
            <Button
              style={{
                marginTop: '50px',
                marginLeft: '20px',
                borderRadius: 5,
                backgroundColor: 'green',
                padding: '5px 20px',
                fontSize: '18px',
              }}
              variant="contained"
              onClick={onBookingConfirm}
            >
              Continue to Book
            </Button>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}

export default NewBookingModal;
