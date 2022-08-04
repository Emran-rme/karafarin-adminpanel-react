import config from "./config.json";
import http from "./httpService";

export const initSectionUrl = () =>
  http.get(`${config.karafarinApi}/admin/admin/sections`);

export const newSectionUrl = (data) =>
  http.post(`${config.karafarinApi}/admin/admin/sections`, data);

export const deleteSectionUrl = (sectionId) =>
  http.delete(`${config.karafarinApi}/admin/admin/sections/${sectionId}`);

export const contentForSectionsUrl = (sectionId, sectionType, content) =>
  http.post(
    `${config.karafarinApi}/admin/admin/contents/${sectionId}/${sectionType}`,
    content
  );
