import config from "./config.json";
import http from "./httpService";

export const initAllDataUrl = () => http.get(`${config.karafarinApi}/admin/admin`);