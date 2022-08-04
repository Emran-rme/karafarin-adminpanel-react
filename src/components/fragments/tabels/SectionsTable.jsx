import { isEmpty, orderBy } from "lodash";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import {
  translateEnglishNumberToPersian,
  translateSectinType,
} from "../../../utils/helpers/helpers";

const SectionsTable = ({ data, openDeleteDialog }) => {
  return (
    <table className="table table-hover text-center table-striped">
      <thead style={{ fontWeight: "600" }}>
        <tr>
          <th scope="col">#</th>
          <th scope="col">عنوان بخش</th>
          <th scope="col">تاریخ ایجاد</th>
          <th scope="col">عملیات</th>
        </tr>
      </thead>
      <tbody className="border-0">
        {useMemo(
          () =>
            !isEmpty(data) ? (
              orderBy(data, "id", "desc").map((section, index) => (
                <tr key={section.id}>
                  <td className="align-middle">
                    {translateEnglishNumberToPersian(index + 1)}
                  </td>
                  <td className="align-middle">
                    {translateSectinType(section.type)}
                  </td>
                  <td className="align-middle">
                    {translateEnglishNumberToPersian(
                      new Date(section.created_at).toLocaleDateString("fa-IR")
                    )}
                  </td>
                  <td className="align-middle table-icon px-0">
                    <span>
                      <Link
                        to={{
                          search: `type=${section.type}&section-id=${section.id}`,
                        }}
                      >
                        <span className="mdi mdi-table-of-contents mx-1 text-primary" />
                      </Link>
                      <span
                        className="mdi mdi-trash-can-outline  mx-1 text-danger"
                        onClick={() => openDeleteDialog("delete", section.id)}
                      />
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">رکوردی برای نمایش وجود ندارد</td>
              </tr>
            ),
          [data]
        )}
      </tbody>
    </table>
  );
};

export default SectionsTable;
