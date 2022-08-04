import { useContext, useEffect } from "react";
import { adminPageContext } from "../../../services/context/adminPageContext";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import { textEditorOptions } from "../../../utils/helpers/helpers";
const PageForm = () => {
  const {
    categoryOptions,
    pageData,
    postBody,
    setPageData,
    setPostBody,
    handleOnChange,
    validator,
    handleAddTagToList,
    handleRemoveTagInList,
    keywordList,
    handleSubmit,
  } = useContext(adminPageContext);

  //unmount componenet
  useEffect(() => {
    return () => {
      setPageData({
        method: "POST",
        title: "",
        draftStatus: false,
        category: "",
        keywords: "",
        keywordList: [],
        image: "",
      });
      setPostBody("");
      validator.current.hideMessages();
    };
  }, []);
  return (
    <form onSubmit={(event) => handleSubmit(event, pageData.method)}>
      <div className="row p-4 mt-2">
        <div className=" col-xl-8 col-lg-8 col-md-8 col-sm-12 p-4">
          <div className="row">
            <div className=" col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-3">
              <label htmlFor="title">عنوان پست:</label>
              <input
                type="text"
                className="form-control mt-2"
                id="title"
                name="title"
                value={pageData.title}
                onChange={(event) => {
                  handleOnChange(event);
                  validator.current.showMessageFor("title");
                }}
              />
              {validator.current.message("title", pageData.title, "required")}
            </div>
            <div className=" col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-3">
              <label htmlFor="category" className="my-1">
                دسته والد:
              </label>
              <select
                name="category"
                id="category"
                className="form-control"
                onChange={(event) => handleOnChange(event)}
                value={pageData.category || ""}
              >
                {categoryOptions.map((cat, index) => (
                  <option value={cat.value} key={index}>
                    {cat.label}
                  </option>
                ))}
              </select>
              {validator.current.message(
                "category",
                pageData.category,
                "required"
              )}
            </div>
            <div className=" col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-3">
              <label htmlFor="keywords" className="my-1">
                برچسب ها:
              </label>
              <input
                type="text"
                className="form-control mt-2 tag-input"
                id="keywords"
                name="keywords"
                value={pageData.keywords || ""}
                onChange={(event) => {
                  handleOnChange(event);
                  validator.current.showMessageFor("keywords");
                }}
              />
              <span
                className="tag-btn"
                onClick={() => handleAddTagToList(pageData.keywords)}
              />
              <input
                type="hidden"
                name="keywordList"
                value={pageData.keywordList}
              />
              {validator.current.message(
                "keywords",
                pageData.keywordList,
                "required"
              )}
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-3">
              <div className="tag-item">
                <ul>
                  {pageData.keywordList?.map((keyword, index) => (
                    <li
                      onClick={() => handleRemoveTagInList(index)}
                      key={index}
                    >
                      {keyword}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 my-3">
              <div className="form-check form-switch">
                <label htmlFor="draftStatus" className="form-check-label">
                  انتشار / پیشنویس
                </label>
                <input
                  type="checkbox"
                  name="draftStatus"
                  id="draftStatus"
                  className="form-check-input "
                  checked={pageData.draftStatus}
                  value={pageData.draftStatus}
                  onChange={(event) => handleOnChange(event)}
                />
              </div>
            </div>
          </div>
        </div>
        <div className=" col-xl-4 col-lg-4 col-md-4 col-sm-12 py-4">
          <div className="slider-form p-0">
            <span>کاور پست:</span>
            <input
              type="file"
              className="d-none"
              id="image"
              name="image"
              onChange={(event) => {
                handleOnChange(event);
                validator.current.showMessageFor("image");
              }}
            />
            <label htmlFor="image">
              {pageData.image[0] ? (
                <img alt={pageData.image[0]} src={pageData.image[0]} />
              ) : (
                <span>انتخاب کنید...</span>
              )}
            </label>
            {validator.current.message("image", pageData.image, "required")}
          </div>
        </div>
        <div className="row m-0">
          <div
            className="col-xl-12 col-lg-12 col-md-12 col-sm-12 position-relative"
            style={{ zIndex: "0" }}
          >
            <SunEditor
              defaultValue={postBody}
              name="postBody"
              onChange={setPostBody}
              setOptions={textEditorOptions}
            />
            {validator.current.message("postBody", postBody, "required")}
          </div>
        </div>

        <div className=" col-xl-3 col-lg-3 col-md-3 col-sm-12 p-4 me-auto">
          <button
            className={`btn ${
              pageData.method === "POST" ? "btn-success" : "btn-primary"
            } btn-sm  w-100 `}
          >
            <span className="mdi mdi mdi-checkbox-marked-outline ms-1" />
            <span>
              {" "}
              {pageData.method === "POST" ? "افزودن پست" : " ویرایش پست"}{" "}
            </span>
          </button>
        </div>
      </div>
    </form>
  );
};

export default PageForm;
