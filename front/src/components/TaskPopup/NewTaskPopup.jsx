import React from 'react';
import { Popup } from 'react-map-gl';
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
      <div>
        <form onSubmit={onSubmit}>
          <label>タイトル</label>
          <input
            placeholder="Enter a title"
            onChange={(e) => handleFormFieldChange('title', e.target.value)}
          />
          <label>説明</label>
          <textarea
            placeholder="Say us something about this place"
            onChange={(e) => handleFormFieldChange('desc', e.target.value)}
          />
          <label>誰にして欲しい？</label>
          <select
            onChange={(e) =>
              handleFormFieldChange('assignedUser', e.target.value)
            }
          >
            {onlineUsers.map((user) => (
              <option key={user.socketId} value={user.username}>
                {user.username}
              </option>
            ))}
          </select>
          <label>締め切り日</label>
          <input
            type="date"
            onChange={(e) => handleFormFieldChange('deadline', e.target.value)}
          />
          <button className="submitButton">仕事を追加する</button>
        </form>
      </div>
    </Popup>
  );
};

export default NewTaskPopup;
