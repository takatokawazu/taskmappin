import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  chatboxes: [],
  chatHistory: {},
};

export const messagerSlice = createSlice({
  name: 'messanger',
  initialState,
  reducers: {
    addChatbox: (state, action) => {
      if (
        !state.chatboxes.find(
          (chatbox) => chatbox.userId === action.payload.userId
        )
      ) {
        state.chatboxes.push(action.payload);
      }
    },
    removeChatbox: (state, action) => {
      state.chatboxes = state.chatboxes.filter(
        (chatbox) => chatbox.userId !== action.payload
      );
    },
    addChatMessage: (state, action) => {
      if (state.chatHistory[action.payload.userId]) {
        console.log(state.chatHistory[action.payload.userId]);
        state.chatHistory[action.payload.userId].push({
          content: action.payload.content,
          myMessage: action.payload.myMessage,
          id: action.payload.id,
        });
      } else {
        state.chatHistory[action.payload.userId] = [
          {
            content: action.payload.content,
            myMessage: action.payload.myMessage,
            id: action.payload.id,
          },
        ];
      }
    },
  },
});

export const { addChatbox, removeChatbox, addChatMessage } =
  messagerSlice.actions;

export default messagerSlice.reducer;
