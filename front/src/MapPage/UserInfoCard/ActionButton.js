import React from 'react';
import ChatButton from './ChatButton';

const ActionButton = (props) => {
  return (
    <div className="map_page_card_buttons_container">
      <ChatButton {...props} />
    </div>
  );
};

export default ActionButton;
