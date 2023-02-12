import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';

interface Props {
  value: any;
  setValue: (value: any) => void;
  label: string;
  clickValue: 'click';
  realTimeValue: 'realTime';
}

const ControlledRadioButtonsGroup: React.FC<Props> = ({
  value,
  setValue,
  label,
  clickValue,
  realTimeValue,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  return (
    <FormControl>
      <Typography id="controlled-radio-buttons-group">{label}</Typography>
      <RadioGroup
        row
        aria-labelledby="controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={value}
        defaultChecked={value}
        onChange={handleChange}
      >
        <FormControlLabel
          value={clickValue}
          control={<Radio />}
          label="Map Click"
        />
        <FormControlLabel
          value={realTimeValue}
          control={<Radio />}
          label="Real Time"
        />
      </RadioGroup>
    </FormControl>
  );
};

export default ControlledRadioButtonsGroup;
