import http from "./httpService";
import config from "./config.json";

export const allCategoriesUrl = () =>
  http.get(`${config.karafarinApi}/admin/admin/categories`);

export const newCategoryUrl = (category) =>
  http.post(`${config.karafarinApi}/admin/admin/categories`, category);

export const deleteCategoryUrl = (categoryId) =>
  http.delete(`${config.karafarinApi}/admin/admin/categories/${categoryId}`);

export const editCategoryUrl = (categoryId, category) =>
  http.post(
    `${config.karafarinApi}/admin/admin/categories/${categoryId}`,
    category
  );
