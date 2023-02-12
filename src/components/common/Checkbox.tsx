import * as React from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

interface Props {
  checked: boolean;
  setChecked: (value: boolean) => void;
  label: string;
}

const CheckboxLabels: React.FC<Props> = ({ checked, setChecked, label }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  return (
    <FormControlLabel
      label={label}
      control={
        <Checkbox
          checked={checked}
          onChange={handleChange}
          style={{ color: 'white' }}
          inputProps={{ 'aria-label': 'controlled' }}
        />
      }
    />
  );
};

export default CheckboxLabels;
