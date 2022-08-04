import { combineReducers } from "redux";
import { adminMainReducers } from "./adminMain";
import { loadingReducers } from "./loading";
import { sliderRedusers } from "./slider";
import { userReducer } from "./user";
import { categoriesReducers } from "./categories";
import { bannerReducer } from "./banner";
import { pagesReducers } from "./pages";
import { pluginReducer } from "./plugin";
import { pluginItemReduser } from "./pluginItem";
import { sectionsReducers } from "./section";
import { footerReducer } from "./footer";

export const reducers = combineReducers({
  adminMain: adminMainReducers,
  loading: loadingReducers,
  sliders: sliderRedusers,
  user: userReducer,
  categories: categoriesReducers,
  pages: pagesReducers,
  banner: bannerReducer,
  plugin: pluginReducer,
  pluginItem: pluginItemReduser,
  sections: sectionsReducers,
  footer: footerReducer
});
