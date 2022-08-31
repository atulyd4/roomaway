/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-undef */
import {
  Card,
  CardContent,
  Dialog, DialogContent, DialogTitle, IconButton,
  Box,
  Button,
} from '@mui/material';
import 'react-dates/initialize';
// import { SingleDatePicker } from 'react-dates';
import CloseIcon from '@mui/icons-material/Close';
import 'react-datepicker/dist/react-datepicker.css';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

function CheckingModal({
  booking, onClose, value, setValue, onCheckinClick, onCheckoutClick,
}) {
  return (
    <Dialog open disableEscapeKeyDown maxWidth="xl">
      <DialogTitle>
        Bookings Check_in and Check_Out
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
        <Card sx={{ width: 800, height: 300, overflow: 'visible' }} elevation={0}>

          <CardContent>
            <h3>{booking.booked_by.username}</h3>
            {booking.check_in_time === null ? (
              <>
                <h4 style={{ marginTop: 15, marginBottom: 15 }}> Check_in Date :</h4>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DateTimePicker
                    renderInput={(props) => <TextField {...props} />}
                    label="Date"
                    value={value}
                    onChange={(newValue) => {
                      setValue(newValue);
                    }}
                  />
                </LocalizationProvider>
                <Box style={{ marginTop: 10 }}>
                  <Button
                    variant="contained"
                    onClick={onCheckinClick}
                  >
                    Continue
                  </Button>
                </Box>
              </>
            ) : (
              <>
                <h4 style={{ marginTop: 15, marginBottom: 15 }}> Check_Out Date :</h4>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DateTimePicker
                    renderInput={(props) => <TextField {...props} />}
                    label="Date"
                    value={value}
                    onChange={(newValue) => {
                      setValue(newValue);
                    }}
                  />
                </LocalizationProvider>
                <Box style={{ marginTop: 10 }}>
                  <Button
                    variant="contained"
                    onClick={onCheckoutClick}
                  >
                    Continue
                  </Button>
                </Box>
              </>
            )}

          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}

export default CheckingModal;
