import { errorMessage, successMessage } from "../../../utils/helpers/helpers";
import { initFooterUrl, setFooterUrl } from "../services/footer";
import { loading } from "./Loading";
import { clearUser } from "./user";

export const initFooterData = () => {
  return async (dispatch) => {
    try {
      dispatch(loading(true));
      const { data } = await initFooterUrl();
      await dispatch({ type: "INIT_FOOTER_DATA", payload: data.footer });
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

export const setFooterData = (data) => {
  return async (dispatch) => {
    try {
      dispatch(loading(true));
      const { data: footerData, status } = await setFooterUrl(data);
      if (status === 200) successMessage(footerData.message);
      await dispatch({ type: "SET_FOOTER_DATA", payload: footerData.footer });
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
    }
  };
};
