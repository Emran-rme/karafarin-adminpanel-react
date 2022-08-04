import config from "./config.json";
import http from "./httpService";

export const setPluginUrl = (pageId, type, data) =>
  http.post(
    `${config.karafarinApi}/admin/admin/page/plugin?page-id=${pageId}&type=${type}`,
    data
  );

export const getPluginUrl = (pageId, type) =>
  http.get(
    `${config.karafarinApi}/admin/admin/page/plugin?page-id=${pageId}&type=${type}`
  );

export const replyCommentUrl = (commentId, data) =>
  http.post(
    `${config.karafarinApi}/admin/admin/comments/${commentId}/?reply=Admin`,
    data
  );

export const changeCommentStatusUrl = (commentId, data) =>
  http.post(
    `${config.karafarinApi}/admin/admin/comments/${commentId}/?status=isActive`,
    data
  );

export const deleteCommentUrl = (commentId) =>
  http.delete(`${config.karafarinApi}/admin/admin/comments/${commentId}`);

export const deleteGalleryUrl = (imgId) =>
  http.delete(
    `${config.karafarinApi}/admin/admin/page/module/galleries/${imgId}`
  );
