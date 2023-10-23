import React from 'react';
import TimeAgo from 'timeago-react';
import { Popup } from 'react-map-gl';

const TaskPopup = ({ task, assignedUser, onClose }) => {
  return (
    <Popup
      longitude={task.coords.lng}
      latitude={task.coords.lat}
      anchor="left"
      onClose={onClose}
    >
      <div className="card">
        <label>Place</label>
        <span>{task.title}</span>
        <label>Review</label>
        <span>{task.desc}</span>
        {assignedUser && (
          <>
            <label>AssignedUser</label>
            <span>{assignedUser}</span>
          </>
        )}
        <label>Information</label>
        <span className="username">
          Created by <b>{task.createdBy}</b>
        </span>
        <label>deadline</label>
        <span className="date">{task.deadline}</span>
        <span className="date">{<TimeAgo datetime={task.createdAt} />}</span>
      </div>
    </Popup>
  );
};

export default TaskPopup;
