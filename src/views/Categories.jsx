import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { adminCategoryContext } from "../services/context/adminCategoryContext";

import config from "../services/redux/services/config.json";
import {
  addCategory,
  allCategories,
  deleteCategory,
  editCategory,
} from "../services/redux/actions/categories";
import { isEmpty } from "lodash";

import {
  CreateAndEditModal,
  PageInfo,
  DeleteModal,
  CategoriesTable,
  PageHeader,
} from "../components";
import { reactValidator } from "../utils/helpers/helpers";
import { useMemo } from "react";

const Categories = () => {
  // state
  const [modalStatus, setModalStatus] = useState({
    delete: false,
    createAndEdit: false,
  });
  const [currentComponent, setCurrentComponent] = useState({
    width: "70%",
    title: "دسته بندی",
    info: "در صورت حذف دسته بندی، زیر دسته های مربوطه به دسته ما قبلی انتقال خواهند یافت",
    componentName: "CATEGORY_FORM",
  });
  const [categoryData, setCategoryData] = useState({
    method: "POST",
    catName: "",
    parentCat: null,
    image: "",
    showInMenu: false,
    dropDownMenu: false,
  });
  const [, forceUpdate] = useState();
  const [searchParams, setSearchParams] = useSearchParams();

  // validate form
  const validator = useRef(reactValidator());

  // show or hide modal box
  /*
   * parameters:
   * 1- props[0]: create-and-edit or delete mode
   * 2-props[1]: delet item id,
   * 3-props[2]: CREATE or edit mode
   */
  const openModal = (...props) => {
    if (props[0] === "create-and-edit") {
      setModalStatus({ ...modalStatus, createAndEdit: true });
      if (props[2] === "CREATE") {
        setCategoryData({ ...categoryData, isMode: props[2] });
      } else {
        setCategoryData({
          catId: props[3].id,
          catName: props[3].category_name,
          parentCat: categoriesOptions.find(
            (cat) => cat.value == props[3].category_id
          ).value,
          image: [
            props[3].category_image_url &&
              config.baseApi + props[3].category_image_url,
          ],
          showInMenu: parseInt(props[3].show_In_Menu),
          dropDownMenu: parseInt(props[3].drop_Down_Menu),
          isMode: props[2],
        });
      }
    } else {
      setModalStatus({ ...modalStatus, delete: true });
      setCurrentComponent({ ...currentComponent, itemId: props[1] });
    }
  };
  const closeModal = (name) => {
    if (name === "create-and-edit") {
      setModalStatus({ ...modalStatus, createAndEdit: false });
    } else {
      setModalStatus({ ...modalStatus, delete: false });
    }
  };
  const handleOnChange = (event) => {
    switch (event.target.id) {
      case "image":
        setCategoryData({
          ...categoryData,
          [event.target.name]: [
            URL.createObjectURL(event.target.files[0]),
            event.target.files[0],
          ],
        });
        break;
      case "showInMenu":
      case "dropDownMenu":
        setCategoryData({
          ...categoryData,
          [event.target.name]: event.currentTarget.checked,
        });
        break;
      default:
        setCategoryData({
          ...categoryData,
          [event.target.name]: event.target.value,
        });
        break;
    }
  };

  //initialize category list
  const categoriesList = useSelector((state) => state.categories);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isEmpty(categoriesList)) {
      dispatch(allCategories());
    }
  }, []);

  //fill in the select Option
  const categoriesOptions = useMemo(
    () =>
      categoriesList.map((category) => ({
        value: `${category.id}`,
        label: `${category.category_name}`,
      })),
    [categoriesList]
  );

  //search
  const filteredCategories = categoriesList.filter((category) => {
    let filter = searchParams.get("filter");
    if (!filter) return true;
    return category.category_name.startsWith(filter);
  });

  //header Options
  const headerOption = {
    open: () => openModal("create-and-edit", null, "CREATE", null),
    title: "دسته بندی ",
    search: (
      <label className="search-label">
        <input
          type="text"
          className="search-input"
          placeholder="جستجو..."
          value={searchParams.get("filter") || ""}
          onChange={(event) => {
            let filter = event.target.value;
            if (filter) {
              setSearchParams({ filter });
            } else {
              setSearchParams({});
            }
          }}
        />
      </label>
    ),
  };

  // handle submit and Delete
  const handleSubmit = (event, isMode) => {
    event.preventDefault();
    if (isMode === "CREATE") {
      if (validator.current.allValid()) {
        let formData = new FormData();
        formData.append("category_name", categoryData.catName);
        formData.append("category_id", categoryData.parentCat);
        formData.append("show_In_Menu", categoryData.showInMenu ? 1 : 0);
        formData.append("drop_Down_Menu", categoryData.dropDownMenu ? 1 : 0);
        formData.append("category_image_url", categoryData.image[1]);
        dispatch(addCategory(formData, closeModal));
      } else {
        validator.current.showMessages();
        forceUpdate(1);
      }
    } else {
      if (validator.current.allValid()) {
        let formData = new FormData();
        formData.append("_method", "put");
        formData.append("category_name", categoryData.catName);
        formData.append("category_id", categoryData.parentCat);
        formData.append("show_In_Menu", categoryData.showInMenu ? 1 : 0);
        formData.append("drop_Down_Menu", categoryData.dropDownMenu ? 1 : 0);
        if (categoryData.image[1])
          formData.append("category_image_url", categoryData.image[1]);
        else formData.append("category_image_url", categoryData.image[0]);
        dispatch(editCategory(categoryData.catId, formData, closeModal));
      } else {
        validator.current.showMessages();
        forceUpdate(1);
      }
    }
  };

  const handleDelete = (categoryId) =>
    dispatch(deleteCategory(categoryId, closeModal));

  return (
    <div className="categories-page">
      <PageInfo title="مدیریت دسته بندی" />
      <adminCategoryContext.Provider
        value={{
          openModal,
          categoryData,
          setCategoryData,
          handleOnChange,
          categoriesOptions,
          validator,
          handleSubmit,
          filteredCategories,
        }}
      >
        <PageHeader {...headerOption}>
          <CategoriesTable />
        </PageHeader>

        <CreateAndEditModal
          show={modalStatus.createAndEdit}
          close={closeModal}
          componentInfo={currentComponent}
        />
        <DeleteModal
          show={modalStatus.delete}
          close={closeModal}
          componentInfo={currentComponent}
          handleDelete={handleDelete}
        />
      </adminCategoryContext.Provider>
    </div>
  );
};

export default Categories;
