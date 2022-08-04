export const pluginItemReduser = (state = {}, action) => {
  switch (action.type) {
    case "PLUGIN_SCORE":
      return { ...action.payload };
    case "PLUGIN_COMMENT":
      return [...action.payload];
    case "PLUGIN_GALERIES":
      return [...action.payload];
    case "CLEAR_PLUGINITEM":
      return { ...action.payload };
    default:
      return state;
  }
};
