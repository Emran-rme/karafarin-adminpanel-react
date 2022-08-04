export const bannerReducer = (state = {}, action) => {
  switch (action.type) {
    case "INIT_BANNER":
      return { ...action.payload };
    case "EDIT_BANNER":
      return { ...action.payload };
    default:
      return state;
  }
};
