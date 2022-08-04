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
  encodeImageFileAsURL,
  reactValidator,
  sectionChoosor,
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
  const [sectionData, setSectionData] = useState({
    sectionType: "",
    servicesItem: [{ link: "", linkName: "", serviceIcon: "" }],
    customerItem: [{ name: "", customerIcon: "" }],
  });

  const [, forceUpdate] = useState();

  //init Sections
  const dispatch = useDispatch();
  const sectionList = useSelector((state) => state.sections);
  const categoriesList = useSelector((state) => state.categories);

  useEffect(() => {
    if (isEmpty(sectionList)) {
      dispatch(getAllSections());
    }
  }, []);

  //path and location
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  //validator
  const validator = useRef(reactValidator());

  useEffect(() => {
    setSectionData({
      ...sectionData,
      fields: sectionChoosor(searchParams.get("type")),
    });
    if (searchParams.get("type")) {
      openModal();
    }
    // return () => {
    //   setSectionData({
    //     sectionType: "",
    //     servicesItem: [{ link: "", linkName: "", serviceIcon: "" }],
    //     customerItem: [{ name: "", customerIcon: "" }],
    //   });
    // };
  }, [location.search]);

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
      // if (sectionList.length > 0) {
      //   sectionList.find((section) => {
      //     if (
      //       section.type === searchParams.get("type") &&
      //       section.id === parseInt(searchParams.get("section-id"))
      //     ) {
      //       setTitle(section.get_content?.title);
      //       setDescription(section.get_content?.description);
      //       setSelectedOptionCategory(
      //         categoriesOptions.find(
      //           (category) => category.value === section.get_content?.category
      //         )
      //       );
      //       let serviceItem = [];
      //       section.get_content?.get_content_files.map((files) =>
      //         serviceItem.push({
      //           link: files.link,
      //           linkName: files.link_name,
      //           image: config.baseApi + files.image_url,
      //         })
      //       );
      //       setFormValuesServices(serviceItem);
      //       let customeritem = [];
      //       section.get_content?.get_content_files.map((files) =>
      //         customeritem.push({
      //           name: files.name,
      //           image: config.baseApi + files.image_url,
      //         })
      //       );
      //       setFormValuesCustomers(customeritem);
      //     }
      //   });
      // }
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

  let handleOnChange = (index, event, sectionName = null) => {
    if (event.target.id === "image") {
      setSectionData({
        ...sectionData,
        [event.target.name]: event.target.files[0],
      });
    } else if (sectionName === "services") {
      const newSectionData = { ...sectionData };
      if (event.target.id === "serviceIcon") {
        encodeImageFileAsURL(event.target.files[0])
          .then(
            (res) =>
              (newSectionData.servicesItem[index][event.target.name] = res)
          )
          .catch((err) => console.log(err));
      } else {
        newSectionData.servicesItem[index][event.target.name] =
          event.target.value;
      }
      setSectionData({
        ...sectionData,
        servicesItem: newSectionData.servicesItem,
      });
    } else if (sectionName === "teams") {
      const newSectionData = { ...sectionData };
      if (event.target.id === "customerIcon") {
        encodeImageFileAsURL(event.target.files[0])
          .then(
            (res) =>
              (newSectionData.customerItem[index][event.target.name] = res)
          )
          .catch((err) => console.log(err));
      } else {
        newSectionData.customerItem[index][event.target.name] =
          event.target.value;
      }
      setSectionData({
        ...sectionData,
        customerItem: newSectionData.customerItem,
      });
    } else {
      setSectionData({
        ...sectionData,
        [event.target.name]: event.target.value,
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

  // Check the status of the validator
  // const checkedValidator = (validatorName) => {
  //   switch (searchParams.get("type")) {
  //     case "posts":
  //       return validator.current.message(
  //         validatorName,
  //         selectedOptionCategory,
  //         "required"
  //       );
  //     case "about":
  //       if (validatorName === "image") {
  //         return validator.current.message(validatorName, image, "required");
  //       } else if (validatorName === "description") {
  //         return validator.current.message(
  //           validatorName,
  //           description,
  //           "required"
  //         );
  //       }
  //     case "teams":
  //       if (validatorName === "title") {
  //         return validator.current.message(validatorName, title, "required");
  //       } else if (validatorName === "description") {
  //         return validator.current.message(
  //           validatorName,
  //           description,
  //           "required"
  //         );
  //       }
  //     case "services":
  //       if (validatorName === "title") {
  //         return validator.current.message(validatorName, title, "required");
  //       } else if (validatorName === "description") {
  //         return validator.current.message(
  //           validatorName,
  //           description,
  //           "required"
  //         );
  //       }
  //     default:
  //       return true;
  //   }
  // };

  const handleContentSubmit = (event) => {
    event.preventDefault();
    if (validator.current.allValid()) {
      // let formData = new FormData();
      // formData.append("section_id", searchParams.get("section-id"));
      // if (sectionData.title) formData.append("title", sectionData.title);
      // if (sectionData.description)
      //   formData.append("description", sectionData.description);
      // if (sectionData.categoryId)
      //   formData.append("category", sectionData.categoryId);
      // if (sectionData.image)
      //   formData.append("image", event.target.image.files[0]);
      // if (sectionData.formValuesServices.length > 0)
      //   formData.append("serviceItem", JSON.stringify(formValuesServices));
      // if (sectionData.formValuesCustomers.length > 0)
      //   formData.append("customerItem", JSON.stringify(formValuesCustomers));
      // dispatch(
      //   contentsForSections(
      //     searchParams.get("section-id"),
      //     searchParams.get("type"),
      //     formData,
      //     closeModal
      //   )
      // );
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
          // checkedValidator,
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
