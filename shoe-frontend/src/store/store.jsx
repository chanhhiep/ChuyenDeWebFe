import { configureStore } from "@reduxjs/toolkit";
import projectReducers from "./project/project-slice";
import loading from "./loading";
import user from "./user";
import comment from "./comment";
import notify from "./notification";
const rootReducer = {
    projects: projectReducers,
    loading: loading,
    user: user,
    comment: comment,
    notify: notify,
  };
  
  const store = configureStore({
    reducer: rootReducer,
  });
  
  export default store;