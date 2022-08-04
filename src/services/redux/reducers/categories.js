export const categoriesReducers = (state = [], action) => {
  switch (action.type) {
    case "INIT_CATEGORIES":
      return [...action.payload];
    case "ADD_CATEGORIES":
      return [...action.payload];
    case "EDIT_CATEGORIES":
      return [...action.payload];
    case "DELETE_CATEGORIES":
      return [...action.payload];
    default:
      return state;
  }
};
