/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable no-param-reassign */
import { useEffect, useState } from 'react';
import PlusIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import {
  Alert,
  Box, Button, IconButton, Typography,
} from '@mui/material';
// import "./styles.css";

export default function Roomcard({
  dispatch, availableRooms, state,
}) {
  const [rooms, setRooms] = useState([]);
  if (availableRooms === 0) {
    <Alert severity="error">Rooms not available between selected dates</Alert>;
  }

  const updateGuestCount = (index, operation) => {
    const updated = rooms.map((room, i) => {
      if (index === i) {
        if (operation === 'add' && room.guestCount < 3) {
          room.guestCount += 1;
        }
        if (operation === 'remove' && room.guestCount > 0) {
          room.guestCount -= 1;
        }
      }
      return room;
    });
    setRooms(updated);
  };

  useEffect(() => {
    const totalGuests = rooms.map((r) => r.guestCount).reduce((acc, curr) => acc + curr, 0);
    dispatch({ type: 'room_updated', payload: { guestCount: totalGuests, roomCount: rooms.length } });
  }, [rooms]);

  const addRoom = () => {
    const updated = rooms.concat({ guestCount: 0 });
    setRooms(updated);
  };

  const removeRoom = (index) => {
    const updated = rooms.filter((room, i) => {
      if (i !== index) {
        return room;
      }
    });
    setRooms(updated);
  };

  return (
    <Box sx={{ width: 400, Height: 300 }}>
      <div className="App">
        {rooms.map((room, index) => (
          <div>
            <Box display="flex" justifyContent="space-between" marginBottom={2}>
              <Typography> Rooms</Typography>
              <Typography>Guests</Typography>
            </Box>
            <Box display="flex" justifyContent="space-between">
              <Typography>

                1 Room
                {state.guest_Count}
              </Typography>
              <div>
                <IconButton onClick={() => {
                  updateGuestCount(index, 'remove');
                }}
                >
                  <RemoveIcon />
                </IconButton>
                {room?.guestCount}
                <IconButton onClick={() => {
                  updateGuestCount(index, 'add');
                }}
                >
                  <PlusIcon />
                </IconButton>
                {rooms.length > 1 ? (
                  <Button onClick={() => removeRoom(index)}>
                    remvoe room
                  </Button>
                ) : null}
              </div>

            </Box>
          </div>
        ))}
        <br />
        <Button
          disabled={availableRooms === state.rooms_count}
          onClick={addRoom}
        >
          Add room
        </Button>
      </div>
    </Box>
  );
}
