import React from 'react';
import TimeAgo from 'timeago-react';
import { Popup } from 'react-map-gl';
import { Box, Button, CardContent, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const TaskPopup = ({ task, assignedUser, onClose }) => {
  const username = useParams();

  const completeTask = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3003/api/tasks/${task._id}`, username);
      onClose();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Popup
      longitude={task.coords.lng}
      latitude={task.coords.lat}
      anchor="left"
      onClose={onClose}
    >
      <CardContent sx={{ textAlign: 'center' }}>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          place: {task.title}
        </Typography>
        <Typography sx={{ fontSize: 14 }} component="div">
          desc: {task.desc}
        </Typography>
        {assignedUser && (
          <Typography sx={{ fontSize: 14 }} color="text.secondary">
            assignedUser: {assignedUser}
          </Typography>
        )}
        <Typography sx={{ fontSize: 14 }}>
          Created by <b>{task.createdBy}</b>
        </Typography>
        <Typography sx={{ fontSize: 14 }}>deadline: {task.deadline}</Typography>
        <Typography sx={{ fontSize: 14 }}>
          {<TimeAgo datetime={task.createdAt} />}
        </Typography>
      </CardContent>
      <Box textAlign="center">
        <Button variant="contained" onClick={completeTask}>
          完了する
        </Button>
      </Box>
    </Popup>
  );
};

export default TaskPopup;
