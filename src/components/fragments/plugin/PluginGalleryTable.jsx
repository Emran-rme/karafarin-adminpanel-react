import { isEmpty } from "lodash";
import { useContext } from "react";
import { adminPageContext } from "../../../services/context/adminPageContext";
import { translateEnglishNumberToPersian } from "../../../utils/helpers/helpers";
import config from "../../../services/redux/services/config.json";

const PluginGalleryTable = ({ pluginItem, setGalleryImageShow }) => {
  const { handleDeletePluginItem } = useContext(adminPageContext);
  return (
    <table className="table table-hover text-center ">
      <thead style={{ fontWeight: "600" }}>
        <tr>
          <th scope="col">#</th>
          <th scope="col">تصویر</th>
          <th colSpan="2">عملیات</th>
        </tr>
      </thead>
      <tbody>
        {!isEmpty(pluginItem) ? (
          pluginItem.map((img, index) => (
            <tr key={img.id} className="border-bottom align-middle">
              <th scope="row" className="align-middle">
                {translateEnglishNumberToPersian(index + 1)}
              </th>
              <td className="table-img">
                <img
                  src={config.baseApi + img.thumbnail_image_url}
                  alt={img.id}
                />
              </td>
              <td className="align-middle table-icon px-0">
                <span>
                  <span
                    className="mdi mdi-trash-can-outline mx-1 text-danger"
                    onClick={() => handleDeletePluginItem("gallery", img.id)}
                  />
                  <span
                    className="mdi mdi-eye mx-1 text-warning"
                    onClick={() => setGalleryImageShow(img.thumbnail_image_url)}
                  />
                </span>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="3">رکوردی برای نمایش وجود ندارد</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default PluginGalleryTable;
