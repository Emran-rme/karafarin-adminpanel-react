import { errorMessage, successMessage } from "../../../utils/helpers/helpers";
import {
  changStatusBannerUrl,
  getBannerUrl,
  editBannerUrl,
} from "../services/bannerServise";
import { loading } from "./Loading";
import { clearUser } from "./user";

export const getBanner = () => {
  return async (dispatch) => {
    try {
      dispatch(loading(true));
      const { data } = await getBannerUrl();
      await dispatch({ type: "INIT_BANNER", payload: data.banner });
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

export const changStatusBanner = (statusData, rerender) => {
  return async (dispatch) => {
    try {
      dispatch(loading(true));
      const { data } = await changStatusBannerUrl(statusData);
      await dispatch({ type: "CHANGE_STATUS_BANNER", payload: data.banner });
      rerender();
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

export const editBanner = (bannerData) => {
  return async (dispatch) => {
    try {
      dispatch(loading(true));
      const { data, status } = await editBannerUrl(bannerData);
      if (status === 200) {
        successMessage(data.message);
      }
      await dispatch({ type: "EDIT_BANNER", payload: data.banner });
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
