import { createSlice } from "@reduxjs/toolkit";
export interface CommentState {
  listComment: Array<any>;
}
const initialState: CommentState = {
  listComment: [],
};
const comment = createSlice({
  name: "comment",
  initialState,
  reducers: {
    setCommentList(state, action) {
      state.listComment = action.payload;
    },
  },
});

const { reducer, actions } = comment;

export const { setCommentList } = actions;

export default reducer;