export const userReducer = (state = {}, action) => {
  switch (action.type) {
    case "LOGIN_USER":
      return { ...action.payload };
    case "REGISTER_USER":
      return { ...action.payload };
    case "GET_USER_INFO":
      return { ...action.payload };
    case "SET_USER_INFO":
      return { ...action.payload };
    case "CLEAR_USER":
      return { ...action.payload };
    default:
      return state;
  }
};
