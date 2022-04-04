import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  PayloadAction,
} from "@reduxjs/toolkit";
import { RootState } from "..";

import { client } from "../../api/client";
import { INote } from "../../types/posts";

// const initialState: INote[] = [];

const notesAdapter = createEntityAdapter<INote>({
  sortComparer: (a, b) => (b.date > a.date ? 1 : -1),
});
const initialState = notesAdapter.getInitialState();

export const fetchNotifications = createAsyncThunk<INote[], void, { state: RootState }>(
  "notifications/fetchNotifications",
  async (_, { getState }) => {
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
    // allNotificationsRead(state) {
    //   state.forEach((notification: INote) => {
    //     notification.read = true;
    //   });
    // },
    allNotificationsRead(state, action) {
      Object.values(state.entities).forEach((notification) => {
        if (notification) {
          notification.read = true;
        }
      });
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchNotifications.fulfilled, (state, action) => {
      // state.push(...action.payload);
      // state.forEach((notification) => {
      //   notification.isNew = !notification.read;
      // });
      // state.sort((a, b) => (b.date > a.date ? 1 : -1));
      // notesAdapter.upsertMany(state, action.payload);
      const notificationsWithMetadata = action.payload.map((notification) => ({
        ...notification,
        read: false,
        isNew: true,
      }));
      Object.values(state.entities).forEach((notification) => {
        // Any notifications we've read are no longer new
        if (notification) {
          notification.isNew = !notification.read;
        }
      });
      notesAdapter.upsertMany(state, notificationsWithMetadata);
    });
  },
});

export default notificationsSlice.reducer;

export const { allNotificationsRead } = notificationsSlice.actions;

// export const selectAllNotifications = (state: RootState) => {
//   return state.notifications;
// };

export const { selectAll: selectAllNotifications } = notesAdapter.getSelectors(
  (state: RootState) => state.notifications
);
