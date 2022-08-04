import { isEmpty } from "lodash";
import { useEffect } from "react";
import config from "../../../services/redux/services/config.json";
const BannerForm = ({
  banner,
  data,
  setData,
  handleOnChange,
  handleSubmit,
  validator,
}) => {
  useEffect(() => {
    setData({ ...data, link: banner.link });
  }, [banner]);
  return (
    <form className="p-0" onSubmit={(event) => handleSubmit(event)}>
      <div className={banner.is_Active ? "d-block p-0" : "d-none"}>
        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 ">
          <div className="row m-0">
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-3">
              <label htmlFor="link"> پیوند :</label>
              <input
                type="text"
                id="link"
                name="link"
                className="form-control mt-3"
                value={data.link || ""}
                onChange={(event) => handleOnChange(event)}
              />
              {validator.current.message("link", data.link, "required")}
            </div>
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 p-2">
              <div className="row m-0">
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                  <div className="slider-form p-0">
                    <span>بنر برای دسکتاپ:</span>
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
                      {data.image[0] || banner.image_url ? (
                        <img
                          alt={data.image[0] || "desktop=banner"}
                          src={
                            data.image[0] || config.baseApi + banner.image_url
                          }
                        />
                      ) : (
                        <span>انتخاب کنید...</span>
                      )}
                    </label>
                    {validator.current.message("image", data.image, "required")}
                  </div>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                  <div className="slider-form p-0">
                    <span>بنر برای تلفن همراه:</span>
                    <input
                      type="file"
                      className="d-none"
                      id="mobileImage"
                      name="mobileImage"
                      onChange={(event) => {
                        handleOnChange(event);
                        validator.current.showMessageFor("mobileImage");
                      }}
                    />
                    <label htmlFor="mobileImage">
                      {data.mobileImage[0] || banner.mobile_image_url ? (
                        <img
                          alt={data.mobileImage[0] || "mobile-banner"}
                          src={
                            data.mobileImage[0] ||
                            config.baseApi + banner.mobile_image_url
                          }
                        />
                      ) : (
                        <span>انتخاب کنید...</span>
                      )}
                    </label>
                    {validator.current.message(
                      "mobileImage",
                      data.mobileImage,
                      "required"
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className=" col-xl-3 col-lg-3 col-md-3 col-sm-12 me-3 mb-5">
          <button className="btn btn-success btn-sm w-75 ">
            <span className="mdi mdi mdi-checkbox-marked-outline ms-1" />
            <span> ثبت</span>
          </button>
        </div>
      </div>
    </form>
  );
};

export default BannerForm;
