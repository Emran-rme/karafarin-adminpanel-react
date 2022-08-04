import { errorMessage, successMessage } from "../../../utils/helpers/helpers";
import {
  allPagesUrl,
  createNewPageUrl,
  deletePageUrl,
  editPageUrl,
} from "../services/pagesServise";
import { loading } from "./Loading";
import { clearUser } from "./user";

export const getAllPages = (pageNum = null) => {
  return async (dispatch) => {
    try {
      dispatch(loading(true));
      const { data } = await allPagesUrl(pageNum);
      await dispatch({ type: "INIT_PAGES", payload: data.pages });
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

export const createNewPage = (formData, close) => {
  return async (dispatch) => {
    try {
      dispatch(loading(true));
      const { data, status } = await createNewPageUrl(formData);
      if (status === 201) {
        successMessage(data.message);
        close("create-and-edit");
      }
      await dispatch({
        type: "ADD_PAGES",
        payload: data.page,
      });
    } catch (error) {
      if (error.response.status === 401) {
        dispatch(clearUser());
      } else if (error.response.status === 422) {
        Object.entries(error.response.data.errors).map((error) => {
          errorMessage(error[1][0]);
        });
      } else {
        errorMessage("خطای ناشناخته ای رخ داده مجددا امتحان فرمایید.", "dark");
      }
    } finally {
      dispatch(loading(false));
      dispatch(getAllPages());
    }
  };
};

export const editPage = (pageId, formData, close) => {
  return async (dispatch, getState) => {
    const pages = [...getState().pages.data];
    const filteredPages = pages.filter((page) => page.id !== pageId);
    try {
      dispatch(loading(true));
      const { data, status } = await editPageUrl(pageId, formData);
      if (status === 200) {
        successMessage(data.message);
        close("create-and-edit");
      }
      await dispatch({
        type: "UPDATE_PAGES",
        payload: [...filteredPages, data.page],
      });
      dispatch(getAllPages());
    } catch (error) {
      await dispatch({
        type: "UPDATE_PAGES",
        payload: [...pages],
      });
      if (error.response.status === 401) {
        dispatch(clearUser());
      } else if (error.response.status === 422) {
        Object.entries(error.response.data.errors).map((error) => {
          errorMessage(error[1][0]);
        });
      } else {
        errorMessage("خطای ناشناخته ای رخ داده مجددا امتحان فرمایید.", "dark");
      }
    } finally {
      dispatch(loading(false));
    }
  };
};

export const deletePage = (pageId, close) => {
  return async (dispatch, getState) => {
    const pages = [...getState().pages.data];
    const filteredPages = pages.filter((page) => page.id !== pageId);
    try {
      dispatch(loading(true));
      const { data, status } = await deletePageUrl(pageId);
      if (status === 200) {
        successMessage(data.message);
        close("delete");
      }
      await dispatch({ type: "DELETE_PAGES", payload: [...filteredPages] });
      dispatch(getAllPages());
    } catch (error) {
      await dispatch({ type: "DELETE_PAGES", payload: [...pages] });
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
