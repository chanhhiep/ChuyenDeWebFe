import { createSlice } from "@reduxjs/toolkit";
const initialState: UserModel = {
    id: "",
    name: "",
    phone: "",
    address: "",
    birthday: "",
    email: "",
    password: "",
    role: "",
    status: "",
    follows: [],
    listNotify: [],
  };
  const user = createSlice({
    name: "user",
    initialState,
    reducers: {
      setUser(state, action) {
        state = action.payload;
        return state;
      },
    },
  });
  
  const { reducer, actions } = user;
  
  export const { setUser } = actions;
  
  export default reducer;