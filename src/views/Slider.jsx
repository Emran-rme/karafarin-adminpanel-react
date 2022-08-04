import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "lodash";

import { adminSliderContext } from "../services/context/adminSliderContext";
import {
  addSlider,
  allSlider,
  deleteSlider,
} from "../services/redux/actions/slider";
import {
  SliderTable,
  DeleteModal,
  PageInfo,
  CreateAndEditModal,
  PageHeader,
} from "../components";
import { reactValidator } from "../utils/helpers/helpers";

const Slider = () => {
  const [modalStatus, setModalStatus] = useState({
    delete: false,
    createAndEdit: false,
  });
  const [currentComponent, setCurrentComponent] = useState({
    width: "50%",
    title: "اسلایدر",
    isMode: "create",
    componentName: "SLIDER_FORM",
  });
  const [sliderData, setSliderData] = useState({
    image: "",
    href: "",
    name: "",
  });
  const [, forceUpdate] = useState();

  // validator
  const validator = useRef(reactValidator());

  // show or hide modal box
  const openModal = (name, itemId = null) => {
    if (name === "create-and-edit") {
      setModalStatus({ ...modalStatus, createAndEdit: true });
    } else {
      setModalStatus({ ...modalStatus, delete: true });
      setCurrentComponent({ ...currentComponent, itemId });
    }
  };
  const closeModal = (name) => {
    if (name === "create-and-edit") {
      setModalStatus({ ...modalStatus, createAndEdit: false });
    } else {
      setModalStatus({ ...modalStatus, delete: false });
    }
  };

  const dispatch = useDispatch();
  const sliderslist = useSelector((state) => state.sliders);

  useEffect(() => {
    if (isEmpty(sliderslist)) {
      dispatch(allSlider());
    }
  }, []);

  const handleOnChange = (event) => {
    if (event.target.id === "image") {
      setSliderData({
        ...sliderData,
        [event.target.name]: [
          URL.createObjectURL(event.target.files[0]),
          event.target.files[0],
        ],
      });
    } else {
      setSliderData({ ...sliderData, [event.target.name]: event.target.value });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validator.current.allValid()) {
      let formData = new FormData();
      formData.append("imageUrl", sliderData.image[1]);
      formData.append("link", sliderData.href);
      formData.append("linkName", sliderData.name);
      dispatch(addSlider(formData, closeModal));
    } else {
      validator.current.showMessages();
      forceUpdate(1);
    }
  };

  const handleDelete = async (sliderId) => {
    dispatch(deleteSlider(sliderId, closeModal));
  };

  const headerOption = {
    open: () => openModal("create-and-edit"),
    title: "اسلایدر  ",
  };
  return (
    <div className="slider-page">
      <PageInfo title="مدیریت اسلایدر" />
      <adminSliderContext.Provider
        value={{
          sliderData,
          setSliderData,
          handleOnChange,
          validator,
          handleSubmit,
          sliderslist,
          openModal,
        }}
      >
        <PageHeader {...headerOption}>
          <SliderTable />
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
      </adminSliderContext.Provider>
    </div>
  );
};

export default Slider;
