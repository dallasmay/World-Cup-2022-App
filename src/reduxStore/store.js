import { configureStore, createSlice } from "@reduxjs/toolkit";

const countries = [
  { id: 1, name: "Argentina", abbr: "ARG", rank: 3 },
  { id: 2, name: "Australia", abbr: "AUS", rank: 38 },
  { id: 3, name: "Belgium", abbr: "BEL", rank: 2 },
  { id: 4, name: "Brazil", abbr: "BRA", rank: 1 },
  { id: 5, name: "Cameroon", abbr: "CMR", rank: 43 },
  { id: 6, name: "Canada", abbr: "CAN", rank: 41 },
  { id: 7, name: "Costa Rica", abbr: "CRC", rank: 31 },
  { id: 8, name: "Croatia", abbr: "CRO", rank: 12 },
  { id: 9, name: "Denmark", abbr: "DEN", rank: 10 },
  { id: 10, name: "Ecuador", abbr: "ECU", rank: 44 },
  { id: 11, name: "England", abbr: "ENG", rank: 5 },
  { id: 12, name: "France", abbr: "FRA", rank: 4 },
  { id: 13, name: "Germany", abbr: "GER", rank: 11 },
  { id: 14, name: "Ghana", abbr: "GHA", rank: 61 },
  { id: 15, name: "Iran", abbr: "IRN", rank: 20 },
  { id: 16, name: "Japan", abbr: "JPN", rank: 24 },
  { id: 17, name: "Mexico", abbr: "MEX", rank: 13 },
  { id: 18, name: "Morocco", abbr: "MAR", rank: 22 },
  { id: 19, name: "Netherlands", abbr: "NED", rank: 8 },
  { id: 20, name: "Poland", abbr: "POL", rank: 26 },
  { id: 21, name: "Portugal", abbr: "POR", rank: 9 },
  { id: 22, name: "Qatar", abbr: "QAT", rank: 50 },
  { id: 23, name: "Saudi Arabia", abbr: "KSA", rank: 51 },
  { id: 24, name: "Senegal", abbr: "SEN", rank: 18 },
  { id: 25, name: "Serbia", abbr: "SRB", rank: 21 },
  { id: 26, name: "South Korea", abbr: "KOR", rank: 28 },
  { id: 27, name: "Spain", abbr: "ESP", rank: 7 },
  { id: 28, name: "Switzerland", abbr: "SUI", rank: 15 },
  { id: 29, name: "Tunisia", abbr: "TUN", rank: 30 },
  { id: 30, name: "United States", abbr: "USA", rank: 16 },
  { id: 31, name: "Uruguay", abbr: "URU", rank: 14 },
  { id: 32, name: "Wales", abbr: "WAL", rank: 19 },
];

// const countries = {
//   1: { name: "Argentina", abbr: "ARG", rank: 3 },
//   2: { name: "Australia", abbr: "AUS", rank: 38 },
//   3: { name: "Belgium", abbr: "BEL", rank: 2 },
//   4: { name: "Brazil", abbr: "BRA", rank: 1 },
//   5: { name: "Cameroon", abbr: "CMR", rank: 43 },
//   6: { name: "Canada", abbr: "CAN", rank: 41 },
//   7: { name: "Costa Rica", abbr: "CRC", rank: 31 },
//   8: { name: "Croatia", abbr: "CRO", rank: 12 },
//   9: { name: "Denmark", abbr: "DEN", rank: 10 },
//   10: { name: "Ecuador", abbr: "ECU", rank: 44 },
//   11: { name: "England", abbr: "ENG", rank: 5 },
//   12: { name: "France", abbr: "FRA", rank: 4 },
//   13: { name: "Germany", abbr: "GER", rank: 11 },
//   14: { name: "Ghana", abbr: "GHA", rank: 61 },
//   15: { name: "Iran", abbr: "IRN", rank: 20 },
//   16: { name: "Japan", abbr: "JPN", rank: 24 },
//   17: { name: "Mexico", abbr: "MEX", rank: 13 },
//   18: { name: "Morocco", abbr: "MAR", rank: 22 },
//   19: { name: "Netherlands", abbr: "NED", rank: 8 },
//   20: { name: "Poland", abbr: "POL", rank: 26 },
//   21: { name: "Portugal", abbr: "POR", rank: 9 },
//   22: { name: "Qatar", abbr: "QAT", rank: 50 },
//   23: { name: "Saudi Arabia", abbr: "KSA", rank: 51 },
//   24: { name: "Senegal", abbr: "SEN", rank: 18 },
//   25: { name: "Serbia", abbr: "SRB", rank: 21 },
//   26: { name: "South Korea", abbr: "KOR", rank: 28 },
//   27: { name: "Spain", abbr: "ESP", rank: 7 },
//   28: { name: "Switzerland", abbr: "SUI", rank: 15 },
//   29: { name: "Tunisia", abbr: "TUN", rank: 30 },
//   30: { name: "United States", abbr: "USA", rank: 16 },
//   31: { name: "Uruguay", abbr: "URU", rank: 14 },
//   32: { name: "Wales", abbr: "WAL", rank: 19 },
// };

const authInitialState = {
  isAuthenticated: false,
  userId: null,
  teamName: null,
  isLoading: true,
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
    setIsLoading(currentState, action) {
      currentState.isLoading = action.payload;
    },
  },
});

const bracketInitialState = {
  bracket: [],
  countriesArr: countries,
  groupsArr: [
    [-1],
    [
      { id: 12, name: "United States", abbr: "USA", fifa_rank: 12 },
      { id: 6, name: "England", abbr: "ENG", fifa_rank: 6 },
      { id: 26, name: "Wales", abbr: "WAL", fifa_rank: 26 },
      { id: 52, name: "Iran", abbr: "IRN", fifa_rank: 52 },
    ],
    [-1],
    [-1],
    [-1],
    [-1],
    [-1],
    [-1],
  ],
};

const bracketSlice = createSlice({
  name: "bracket",
  initialState: bracketInitialState,
  reducers: {
    setBracket(currentState, action) {
      currentState.bracket = action.payload;
    },
    setGroupsArr(currentState, action) {
      let currGroups = action.payload;
      currentState.groupsArr = [
        [currGroups[0], currGroups[1], currGroups[2], currGroups[3]],
        [currGroups[4], currGroups[5], currGroups[6], currGroups[7]],
        [currGroups[8], currGroups[9], currGroups[10], currGroups[11]],
        [currGroups[12], currGroups[13], currGroups[14], currGroups[15]],
        [currGroups[16], currGroups[17], currGroups[18], currGroups[19]],
        [currGroups[20], currGroups[21], currGroups[22], currGroups[23]],
        [currGroups[24], currGroups[25], currGroups[26], currGroups[27]],
        [currGroups[28], currGroups[29], currGroups[30], currGroups[31]],
      ];
    },
  },
});

const store = configureStore({
  reducer: { auth: authenticationSlice.reducer, bracket: bracketSlice.reducer },
});

export const authActions = authenticationSlice.actions;
export const bracketActions = bracketSlice.actions;

export default store;
