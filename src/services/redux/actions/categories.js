import {
  allCategoriesUrl,
  deleteCategoryUrl,
  editCategoryUrl,
  newCategoryUrl,
} from "../services/categoryService";
import { errorMessage, successMessage } from "../../../utils/helpers/helpers";
import { loading } from "./Loading";
import { clearUser } from "./user";

export const allCategories = () => {
  return async (dispatch) => {
    try {
      dispatch(loading(true));
      const { data } = await allCategoriesUrl();
      await dispatch({ type: "INIT_CATEGORIES", payload: data.categories });
    } catch (error) {
      if (error.response.status === 401) {
        dispatch(clearUser());
      } else {
        errorMessage("خطای ناشناخته ای رخ داده مجددا امتحان فرمایید.", "dark");
      }
    } finally {
      dispatch(loading(false));
    }
  };
};

export const addCategory = (formData, close) => {
  return async (dispatch, getState) => {
    try {
      dispatch(loading(true));
      const { status, data } = await newCategoryUrl(formData);
      if (status === 201) {
        successMessage(data.message);
        close("create-and-edit");
      }
      await dispatch({
        type: "ADD_CATEGORIES",
        payload: [...getState().categories, data.category],
      });
    } catch (error) {
      if (error.response.status === 422) {
        Object.entries(error.response.data.errors).map((error) => {
          errorMessage(error[1][0]);
        });
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

export const deleteCategory = (categoryId, close) => {
  return async (dispatch, getState) => {
    const categories = [...getState().categories];
    const filteredCategories = categories.filter(
      (category) => category.id !== categoryId
    );
    try {
      dispatch(loading(true));
      const { data, status } = await deleteCategoryUrl(categoryId);
      if (status === 200) {
        successMessage(data.message);
        close("delete");
      }
      await dispatch({
        type: "DELETE_CATEGORIES",
        payload: [...filteredCategories],
      });
    } catch (error) {
      if (error.response.status === 401) {
        dispatch(clearUser());
      } else {
        errorMessage("خطای ناشناخته ای رخ داده مجددا امتحان فرمایید.", "dark");
      }
      await dispatch({
        type: "DELETE_CATEGORIES",
        payload: [...categories],
      });
    } finally {
      dispatch(loading(false));
    }
  };
};

export const editCategory = (categoryId, formData, close) => {
  return async (dispatch, getState) => {
    const categories = [...getState().categories];
    const filteredCategories = categories.filter(
      (category) => category.id !== categoryId
    );
    try {
      dispatch(loading(true));
      const { data, status } = await editCategoryUrl(categoryId, formData);
      if (status === 200) {
        successMessage(data.message);
        close("create-and-edit");
      }
      await dispatch({
        type: "EDIT_CATEGORIES",
        payload: [...filteredCategories, data.category],
      });
    } catch (error) {
      await dispatch({
        type: "EDIT_CATEGORIES",
        payload: [...categories],
      });
      if (error.response.status === 401) {
        dispatch(clearUser());
      } else {
        errorMessage("خطای ناشناخته ای رخ داده مجددا امتحان فرمایید.", "dark");
      }
    } finally {
      dispatch(loading(false));
    }
  };
};
