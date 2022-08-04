export const loading = (status) => {
  return async (dispatch) => {
    if (status) {
      await dispatch({ type: "SHOW_LOADING", payload: true });
    } else {
      await dispatch({ type: "HIDE_LOADING", payload: false });
    }
  };
};
