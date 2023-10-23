import React from 'react';

const SingleMessage = ({ content, myMessage }) => {
  return (
    <div
      className="chatbox_message_wrapper"
      style={
        myMessage
          ? { justifyContent: 'flex-end' }
          : { justifyContent: 'flex-start' }
      }
    >
      {myMessage ? (
        <p className="chatbox_message_right">{content}</p>
      ) : (
        <p className="chatbox_message_left">{content}</p>
      )}
    </div>
  );
};

export default SingleMessage;
