import { errorMessage } from "../../../utils/helpers/helpers";
import { initAllDataUrl } from "../services/mainService";
import { loading } from "./Loading";
import { clearUser } from "./user";

export const initAllData = () => {
  return async (dispatch) => {
    try {
      dispatch(loading(true));
      const { data } = await initAllDataUrl();
      await dispatch({ type: "INIT_ALL_DATA", payload: data });
    } catch (error) {
      if (error.response.status === 401) dispatch(clearUser());
      else
        errorMessage("خطای ناشناخته ای رخ داده مجددا امتحان فرمایید.", "dark");
    } finally {
      dispatch(loading(false));
    }
  };
};
