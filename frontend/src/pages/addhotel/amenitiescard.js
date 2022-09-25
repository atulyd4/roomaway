import React, { useEffect, useState } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { getamenities } from 'src/api/hotels';
import useResponsive from 'src/components/layout/useResponsive';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function MultipleSelectCheckmarks({ amenities, setAmenities }) {
  const isMobile = useResponsive('down', 'sm');
  const [names, setNames] = useState([]);
  useEffect(() => {
    getamenities().then((response) => setNames(response));
  }, []);
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setAmenities(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <div>
      <FormControl sx={{ width:isMobile?'100%': 700, marginTop: 2 }}>
        <InputLabel id="demo-multiple-checkbox-label">Amenities</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={amenities}
          onChange={handleChange}
          input={<OutlinedInput label="Amenities" />}
          renderValue={(selected) => names?.filter((n) => selected?.includes(n.id)).map((i) => i?.name).join(', ')}
          MenuProps={MenuProps}
        >
          {names.map((data) => (
            <MenuItem key={data.id} value={data.id}>
              <Checkbox checked={amenities.findIndex((n) => n === data.id) > -1} />
              <ListItemText primary={data.name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
