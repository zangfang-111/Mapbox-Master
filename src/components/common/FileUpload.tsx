import * as React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import Stack from '@mui/material/Stack';

interface Props {
  file: any;
  fileRef: any;
  isFileUpload: (value: any) => void;
  label: string;
}

const UploadButtons: React.FC<Props> = ({
  fileRef,
  isFileUpload,
  file,
  label,
}) => {
  const fileName = file ? `${file?.name} (size: ${file?.size})` : '';

  return (
    <FormControl>
      <Typography id="upload-button-label" gutterBottom>
        {label}
      </Typography>
      <Stack direction="row" alignItems="center" spacing={4}>
        <Button variant="contained" component="label">
          Upload
          <input
            hidden
            accept="*.geojson"
            type="file"
            ref={fileRef}
            onChange={isFileUpload}
          />
        </Button>
        <Typography>{fileName}</Typography>
      </Stack>
    </FormControl>
  );
};

export default UploadButtons;
