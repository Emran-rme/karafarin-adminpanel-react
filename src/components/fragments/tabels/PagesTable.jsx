import { isEmpty, orderBy } from "lodash";
import { Link } from "react-router-dom";
import { translateEnglishNumberToPersian } from "../../../utils/helpers/helpers";
import config from "../../../services/redux/services/config.json";

const PagesTable = ({ pages, open, category, location, searchParams }) => {
  return (
    <table className="table table-hover text-center ">
      <thead style={{ fontWeight: "600" }}>
        <tr>
          <th scope="col">#</th>
          <th colSpan="2">عنوان</th>
          <th scope="col">دسته بندی</th>
          <th scope="col">تاریخ ایجاد</th>
          <th scope="col">وضعیت</th>
          <th scope="col">عملیات</th>
        </tr>
      </thead>
      <tbody>
        {!isEmpty(pages) ? (
          orderBy(pages, "id", "desc").map((page, index) => (
            <tr key={page.id} className="border-bottom align-middle">
              <th scope="row" className="align-middle border-start">
                {translateEnglishNumberToPersian(index + 1)}
              </th>
              <td className="table-img">
                <img
                  src={config.baseApi + page.thumbnail_image_url}
                  alt={page.page_title}
                />
              </td>
              <td className="align-middle table-title">{page.page_title}</td>
              <td className="align-middle table-post-cat">
                <span className="btn btn-outline-success btn-sm disabled">
                  {console.log(category)}
                  {!isEmpty(category) &&
                    category.find(
                      (cat) =>
                        parseInt(cat.value) === parseInt(page.category_id)
                    ).label}
                </span>
              </td>
              <td className="align-middle">
                {translateEnglishNumberToPersian(
                  new Date(page.created_at).toLocaleDateString("fa-IR")
                )}
              </td>
              <td className="align-middle">
                {parseInt(page.draft_status) === 1 ? (
                  <span className="alert alert-success small py-1">
                    منتشر شده
                  </span>
                ) : (
                  <span className="alert alert-primary small py-1">
                    پیشنویس
                  </span>
                )}
              </td>
              <td className="align-middle table-icon px-0">
                <span>
                  <span
                    role="buttun"
                    className="mdi mdi-playlist-edit mx-1 text-primary"
                    onClick={() => open("create-and-edit", null, "EDIT", page)}
                  />
                  <span
                    role="buttun"
                    className="mdi mdi-trash-can-outline mx-1 text-danger"
                    onClick={() => open("delete", page.id)}
                  />
                  <span className="mdi mdi-dots-horizontal position-relative  mx-1 text-dark table-menu">
                    <span className="post-item-menu">
                      <span className="-intro-y">
                        <ul>
                          <li>
                            <Link
                              to={{
                                search: searchParams.get("filter")
                                  ? `${location.search.substring(1)}&page-id=${
                                      page.id
                                    }&type=Galleries`
                                  : `?page-id=${page.id}&type=Galleries`,
                              }}
                            >
                              مدیریت پلاگین گالری
                            </Link>
                          </li>
                          <li>
                            <Link
                              to={{
                                search: searchParams.get("filter")
                                  ? `${location.search.substring(1)}&page-id=${
                                      page.id
                                    }&type=Comments`
                                  : `?page-id=${page.id}&type=Comments`,
                              }}
                            >
                              مدیریت پلاگین نظردهی
                            </Link>
                          </li>
                          <li>
                            <Link
                              to={{
                                search: searchParams.get("filter")
                                  ? `${location.search.substring(1)}&page-id=${
                                      page.id
                                    }&type=Score`
                                  : `?page-id=${page.id}&type=Score`,
                              }}
                            >
                              مدیریت پلاگین امتیاز
                            </Link>
                          </li>
                        </ul>
                      </span>
                    </span>
                  </span>
                </span>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="7">رکوردی برای نمایش وجود ندارد</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default PagesTable;
