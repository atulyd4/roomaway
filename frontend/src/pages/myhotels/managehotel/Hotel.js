/* eslint-disable no-unused-vars */

import {
  Box, Card, CardContent, CardMedia, Typography, Button,
} from '@mui/material';
import Carousel from 'react-material-ui-carousel';
// import Amenities from 'src/components/common/Amenities';
import Amenities from 'src/components/common/Amenities';

function HotelTemplate({ hotel, onEditClick }) {
  return (
    <Card
      sx={{
        display: 'flex', height: 420, marginTop: 5, padding: 5,
      }}
      elevation={0}
      square
    >
      <Carousel sx={{ width: 500 }}>
        {hotel?.photos?.map((res, index) => (
          <CardMedia
              // eslint-disable-next-line react/no-array-index-key
            key={index}
            component="img"
            sx={{ width: 500 }}
            image={res}
            alt="Live from space album cover"
          />
        ))}
      </Carousel>
      <Box sx={{
        display: 'flex', flex: 1, flexDirection: 'column', textAlign: 'start',
      }}
      >
        <CardContent sx={{ flex: 1 }}>
          <Typography component="div" variant="h4" paddingBottom="15px">
            {hotel?.name}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div" paddingBottom="10px">
            <span>
              {hotel?.address.address_line_one}
            </span>
            <span>
              {hotel?.address.address_line_two}
            </span>
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div" paddingBottom="10px">
            {hotel?.address.city}
            <span>
              {hotel?.address.state}
            </span>
          </Typography>
          <Amenities amenities={hotel.amenities} />
          <Box sx={{
            display: 'flex', flex: 1, justifyContent: 'space-between', paddingTop: '60px',
          }}
          >
            <Typography sx={{ color: 'red', fontSize: '20px', fontWeight: 'bold' }}>
              {`₹ ${hotel?.rooms.price}`}
            </Typography>
            <div>
              <Button variant="outlined" onClick={() => onEditClick(hotel)}> Edit Hotel </Button>
            </div>
          </Box>
        </CardContent>
      </Box>
    </Card>
  );
}

export default HotelTemplate;
