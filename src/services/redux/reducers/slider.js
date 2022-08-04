export const sliderRedusers = (state = [], action) => {
  switch (action.type) {
    case "INIT_SLIDERS":
      return [...action.payload];
    case "ADD_SLIDER":
      return [...action.payload];
    case "DELETE_SLIDER":
      return [...action.payload];
    default:
      return state;
  }
};
