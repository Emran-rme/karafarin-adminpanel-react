import axios from "axios";
import { errorMessage, successMessage } from "../../../utils/helpers/helpers";

import {
  changePassUrl,
  setUserInfoUrl,
  userInfoUrl,
  userLoginUrl,
  userLogOutUrl,
  userRegisterUrl,
} from "../services/userService";
import { loading } from "./Loading";

export const userRegister = (userData, searchParams, navigation) => {
  return async (dispatch) => {
    try {
      dispatch(loading(true));
      const { data, status } = await userRegisterUrl(userData);
      if (status === 201) {
        successMessage(data.message);
        if (searchParams.get("return")) {
          navigation(`../${searchParams.get("return")}`, { replace: true });
        } else {
          navigation("/", { replace: true });
        }
        axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
        localStorage.setItem("token", data.token);
        localStorage.setItem(
          "expired_at",
          Math.floor(Date.parse(data.expired_at) / 1000)
        );
        localStorage.setItem("user-info", JSON.stringify(data.user));
      }
      await dispatch({ type: "REGISTER_USER", payload: data.user });
    } catch (error) {
      if (error.response.status === 422) {
        Object.entries(error.response.data.errors).map((err) => {
          errorMessage(err[1][0]);
        });
      } else {
        errorMessage("خطای ناشناخته ای رخ داده مجددا امتحان فرمایید.", "dark");
      }
      localStorage.removeItem("token");
      localStorage.removeItem("user-info");
    } finally {
      dispatch(loading(false));
    }
  };
};

export const userLogin = (userData, searchParams, navigation) => {
  return async (dispatch) => {
    try {
      dispatch(loading(true));
      const { data, status } = await userLoginUrl(userData);
      if (status === 200) {
        successMessage(data.message);
        navigation("/", { replace: true });
        axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
        localStorage.setItem("token", data.token);
        localStorage.setItem(
          "expired_at",
          Math.floor(Date.parse(data.expired_at) / 1000)
        );
        localStorage.setItem("user-info", JSON.stringify(data.user));
      }
      await dispatch({ type: "LOGIN_USER", payload: data.user });
    } catch (error) {
      if (error.response.status === 422) {
        Object.entries(error.response.data.errors).map((err) => {
          errorMessage(err[1][0]);
        });
      } else if (error.response.status === 401) {
        errorMessage(error.response.data.message, "dark");
      } else {
        errorMessage("خطای ناشناخته ای رخ داده مجددا امتحان فرمایید.", "dark");
      }
      localStorage.removeItem("token");
      localStorage.removeItem("user-info");
    } finally {
      dispatch(loading(false));
    }
  };
};

export const getUserInfo = () => {
  return async (dispatch) => {
    try {
      dispatch(loading(true));
      const { data } = await userInfoUrl();
      await dispatch({ type: "GET_USER_INFO", payload: data.user });
    } catch (error) {
      if (error.response.status === 401) {
        dispatch(clearUser());
      }
    } finally {
      dispatch(loading(false));
    }
  };
};

export const setUserInfo = (userData) => {
  return async (dispatch) => {
    try {
      dispatch(loading(true));
      const { data, status } = await setUserInfoUrl(userData);
      if (status === 200) {
        successMessage(data.message);
      }
      await dispatch({ type: "SET_USER_INFO", payload: data.user });
      localStorage.setItem("user-info", JSON.stringify(data.user));
    } catch (error) {
      if (error.response.status === 422) {
        Object.entries(error.response.data.errors).map((error) => {
          errorMessage(error[1][0]);
        });
      } else if (error.response.status === 402) {
        errorMessage(error.response.data.message);
      } else if (error.response.status === 401) {
        dispatch(clearUser());
      } else {
        errorMessage("خطای ناشناخته ای رخ داده مجددا امتحان فرمایید.", "dark");
      }
    } finally {
      dispatch(loading(false));
    }
  };
};

export const changePass = (password, handleInActive) => {
  return async (dispatch) => {
    try {
      dispatch(loading(true));
      const { data, status } = await changePassUrl(password);
      if (status === 200) {
        successMessage(data.message);
        handleInActive();
      }
      await dispatch({ type: "SET_USER_INFO", payload: data.user });
    } catch (error) {
      if (error.response.status === 422) {
        Object.entries(error.response.data.errors).map((error) => {
          errorMessage(error[1][0]);
        });
      } else if (error.response.status === 402) {
        errorMessage(error.response.data.message);
      } else if (error.response.status === 401) {
        dispatch(clearUser());
      } else {
        errorMessage("خطای ناشناخته ای رخ داده مجددا امتحان فرمایید.", "dark");
      }
    } finally {
      dispatch(loading(false));
    }
  };
};

export const clearUser = (navigate = null) => {
  return async (dispatch) => {
    try {
      await userLogOutUrl();
      if (navigate) {
        navigate("/", { replace: true });
      }
    } catch (error) {
      if (navigate) {
        errorMessage("اعتبار توکن منقضی شده است مجددا وارد شوید", "colored");
      }
    } finally {
      await dispatch({ type: "CLEAR_USER", payload: {} });
      localStorage.removeItem("token");
      localStorage.removeItem("expired_at");
      localStorage.removeItem("user-info");
    }
  };
};
