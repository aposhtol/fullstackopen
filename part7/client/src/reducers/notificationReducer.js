import { createSlice } from "@reduxjs/toolkit";

const notificationReducer = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    setMessage(state, action) {
      return action.payload;
    },
  },
});

let msg;
let tout;

export const setNotification = (message, timeout) => {
  return (dispatch) => {
    dispatch(setMessage(message));

    if (msg !== message) {
      clearTimeout(tout);
      tout = setTimeout(() => dispatch(setMessage("")), timeout);
    }

    msg = message.concat(Math.random());
  };
};

export const { setMessage } = notificationReducer.actions;
export default notificationReducer.reducer;
