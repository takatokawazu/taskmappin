import React from 'react';
import { Room } from '@mui/icons-material';
import { Marker } from 'react-map-gl';

const TasksMarker = ({ task, currentUser, onMarkerClick }) => {
  return (
    !task.isDone && (
      <Marker longitude={task.coords.lng} latitude={task.coords.lat}>
        <div
          onClick={(e) => {
            e.stopPropagation();
            onMarkerClick(task._id, task.coords.lat, task.coords.lng);
          }}
        >
          <Room
            style={{
              cursor: 'pointer',
              color: task.createdBy === currentUser ? 'tomato' : 'slateblue',
            }}
          />
        </div>
      </Marker>
    )
  );
};

export default TasksMarker;
