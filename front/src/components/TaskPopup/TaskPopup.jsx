import React from 'react';
import TimeAgo from 'timeago-react';
import { Popup } from 'react-map-gl';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { connectWithSocketIOServer } from '../../socketConnection/socketConn';
import { completeTask } from '../../redux/actions/taskActions';
import { DateField } from '@mui/x-date-pickers/DateField';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

const TaskPopup = ({ task, assignedUser, onClose }) => {
  const username = useParams();
  console.log(username);
  const handleComplateTask = async (e) => {
    completeTask(task, username);
    connectWithSocketIOServer();
    e.preventDefault();
    onClose();
  };

  return (
    <Popup
      longitude={task.coords.lng}
      latitude={task.coords.lat}
      anchor="left"
      onClose={onClose}
    >
      <Box>
        <form onSubmit={handleComplateTask}>
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
            value={task.title}
            disabled
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
            size="small"
            fullWidth
            value={task.desc}
            minRows={3}
            maxRows={6}
            disabled
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
            誰がする予定？
          </Typography>
          <TextField size="small" fullWidth value={assignedUser} disabled />
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
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DateField', 'DateField']}>
              <DateField defaultValue={dayjs(task.deadline)} disabled />
            </DemoContainer>
          </LocalizationProvider>
          <Typography sx={{ color: 'gray', fontSize: '12px' }}>
            {<TimeAgo datetime={task.createdAt} />}
          </Typography>
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
            完了する
          </Button>
        </form>
      </Box>
    </Popup>
  );
};

export default TaskPopup;
