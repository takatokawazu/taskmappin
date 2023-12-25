import React, { useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';

export default function AdminNavbar() {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const user = authContext?.user || null;

  const handleMapPage = () => {
    navigate(`/map/${user?.usename}`);
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
