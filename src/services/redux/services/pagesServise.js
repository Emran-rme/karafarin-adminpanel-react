import config from "./config.json";
import http from "./httpService";

export const createNewPageUrl = (page) =>
  http.post(`${config.karafarinApi}/admin/admin/pages`, page);

export const editPageUrl = (pageId, page) =>
  http.post(`${config.karafarinApi}/admin/admin/pages/${pageId}`, page);

export const allPagesUrl = (url = null) => {
  if (!url) {
    return http.get(`${config.karafarinApi}/admin/admin/pages`);
  } else {
    return http.get(url);
  }
};

export const deletePageUrl = (pageId) =>
  http.delete(`${config.karafarinApi}/admin/admin/pages/${pageId}`);
