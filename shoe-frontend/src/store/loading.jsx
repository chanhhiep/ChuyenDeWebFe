import { createSlice } from "@reduxjs/toolkit";

export interface loadingState {
    loading: boolean;
  }
  
  const initialState = {
    loading: false,
  };
  const loading = createSlice({
    name: "loading",
    initialState,
    reducers: {
      setLoading(state, action) {
        state.loading = action.payload;
      },
    },
  });
  
  const { reducer, actions } = loading;
  
  export const { setLoading } = actions;
  
  export default reducer;