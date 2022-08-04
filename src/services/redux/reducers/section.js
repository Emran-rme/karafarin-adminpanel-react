export const sectionsReducers = (state = [], action) => {
  switch (action.type) {
    case "INIT_SECTIONS":
      return [...action.payload];
    case "NEW_SECTION":
      return [...action.payload];
    case "DELETE_SECTION":
      return [...action.payload];
    case "UPDATE_CONTENT":
      return [...action.payload];
    default:
      return state;
  }
};
