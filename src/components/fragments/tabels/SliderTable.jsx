import { isEmpty, orderBy } from "lodash";
import { useContext } from "react";
import { adminSliderContext } from "../../../services/context/adminSliderContext";
import { translateEnglishNumberToPersian } from "../../../utils/helpers/helpers";
import config from "../../../services/redux/services/config.json";

const SliderTable = () => {
  const { sliderslist, openModal } = useContext(adminSliderContext);

  return (
    <table className="table table-hover text-center table-striped">
      <thead style={{ fontWeight: "600" }}>
        <tr>
          <th scope="col">#</th>
          <th scope="col">تصویر</th>
          <th scope="col">پیوند به</th>
          <th scope="col">تاریخ بارگذاری</th>
          <th scope="col">عملیات</th>
        </tr>
      </thead>
      <tbody className="border-0">
        {!isEmpty(sliderslist) ? (
          orderBy(sliderslist, "id", "desc").map((slider, index) => (
            <tr key={slider.id}>
              <td className="align-middle">
                {translateEnglishNumberToPersian(index + 1)}
              </td>
              <td className="align-middle">
                <img
                  src={config.baseApi + slider.thumbnail_image_url}
                  alt={`slider-${slider.id}`}
                  className="slider-table-img"
                />
              </td>
              <td className="align-middle">
                {slider.link ? (
                  <a
                    href={slider.link}
                    target="_blank"
                    className="border rounded-3 px-2 py-1 border-info"
                  >
                    {slider.link_name || slider.link}
                  </a>
                ) : (
                  " پیوندی برای تصویر وجود ندارد"
                )}
              </td>
              <td className="align-middle">
                {translateEnglishNumberToPersian(
                  new Date(slider.created_at).toLocaleDateString("fa-IR")
                )}
              </td>
              <td className="align-middle table-icon">
                <span>
                  <span
                    className="mdi mdi-trash-can-outline text-danger"
                    onClick={() => openModal("delete", slider.id)}
                  />
                </span>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="5">رکوردی برای نمایش وجود ندارد</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default SliderTable;
