import { successMessage } from "../../../utils/helpers/helpers";
import { setPluginUrl, getPluginUrl } from "../services/pluginService";
import { loading } from "./Loading";
import { clearUser } from "./user";

export const getPlugin = (pageId, type) => {
  return async (dispatch) => {
    try {
      dispatch(loading(true));
      const { data } = await getPluginUrl(pageId, type);
      await dispatch({ type: "INIT_PLUGIN", payload: data.plugin.module });
      switch (data.plugin.module.module_type) {
        case "Score":
          await dispatch({ type: "PLUGIN_SCORE", payload: data.plugin.score });
          break;
        case "Comments":
          await dispatch({
            type: "PLUGIN_COMMENT",
            payload: data.plugin.comment,
          });
          break;
        case "Galleries":
          await dispatch({
            type: "PLUGIN_GALERIES",
            payload: data.plugin.galleries,
          });
          break;
        default:
          break;
      }
    } catch (error) {
      if (error.response.status === 401) {
        dispatch(clearUser());
      } else if (error.response.status === 404) {
        await dispatch({
          type: "INIT_PLUGIN",
          payload: { module_status: 0, module_type: type, page_id: pageId },
        });
      }
    } finally {
      dispatch(loading(false));
    }
  };
};

export const setPlugin = (pageId, type, pluginData) => {
  return async (dispatch) => {
    try {
      dispatch(loading(true));
      const { data, status } = await setPluginUrl(pageId, type, pluginData);
      if (status === 201) {
        successMessage(data.message);
      } else {
        successMessage(data.message);
      }
      if (pluginData.module_status) {
        dispatch(getPlugin(pageId, type));
      } else {
        await dispatch({
          type: "INIT_PLUGIN",
          payload: data.plugin,
        });
      }
    } catch (error) {
      await dispatch({
        type: "INIT_PLUGIN",
        payload: { module_status: 0, module_type: type, page_id: pageId },
      });
      if (error.response.status === 401) {
        dispatch(clearUser());
      }
    } finally {
      dispatch(loading(false));
    }
  };
};

export const clearPlugin = () => {
  return async (dispatch) => {
    await dispatch({ type: "CLEAR_PLUGIN", payload: {} });
    await dispatch({ type: "CLEAR_PLUGINITEM", payload: {} });
  };
};
