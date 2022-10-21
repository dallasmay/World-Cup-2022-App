import { configureStore, createSlice } from "@reduxjs/toolkit";

const authInitialState = {
  isAuthenticated: false,
  userId: null,
  teamName: null,
};

const authenticationSlice = createSlice({
  name: "auth",
  initialState: authInitialState,
  reducers: {
    login(currentState) {
      currentState.isAuthenticated = true;
    },
    logout(currentState) {
      currentState.isAuthenticated = false;
    },
    setUserId(currentState, action) {
      currentState.userId = action.payload;
    },
    setTeamName(currentState, action) {
      currentState.teamName = action.payload;
    },
  },
});

const store = configureStore({
  reducer: authenticationSlice.reducer,
});

export const authActions = authenticationSlice.actions;

export default store;
