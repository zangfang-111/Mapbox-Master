import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface Props {
  value: string;
  setValue: (value: string) => void;
  options: string[];
  label: string;
}

const BasicSelect: React.FC<Props> = ({ value, setValue, options, label }) => {
  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value as string);
  };

  return (
    <Box sx={{ minWidth: 120, margin: '30px 0' }}>
      <FormControl fullWidth>
        <InputLabel id="simple-select-label">{label}</InputLabel>
        <Select
          labelId="simple-select-label"
          id="simple-select"
          value={value}
          label="Age"
          style={{ color: 'white' }}
          onChange={handleChange}
        >
          {options.map((item, k) => (
            <MenuItem value={item} key={k}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default BasicSelect;
