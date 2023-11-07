import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { Typography } from '@mui/material';

export default function AdminButton({ setSelectedButton }) {
  const [alignment, setAlignment] = React.useState('all tasks');
  const buttons = [
    'all tasks',
    'my completed tasks',
    'uncompleted tasks',
    'completed tasks',
    'created tasks',
    'assigned tasks',
  ];

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
    setSelectedButton(newAlignment);
  };

  return (
    <>
      <ToggleButtonGroup
        color="primary"
        value={alignment}
        exclusive
        onChange={handleChange}
        aria-label="Platform"
      >
        {buttons.map((button, index) => (
          <ToggleButton key={index} value={button}>
            {button}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
      <Typography
        variant="h5"
        style={{ marginTop: '20px', marginBottom: '10px' }}
      >
        {alignment}
      </Typography>
    </>
  );
}
