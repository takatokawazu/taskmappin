import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useNavigate, useParams } from 'react-router-dom';

export default function AdminNavbar() {
  const navigate = useNavigate();
  const { username } = useParams();

  const handleMapPage = () => {
    navigate(`/map/${username}`);
  };

  return (
    <Box sx={{ flexGrow: 1, mb: 5 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, cursor: 'pointer' }}
            onClick={handleMapPage}
          >
            Map
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
