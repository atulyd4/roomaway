import { Grid } from '@mui/material';
import React from 'react';
import Iconify from 'src/components/layout/Iconify';

function Amenities({ amenities = [] }) {
  return (
    <Grid container>
      {amenities.map((amenity) => (
        <div
          key={amenity.name}
          style={{
            border: '.5px solid gray',
            borderRadius: 2,
            padding: 1,
            margin: 5,
            lineHeight: 2,
            alignSelf: 'center',
            alignContent: 'center',
            paddingLeft: 5,
            paddingRight: 2,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <span style={{ paddingRight: 5 }}>
            {amenity.name}
          </span>
          <Iconify icon={amenity.icon} width={22} height={22} />
        </div>
      ))}
    </Grid>
  );
}

export default Amenities;
