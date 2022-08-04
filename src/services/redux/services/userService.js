import config from "./config.json";
import http from "./httpService";

export const userRegisterUrl = (userData) =>
  http.post(`${config.karafarinApi}/admin/auth/register`, userData);

export const userLoginUrl = (userData) =>
  http.post(`${config.karafarinApi}/admin/auth/login`, userData);

export const userLogOutUrl = () =>
  http.post(`${config.karafarinApi}/admin/auth/logout`);

export const userInfoUrl = () =>
  http.get(`${config.karafarinApi}/admin/auth/user-info`);

export const setUserInfoUrl = (user) =>
  http.post(`${config.karafarinApi}/admin/auth/user-info`, user);

export const changePassUrl = (password) =>
  http.post(`${config.karafarinApi}/admin/auth/change-password`, password);
