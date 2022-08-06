import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

import { adminSectionsContext } from "../services/context/adminSectionsContext";
import {
  contentsForSections,
  deleteSection,
  getAllSections,
  newSection,
} from "../services/redux/actions/section";

import {
  PageInfo,
  CreateAndEditModal,
  DeleteModal,
  SectionModal,
  SectionsTable,
  PageHeader,
} from "../components";

import {
  reactValidator,
  sectionChoosor,
  handleDynamicOnChange,
} from "../utils/helpers/helpers";

import config from "../services/redux/services/config.json";
import { isEmpty } from "lodash";

const Sections = () => {
  const [modalStatus, setModalStatus] = useState({
    delete: false,
    createAndEdit: false,
    section: false,
  });
  const [currentComponent, setCurrentComponent] = useState({
    width: "40%",
    title: "بخش ها",
    componentName: "SECTION_FORM",
    sectionName: "",
  });
  const [sectionData, setSectionData] = useState({});

  const [, forceUpdate] = useState();

  //init Sections
  const dispatch = useDispatch();
  const sectionList = useSelector((state) => state.sections);
  const categoriesList = useSelector((state) => state.categories);

  //path and location
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  //validator
  const validator = useRef(reactValidator());

  useEffect(() => {
    if (isEmpty(sectionList)) {
      dispatch(getAllSections());
    }
    if (searchParams.get("type")) {
      openModal();
    }
  }, [location]);

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
    } else if (props[0] === "delete") {
      setModalStatus({ ...modalStatus, delete: true });
      setCurrentComponent({ ...currentComponent, itemId: props[1] });
    } else {
      setModalStatus({ ...modalStatus, section: true });
      setCurrentComponent({
        ...currentComponent,
        sectionName: searchParams.get("type") || "",
      });
      //update current section data
      if (sectionList.length > 0) {
        sectionList.find((section) => {
          if (
            section.type === searchParams.get("type") &&
            section.id === parseInt(searchParams.get("section-id"))
          ) {
            let servicesItem = [];
            let customerItem = [];
            section.get_content?.get_content_files.map((files) =>
              servicesItem.push({
                link: files.link,
                linkName: files.link_name,
                serviceIcon: config.baseApi + files.image_url,
              })
            );
            section.get_content?.get_content_files.map((files) =>
              customerItem.push({
                name: files.name,
                customerIcon: config.baseApi + files.image_url,
              })
            );
            setSectionData({
              fields: sectionChoosor(searchParams.get("type")),
              sectionType: section.type,
              title: section.get_content?.title || "",
              categoryId: section.get_content?.category || "",
              servicesItem: !isEmpty(servicesItem)
                ? servicesItem
                : [{ link: "", linkName: "", serviceIcon: "" }],
              customerItem: !isEmpty(customerItem)
                ? customerItem
                : [{ name: "", customerIcon: "" }],
              description: section.get_content?.description || "",
            });
          }
        });
      }
    }
  };
  const closeModal = (name) => {
    if (name === "create-and-edit") {
      setModalStatus({ ...modalStatus, createAndEdit: false });
    } else if (name === "delete") {
      setModalStatus({ ...modalStatus, delete: false });
    } else {
      setModalStatus({ ...modalStatus, section: false });
      setCurrentComponent({ ...currentComponent, sectionName: "" });
      navigate(location.pathname, { replace: true });
    }
  };

  //dynamic input
  let addFormFields = (sectionName) => {
    if (sectionName === "services") {
      setSectionData({
        ...sectionData,
        servicesItem: [
          ...sectionData.servicesItem,
          { link: "", linkName: "", image: "" },
        ],
      });
    } else {
      setSectionData({
        ...sectionData,
        customerItem: [...sectionData.customerItem, { name: "", image: "" }],
      });
    }
  };
  let removeFormFields = (i, sectionName) => {
    if (sectionName === "services") {
      let newServicesItem = [...sectionData.servicesItem];
      newServicesItem.splice(i, 1);
      setSectionData({
        ...sectionData,
        servicesItem: newServicesItem,
      });
    } else {
      let newCustomerItem = [...sectionData.customerItem];
      newCustomerItem.splice(i, 1);
      setSectionData({
        ...sectionData,
        customerItem: newCustomerItem,
      });
    }
  };
  let handleOnChange = (e, index, sectionName = null) => {
    if (e.target.id === "image") {
      setSectionData({
        ...sectionData,
        [e.target.name]: e.target.files[0],
      });
    } else if (sectionName === "services") {
      setSectionData({
        ...sectionData,
        servicesItem: handleDynamicOnChange(
          sectionData,
          e,
          index,
          "servicesItem",
          "serviceIcon"
        ),
      });
    } else if (sectionName === "teams") {
      setSectionData({
        ...sectionData,
        customerItem: handleDynamicOnChange(
          sectionData,
          e,
          index,
          "customerItem",
          "customerIcon"
        ),
      });
    } else {
      setSectionData({
        ...sectionData,
        [e.target.name]: e.target.value,
      });
    }
  };

  // create new sections
  const handleSubmit = (event) => {
    event.preventDefault();
    if (validator.current.allValid()) {
      const formData = {
        type: sectionData.sectionType,
      };
      dispatch(newSection(formData, closeModal));
    } else {
      validator.current.showMessages();
      forceUpdate(1);
    }
  };

  //deleted section
  const handleDelete = (sectionId) => {
    dispatch(deleteSection(sectionId, closeModal));
  };

  const handleContentSubmit = (event) => {
    event.preventDefault();
    if (validator.current.allValid()) {
      let formData = new FormData();
      formData.append("section_id", searchParams.get("section-id"));
      sectionData.title && formData.append("title", sectionData.title);
      sectionData.description &&
        formData.append("description", sectionData.description);
      sectionData.categoryId &&
        formData.append("category", sectionData.categoryId);
      sectionData.image && formData.append("image", sectionData.image);
      sectionData.servicesItem.length > 0 &&
        formData.append(
          "serviceItem",
          JSON.stringify(sectionData.servicesItem)
        );
      sectionData.customerItem.length > 0 &&
        formData.append(
          "customerItem",
          JSON.stringify(sectionData.customerItem)
        );
      dispatch(
        contentsForSections(
          searchParams.get("section-id"),
          searchParams.get("type"),
          formData,
          closeModal
        )
      );
    } else {
      validator.current.showMessages();
      forceUpdate(1);
    }
  };

  //header Options
  const headerOption = {
    open: () => openModal("create-and-edit"),
    title: "بخش ",
  };

  return (
    <div className="sections-page">
      <PageInfo title="مدیریت بخش ها" />
      <adminSectionsContext.Provider
        value={{
          sectionList,
          validator,
          categoriesList,
          sectionData,
          handleOnChange,
          handleSubmit,
          removeFormFields,
          searchParams,
        }}
      >
        <PageHeader {...headerOption}>
          <SectionsTable data={sectionList} openDeleteDialog={openModal} />
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

        <SectionModal
          show={modalStatus.section}
          close={closeModal}
          data={sectionData.fields}
          componentName={currentComponent.sectionName}
          add={addFormFields}
          submit={handleContentSubmit}
        />
      </adminSectionsContext.Provider>
    </div>
  );
};

export default Sections;
