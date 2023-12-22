import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { Typography } from '@mui/material';

interface AdminButtonProps {
  setSelectedButton: (newAlignment: string) => void;
}

export default function AdminButton({ setSelectedButton }: AdminButtonProps) {
  const [alignment, setAlignment] = React.useState<string>('all tasks');
  const [isMobile, setIsMobile] = React.useState<boolean>(false);

  const buttons = [
    'all tasks',
    'my completed tasks',
    'uncompleted tasks',
    'completed tasks',
    'created tasks',
    'assigned tasks',
  ];

  const handleChange = (event: React.MouseEvent<HTMLElement>, newAlignment: string | null) => {
    if (newAlignment) {
      setAlignment(newAlignment);
      setSelectedButton(newAlignment);
    }
  };

  const checkIsMobile = () => {
    setIsMobile(window.innerWidth <= 700);
  };

  React.useEffect(() => {
    window.addEventListener('resize', checkIsMobile);
    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);

  return (
    <>
      {isMobile ? (
        <div style={{ overflowX: 'auto' }}>
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
        </div>
      ) : (
        <div style={{ overflowX: 'auto' }}>
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
        </div>
      )}
      <Typography variant="h5" style={{ marginTop: '20px', marginBottom: '10px' }}>
        {alignment}
      </Typography>
    </>
  );
}
