import { errorMessage, successMessage } from "../../../utils/helpers/helpers";
import {
  addSliderUrl,
  allSliderUrl,
  deleteSliderUrl,
} from "../services/sliderService";
import { loading } from "./Loading";
import { clearUser } from "./user";

export const allSlider = () => {
  return async (dispatch) => {
    try {
      dispatch(loading(true));
      const { data } = await allSliderUrl();
      await dispatch({ type: "INIT_SLIDERS", payload: data.sliders });
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

export const addSlider = (formData, closeModal) => {
  return async (dispatch, getState) => {
    try {
      dispatch(loading(true));
      const { data, status } = await addSliderUrl(formData);
      if (status === 201) {
        successMessage(data.message);
        closeModal("create-and-edit");
      }
      await dispatch({
        type: "ADD_SLIDER",
        payload: [...getState().sliders, data.slider],
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

export const deleteSlider = (sliderId, closeModal) => {
  return async (dispatch, getState) => {
    const sliders = [...getState().sliders];
    const filteredSliders = sliders.filter((slider) => slider.id !== sliderId);
    try {
      dispatch(loading(true));
      const { data, status } = await deleteSliderUrl(sliderId);
      if (status === 200) {
        successMessage(data.message);
        closeModal("delete");
      }
      await dispatch({
        type: "DELETE_SLIDER",
        payload: [...filteredSliders],
      });
    } catch (error) {
      if (error.response.status === 401) {
        dispatch(clearUser());
      } else {
        errorMessage("خطای ناشناخته ای رخ داده مجددا امتحان فرمایید.", "dark");
      }
      await dispatch({
        type: "DELETE_SLIDER",
        payload: [...sliders],
      });
    } finally {
      dispatch(loading(false));
    }
  };
};
