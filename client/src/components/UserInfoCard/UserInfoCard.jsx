import { calulateDistanceBetweenCoords } from '../../utils/location';
import ChatButton from './ChatButton';

import * as React from 'react';
import List from '@mui/material/List';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';

export default function UserInfoCard(props) {
  const { open, setOpen, username, userLocation, userId, currentUserPosition } =
    props;

  return (
    <Dialog onClose={() => setOpen(false)} open={open}>
      <DialogTitle>User Details</DialogTitle>
      <List sx={{ pt: 0, textAlign: 'center' }}>
        <p style={{ fontSize: '16px' }}>
          ユーザー名: <b>{username}</b>
        </p>
        <p style={{ fontSize: '16px' }}>
          距離:{' '}
          <b>{`${calulateDistanceBetweenCoords(
            currentUserPosition,
            userLocation
          )}km`}</b>
        </p>
        <div>
          <ChatButton userId={userId} username={username} setOpen={setOpen} />
        </div>
      </List>
    </Dialog>
  );
}
