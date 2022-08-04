import { errorMessage, successMessage } from "../../../utils/helpers/helpers";
import {
  initSectionUrl,
  newSectionUrl,
  deleteSectionUrl,
  contentForSectionsUrl,
} from "../services/sectionService";
import { loading } from "./Loading";
import { clearUser } from "./user";

export const getAllSections = () => {
  return async (dispatch) => {
    try {
      dispatch(loading(true));
      const { data } = await initSectionUrl();
      await dispatch({ type: "INIT_SECTIONS", payload: data.sections });
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

export const newSection = (formData, close) => {
  return async (dispatch, getState) => {
    try {
      dispatch(loading(true));
      const { data, status } = await newSectionUrl(formData);
      if (status === 201) {
        successMessage(data.message);
        close("create-and-edit");
      }
      await dispatch({
        type: "NEW_SECTION",
        payload: [...getState().sections, data.section],
      });
    } catch (error) {
      if (error.response.status === 401) {
        dispatch(clearUser());
      } else if (error.response.status === 422) {
        Object.values(error.response.data.errors).map((error) => {
          errorMessage(error[0]);
        });
      } else {
        errorMessage("خطای ناشناخته ای رخ داده مجددا امتحان فرمایید.", "dark");
      }
    } finally {
      dispatch(loading(false));
    }
  };
};

export const deleteSection = (sectionId, close) => {
  return async (dispatch, getState) => {
    const sections = [...getState().sections];
    const filteredSections = sections.filter(
      (section) => section.id !== sectionId
    );
    try {
      dispatch(loading(true));
      const { status, data } = await deleteSectionUrl(sectionId);
      if (status === 200) {
        successMessage(data.message);
        close("delete");
      }
      await dispatch({
        type: "DELETE_SECTION",
        payload: [...filteredSections],
      });
    } catch (error) {
      if (error.response.status === 401) {
        dispatch(clearUser());
      } else {
        errorMessage("خطای ناشناخته ای رخ داده مجددا امتحان فرمایید.", "dark");
      }
      await dispatch({ type: "DELETE_SECTION", payload: [...sections] });
    } finally {
      dispatch(loading(false));
    }
  };
};

export const contentsForSections = (sectionId, sectionType, content, close) => {
  return async (dispatch, getState) => {
    try {
      dispatch(loading(true));
      const { data, status } = await contentForSectionsUrl(
        sectionId,
        sectionType,
        content
      );
      if (status === 200) {
        close("create-and-edit");
        successMessage(data.message);
        dispatch(getAllSections());
      }
    } catch (error) {
      if (error.response.status === 401) {
        dispatch(clearUser());
      } else if (error.response.status === 422) {
        Object.values(error.response.data.errors).map((error) => {
          errorMessage(error[0]);
        });
      } else {
        errorMessage("خطای ناشناخته ای رخ داده مجددا امتحان فرمایید.", "dark");
      }
    } finally {
      dispatch(loading(false));
    }
  };
};
