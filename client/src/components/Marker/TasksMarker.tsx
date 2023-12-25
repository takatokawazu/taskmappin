import React from 'react';
import { Room } from '@mui/icons-material';
import { Marker } from 'react-map-gl';

interface Task {
  _id: string;
  isDone: boolean;
  coords: {
    lat: number;
    lng: number;
  };
  createdBy: string;
}

interface TasksMarkerProps {
  task: Task;
  currentUser: string;
  onMarkerClick: (taskId: string, lat: number, lng: number) => void;
}

const TasksMarker: React.FC<TasksMarkerProps> = ({ task, currentUser, onMarkerClick }) => {
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
