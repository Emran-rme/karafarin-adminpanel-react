import { isEmpty, orderBy } from "lodash";
import { useContext } from "react";
import { adminCategoryContext } from "../../../services/context/adminCategoryContext";
import { translateEnglishNumberToPersian } from "../../../utils/helpers/helpers";

const CategoriesTable = () => {
  const { filteredCategories, openModal } = useContext(adminCategoryContext);
  return (
    <table className="table table-hover text-center table-striped">
      <thead style={{ fontWeight: "600" }}>
        <tr>
          <th scope="col">#</th>
          <th scope="col">نام دسته بندی</th>
          <th scope="col">تاریخ ایجاد</th>
          <th scope="col">عملیات</th>
        </tr>
      </thead>
      <tbody className="border-0">
        {!isEmpty(filteredCategories) ? (
          orderBy(filteredCategories, "id", "desc").map((category, index) => (
            <tr key={category.id}>
              <td className="align-middle">
                {translateEnglishNumberToPersian(index + 1)}
              </td>
              <td className="align-middle">{category.category_name}</td>

              <td className="align-middle">
                {translateEnglishNumberToPersian(
                  new Date(category.created_at).toLocaleDateString("fa-IR")
                )}
              </td>
              <td className="align-middle table-icon px-0">
                {category.id === 1 ? (
                  <small className="desible">غیر قابل حذف و ویرایش</small>
                ) : (
                  <span>
                    <span
                      className="mdi mdi-playlist-edit mx-1 text-primary"
                      onClick={() =>
                        openModal("create-and-edit", null, "EDIT", category)
                      }
                    />

                    <span
                      className="mdi mdi-trash-can-outline  mx-1 text-danger"
                      onClick={() => openModal("delete", category.id)}
                    />
                  </span>
                )}
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="6">رکوردی برای نمایش وجود ندارد</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default CategoriesTable;
