export const pagesReducers = (state = [], action) => {
  switch (action.type) {
    case "INIT_PAGES":
      return { ...action.payload };
    case "ADD_PAGES":
      return [...action.payload];
    case "UPDATE_PAGES":
      return [...action.payload];
    case "DELETE_PAGES":
      return { ...action.payload };

    default:
      return state;
  }
};
