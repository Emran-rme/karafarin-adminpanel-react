import config from "./config.json";
import http from "./httpService";

export const allSliderUrl = () =>
  http.get(`${config.karafarinApi}/admin/admin/sliders`);

export const addSliderUrl = (data) =>
  http.post(`${config.karafarinApi}/admin/admin/sliders`, data);

export const deleteSliderUrl = (sliderID) =>
  http.delete(`${config.karafarinApi}/admin/admin/sliders/${sliderID}`);
