import { useContext, useEffect } from "react";
import { adminSliderContext } from "../../../services/context/adminSliderContext";

const SliderForm = () => {
  const { sliderData, setSliderData, handleOnChange, validator, handleSubmit } =
    useContext(adminSliderContext);
  useEffect(() => {
    return () => {
      setSliderData({ image: "", href: "", name: "" });
      validator.current.hideMessages();
    };
  }, []);
  return (
    <>
      <div className="alert alert-warning">
        از طریق فرم زیر می توانید تصاویری برای اسلایدر صفحه اصلی بارگذاری کنید
      </div>
      <form onSubmit={(event) => handleSubmit(event)}>
        <div className="slider-form py-0">
          <span> تصویر:</span>
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
            {sliderData.image[0] ? (
              <img alt={sliderData.image[0]} src={sliderData.image[0]} />
            ) : (
              <span>انتخاب کنید...</span>
            )}
          </label>
          {validator.current.message("image", sliderData.image, "required")}
        </div>
        <div className="px-3 d-flex justify-content-between">
          <div className="flex-grow-1 mx-1">
            <label htmlFor="href" className="my-3">
              پیوند برای تصویر:
            </label>
            <input
              type="text"
              className="form-control"
              id="href"
              name="href"
              value={sliderData.href || ""}
              onChange={(event) => {
                handleOnChange(event);
                validator.current.showMessageFor("href");
              }}
            />
            {validator.current.message("href", sliderData.href, "url")}
          </div>
          <div className="flex-grow-1 mx-1">
            <label htmlFor="name" className="my-3">
              عنوان پیوند:
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={sliderData.name || ""}
              onChange={(event) => {
                handleOnChange(event);
                validator.current.showMessageFor("name");
              }}
            />
            {validator.current.message("name", sliderData.name, "string")}
          </div>
        </div>
        <div className="d-flex justify-content-end mt-3 ps-3">
          <button className="btn btn-success btn-sm  w-25 ">
            <span className="mdi mdi-upload ms-1" />
            <span>بارگذاری</span>
          </button>
        </div>
      </form>
    </>
  );
};

export default SliderForm;
