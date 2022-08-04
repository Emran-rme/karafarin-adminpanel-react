export const pluginReducer = (state = {}, action) => {
  switch (action.type) {
    case "INIT_PLUGIN":
      return { ...action.payload };
    case "CLEAR_PLUGIN":
      return { ...action.payload };
    default:
      return state;
  }
};
