import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "..";

import { client } from "../../api/client";
import { INote } from "../../types/posts";

const initialState: INote[] = [];

export const fetchNotifications = createAsyncThunk(
  "notifications/fetchNotifications",
  async (_, { getState }) => {
    //@ts-ignore
    const allNotifications = selectAllNotifications(getState());
    const [latestNotification] = allNotifications;

    const latestTimestamp = latestNotification ? latestNotification.date : "";
    const response = await client.get(`/fakeApi/notifications?since=${latestTimestamp}`);
    console.log("", response);
    return response.data;
  }
);

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    allNotificationsRead(state) {
      state.forEach((notification: INote) => {
        notification.read = true;
      });
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchNotifications.fulfilled, (state, action) => {
      state.push(...action.payload);
      state.forEach((notification) => {
        // Any notifications we've read are no longer new
        notification.isNew = !notification.read;
      });
      state.sort((a, b) => (b.date > a.date ? 1 : -1));
    });
  },
});

export default notificationsSlice.reducer;

export const { allNotificationsRead } = notificationsSlice.actions;

export const selectAllNotifications = (state: RootState) => {
  return state.notifications;
};
