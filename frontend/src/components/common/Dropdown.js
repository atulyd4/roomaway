import React, { useEffect, useState } from 'react';
import { Autocomplete, TextField } from '@mui/material';

export default function SelectCityDropdown({ hotels, city, setCity }) {
  const [cities, setCities] = useState([]);

  useEffect(() => {
    if (hotels && Array.isArray(hotels)) {
      const c = hotels.map((h) => h.address.city);
      setCities([...new Set(c)]);
    }
  }, [hotels]);

  const onCityChange = (event, newVal) => {
    setCity(newVal || '');
  };

  return (
    <Autocomplete
      id="combo-box-demo"
      onChange={onCityChange}
      options={cities}
      style={{ marginRight: 10 }}
      disableClearable
      value={city}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Select city" />}
    />
  );
}
