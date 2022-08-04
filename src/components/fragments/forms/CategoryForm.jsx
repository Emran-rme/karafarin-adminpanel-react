import { useContext, useEffect } from "react";
import { adminCategoryContext } from "../../../services/context/adminCategoryContext";

const CategoryForm = () => {
  const {
    categoryData,
    setCategoryData,
    handleOnChange,
    categoriesOptions,
    validator,
    handleSubmit,
  } = useContext(adminCategoryContext);

  //unmount componenet
  useEffect(() => {
    return () => {
      setCategoryData({
        catName: "",
        parentCat: null,
        image: "",
        showInMenu: false,
        dropDownMenu: false,
      });
      validator.current.hideMessages();
    };
  }, []);
  return (
    <>
      <div className="alert alert-warning">
        از طریق فرم زیر می توانید دسته بندی برای اخبار و خدمات خود ایجاد و در
        منو و زیرمنو نیز با فعال کردن گزینه استفاده نمایید
      </div>
      <form onSubmit={(event) => handleSubmit(event, categoryData.isMode)}>
        <div className="row p-4 mt-2">
          <div className=" col-xl-8 col-lg-8 col-md-8 col-sm-12 p-4">
            <div className="row">
              <div className=" col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-3">
                <label htmlFor="catName">نام دسته بندی:</label>
                <input
                  type="text"
                  className="form-control mt-2"
                  id="catName"
                  name="catName"
                  value={categoryData.catName || ""}
                  onChange={(e) => {
                    handleOnChange(e);
                    validator.current.showMessageFor("catName");
                  }}
                />
                {validator.current.message(
                  "catName",
                  categoryData.catName,
                  "required"
                )}
              </div>
              <div className=" col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-3">
                <label htmlFor="parentCat" className="my-1">
                  دسته والد:
                </label>
                <select
                  name="parentCat"
                  id="parentCat"
                  className="form-control"
                  onChange={(event) => handleOnChange(event)}
                  value={categoryData.parentCat || ""}
                >
                  {categoriesOptions.map((cat, index) => (
                    <option value={cat.value} key={index}>
                      {cat.label}
                    </option>
                  ))}
                </select>
                {validator.current.message(
                  "parentCat",
                  categoryData.parentCat,
                  "required"
                )}
              </div>
              <div className=" col-xl-12 col-lg-12 col-md-12 col-sm-12 mt-5">
                <div className="form-check form-switch">
                  <label htmlFor="showInMenu" className="form-check-label">
                    دسته در منو نمایش داده شود
                  </label>
                  <input
                    type="checkbox"
                    name="showInMenu"
                    id="showInMenu"
                    className="form-check-input mx-5"
                    checked={categoryData.showInMenu}
                    value={categoryData.showInMenu}
                    onChange={(e) => handleOnChange(e)}
                  />
                </div>
              </div>
              <div className=" col-xl-12 col-lg-12 col-md-12 col-sm-12 mt-5">
                <div
                  className={
                    categoryData.showInMenu
                      ? "form-check form-switch"
                      : "d-none"
                  }
                >
                  <label htmlFor="dropDownMenu" className="form-check-label">
                    منو ابشاری برای این دسته بندی فعال /غیر فعال باشد
                  </label>
                  <input
                    type="checkbox"
                    name="dropDownMenu"
                    id="dropDownMenu"
                    className="form-check-input mx-5"
                    checked={categoryData.dropDownMenu}
                    value={categoryData.dropDownMenu}
                    onChange={(e) => handleOnChange(e)}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className=" col-xl-4 col-lg-4 col-md-4 col-sm-12 py-4">
            <div className="slider-form p-0">
              <span>آیکون:</span>
              <input
                type="file"
                className="d-none"
                id="image"
                name="image"
                onChange={(e) => {
                  handleOnChange(e);
                  validator.current.showMessageFor("image");
                }}
              />
              <label htmlFor="image">
                {categoryData.image[0] ? (
                  <img
                    alt={categoryData.image[0]}
                    src={categoryData.image[0]}
                  />
                ) : (
                  <span>انتخاب کنید...</span>
                )}
              </label>
            </div>
          </div>

          <div className=" col-xl-3 col-lg-3 col-md-3 col-sm-12 p-4 me-auto">
            <button className="btn btn-success btn-sm  w-100 ">
              <span className="mdi mdi mdi-checkbox-marked-outline ms-1" />
              <span> افزودن دسته بندی</span>
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default CategoryForm;
