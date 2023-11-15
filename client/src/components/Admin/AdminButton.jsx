import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { Typography } from '@mui/material';

export default function AdminButton({ setSelectedButton }) {
  const [alignment, setAlignment] = React.useState('all tasks');
  const [isMobile, setIsMobile] = React.useState(false);

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

  const checkIsMobile = () => {
    setIsMobile(window.innerWidth <= 700); // 700px以下の場合を例としています
  };

  React.useEffect(() => {
    // コンポーネントがマウントされたときにイベントリスナーを追加
    window.addEventListener('resize', checkIsMobile);
    // コンポーネントがアンマウントされたときにイベントリスナーを削除
    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);


  return (
    <>
      {isMobile ? (
        <div
          style={{
            overflowX: 'auto'
          }}
        >
          <ToggleButtonGroup
            color="primary"
            value={alignment}
            exclusive
            onChange={handleChange}
            aria-label="Platform"
          >
            {buttons.map((button, index) => (
              <ToggleButton
                key={index}
                value={button}
              >
                {button}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </div>
      ) : (
        <div style={{
          overflowX: 'auto'
        }}>
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
      <Typography
        variant="h5"
        style={{ marginTop: '20px', marginBottom: '10px' }}
      >
        {alignment}
      </Typography>

    </>
  );
}
