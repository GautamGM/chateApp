import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    chat: null,
    user: null,
    isCurrentUserIsBlocked: false,
    isReceiverBlocked: false,
  },
  reducers: {
    blockCurrentUser(state, action) {
      const { chatId, user, currentUserId } = action.payload;

      // Check if the current user is blocked
      if (user.blockedUsers.includes(currentUserId)) {
        state.isCurrentUserIsBlocked = true;
      } else {
        state.isCurrentUserIsBlocked = false;
      }

      // Check if the receiver is blocked
      if (user.blockedUsers.includes(chatId)) {
        state.isReceiverBlocked = true;
      } else {
        state.isReceiverBlocked = false;
      }
    },
  },
});

export  const chatReducer=chatSlice.reducer

export co

