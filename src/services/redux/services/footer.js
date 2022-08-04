import config from "./config.json";
import http from "./httpService"

export const initFooterUrl = () => http.get(`${config.karafarinApi}/admin/admin/footer-data`)
export const setFooterUrl = (data) => http.post(`${config.karafarinApi}/admin/admin/footer-data`, data)