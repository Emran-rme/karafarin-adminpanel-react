export const loadingReducers = (state = false, action) => {
  switch (action.type) {
    case "SHOW_LOADING":
      return action.payload;
    case "HIDE_LOADING":
      return action.payload;
    default:
      return state;
  }
};
