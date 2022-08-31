import { CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { getMyHotel } from 'src/api/hotels';
import HotelTemplate from './Hotel';
import EditModal from './Hoteleditmodal';

function MyHotel() {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showeditform, setShoweditform] = useState(false);
  const [selectedhotel, setSelectedhotel] = useState(null);

  useEffect(() => {
    setLoading(true);
    getMyHotel().then((res) => setHotels(res)).finally(() => setLoading(false));
  }, []);

  const onEditClick = (hotel) => {
    setSelectedhotel(hotel);
    setShoweditform(true);
  };

  const onClose = () => {
    setShoweditform(false);
    setSelectedhotel(null);
  };

  if (loading) {
    return (
      <CircularProgress />
    );
  }

  return (
    <div>
      {showeditform ? (<EditModal onClose={onClose} hotel={selectedhotel} />
      ) : null }

      {hotels.map((hotel) => (
        <HotelTemplate
          hotel={hotel}
          onEditClick={onEditClick}
        />
      ))}

    </div>
  );
}
export default MyHotel;
