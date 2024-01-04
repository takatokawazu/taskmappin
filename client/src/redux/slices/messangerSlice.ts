import { createSlice } from '@reduxjs/toolkit';

interface ChatMessage {
  content: string;
  myMessage: boolean;
  id: string; // メッセージのIDなど、適切な型を指定する必要があります
}

// チャットボックスの型を定義
interface Chatbox {
  userId: string;
  // 他に必要なプロパティがあればここに追加する
  username: string
}

interface MessengerState {
  chatboxes: Chatbox[];
  chatHistory: Record<string, ChatMessage[]>; // ユーザーIDごとのチャット履歴を保持
}

const initialState: MessengerState = {
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
