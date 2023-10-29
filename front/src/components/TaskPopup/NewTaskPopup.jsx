import React from 'react';
import { Popup } from 'react-map-gl';
import {
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  Button,
} from '@mui/material';

const NewTaskPopup = ({
  longitude,
  latitude,
  onClose,
  onSubmit,
  onlineUsers,
  handleFormFieldChange,
}) => {
  return (
    <Popup
      longitude={longitude}
      latitude={latitude}
      anchor="left"
      onClose={onClose}
    >
      <Box p={2}>
        <form onSubmit={onSubmit}>
          <Typography
            variant="caption"
            sx={{
              color: 'tomato',
              fontSize: '13px',
              borderBottom: '0.5px solid tomato',
              mb: '2px',
            }}
          >
            タイトル
          </Typography>
          <TextField
            placeholder="Enter a title"
            fullWidth
            size="small"
            variant="outlined"
            onChange={(e) => handleFormFieldChange('title', e.target.value)}
          />
          <Typography
            variant="caption"
            sx={{
              color: 'tomato',
              fontSize: '13px',
              borderBottom: '0.5px solid tomato',
              mb: '2px',
            }}
          >
            説明
          </Typography>
          <TextField
            id="outlined-multiline-flexible"
            multiline
            placeholder="Say us something about this place"
            size="small"
            fullWidth
            minRows={3}
            maxRows={6}
            onChange={(e) => handleFormFieldChange('desc', e.target.value)}
          />
          <Typography
            variant="caption"
            sx={{
              color: 'tomato',
              fontSize: '13px',
              borderBottom: '0.5px solid tomato',
              mb: '2px',
            }}
          >
            誰がする？
          </Typography>
          <Select
            fullWidth
            variant="outlined"
            size="small"
            onChange={(e) =>
              handleFormFieldChange('assignedUser', e.target.value)
            }
          >
            {onlineUsers.map((user) => (
              <MenuItem key={user.socketId} value={user.username}>
                {user.username}
              </MenuItem>
            ))}
          </Select>
          <Typography
            variant="caption"
            sx={{
              color: 'tomato',
              fontSize: '13px',
              borderBottom: '0.5px solid tomato',
              mb: '2px',
            }}
          >
            締め切り日
          </Typography>
          <TextField
            type="date"
            fullWidth
            size="small"
            variant="outlined"
            onChange={(e) => handleFormFieldChange('deadline', e.target.value)}
          />
          <Button
            type="submit"
            className="submitButton"
            fullWidth
            size="small"
            sx={{
              mt: 2,
              backgroundColor: 'tomato',
              color: 'white',
              '&:hover': { backgroundColor: 'tomato', opacity: 0.8 },
            }}
          >
            仕事を追加する
          </Button>
        </form>
      </Box>
    </Popup>
  );
};

export default NewTaskPopup;
