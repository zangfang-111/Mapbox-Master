import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import MuiInput from '@mui/material/Input';

// slider value input style
const Input = styled(MuiInput)`
  width: 42px;
  color: white;
  &:before,
  &:after {
    border: none;
  }
`;

// input slider props
interface InputSliderProps {
  value: number;
  setValue: (value: number) => void;
  label: string;
  sliderId: string;
  inputId: string;
}

const InputSlider: React.FC<InputSliderProps> = ({
  value,
  setValue,
  label,
  sliderId,
  inputId,
}) => {
  // slider changes
  const handleSliderChange = (event: Event, newValue: any) => {
    setValue(newValue);
  };

  // slider value input changes
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === '') return;
    setValue(Number(event.target.value));
  };

  // blur validation/exception handle
  const handleBlur = () => {
    if (value < 0) {
      setValue(0);
    } else if (value > 100) {
      setValue(100);
    }
  };

  return (
    <Box sx={{ width: '100%', margin: '30px 0' }}>
      <Typography id="slider-label" gutterBottom>
        {label}
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs>
          <Slider
            value={value || 0}
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
            id={sliderId}
          />
        </Grid>
        <Grid item>
          <Input
            value={value}
            size="small"
            color="secondary"
            onChange={handleInputChange}
            onBlur={handleBlur}
            inputProps={{
              step: 10,
              min: 0,
              max: 100,
              type: 'number',
              'aria-labelledby': 'input-slider',
              id: inputId,
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default InputSlider;
