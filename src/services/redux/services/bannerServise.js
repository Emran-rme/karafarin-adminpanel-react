import http from "./httpService";
import config from "./config.json";

export const getBannerUrl = () =>
  http.get(`${config.karafarinApi}/admin/admin/banner`);

export const changStatusBannerUrl = (status) =>
  http.post(`${config.karafarinApi}/admin/admin/banner/change-status`, status);

export const editBannerUrl = (status) =>
  http.post(`${config.karafarinApi}/admin/admin/banner`, status);
