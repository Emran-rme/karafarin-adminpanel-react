import { Comment, Gallery, Score } from "../../../components";

const PluginPage = ({ plugin }) => {
  let pluginComponent = null;
  switch (plugin.module_type) {
    case "Galleries":
      pluginComponent = <Gallery />;
      break;
    case "Score":
      pluginComponent = <Score />;
      break;
    case "Comments":
      pluginComponent = <Comment />;
      break;
    default:
      break;
  }

  return <div className="plugin-page">{pluginComponent}</div>;
};

export default PluginPage;
