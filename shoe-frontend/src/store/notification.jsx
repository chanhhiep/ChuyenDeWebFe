import { createSlice } from "@reduxjs/toolkit";

export interface NotifyState {
    listNotify: Array<any>;
  }
  const initialState: NotifyState = {
    listNotify: [],
  };
  const notify = createSlice({
    name: "notify",
    initialState,
    reducers: {
      setNotify(state, action) {
        state.listNotify = action.payload;
      },
    },
  });
  
  const { reducer, actions } = notify;
  
  export const { setNotify } = actions;
  
  export default reducer;