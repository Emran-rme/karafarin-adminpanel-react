import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changStatusBanner,
  editBanner,
  getBanner,
} from "../services/redux/actions/banner";
import {
  reactValidator,
  translateEnglishNumberToPersian,
} from "../utils/helpers/helpers";

import { PageInfo, BannerForm } from "../components";

const Advertising = () => {
  const [renderingComponent, setRenderingComponenet] = useState(false);
  const [advData, setAdvData] = useState({
    link: "",
    image: "",
    mobileImage: "",
  });
  const [, forceUpdate] = useState();

  const banner = useSelector((state) => state.banner);
  const dispatch = useDispatch();

  const validator = useRef(reactValidator());

  const rerender = () => setRenderingComponenet(!renderingComponent);

  useEffect(() => {
    dispatch(getBanner());
  }, [renderingComponent]);

  const handleShowOrHide = () => {
    const status = {
      bannerStatus: banner.is_Active,
    };
    dispatch(changStatusBanner(status, rerender));
  };

  const handleOnChange = (event) => {
    if (event.target.id === "link") {
      setAdvData({ ...advData, [event.target.name]: event.target.value });
    } else {
      setAdvData({
        ...advData,
        [event.target.name]: [
          URL.createObjectURL(event.target.files[0]),
          event.target.files[0],
        ],
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validator.current.allValid()) {
      let formData = new FormData();
      formData.append("_method", "put");
      formData.append("link", advData.link);
      formData.append("image_url", advData.image);
      formData.append("mobile_image_url", advData.mobileImage);
      dispatch(editBanner(formData));
    } else {
      validator.current.showMessages();
      forceUpdate(1);
    }
  };

  return (
    <div className="adv-page">
      <PageInfo title="مدیریت بنر بالای صفحه" />

      <div className="row m-0">
        <div className=" col-xl-6 col-lg-6 col-md-6 col-sm-6 my-2 ">
          <div className="form-check form-switch">
            <label htmlFor="checkbox-1" className="form-check-label">
              بنر بالای صفحه
              {banner.is_Active ? (
                <span className="fw-bold text-success"> فعال </span>
              ) : (
                <span className=" text-danger"> غیر فعال </span>
              )}
              است
            </label>
            <input
              type="checkbox"
              name=""
              id="checkbox-1"
              className="form-check-input "
              checked={banner.is_Active ? banner.is_Active : 0}
              onChange={handleShowOrHide}
            />
          </div>
        </div>
        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mt-2 d-flex justify-content-end">
          <span>
            <span>تعداد کلیک ها: </span>
            <span className="badge bg-warning">
              {translateEnglishNumberToPersian(banner.visibility)}
            </span>
          </span>
        </div>
        <hr />
        <div className="row m-0 p-0">
          <BannerForm
            banner={banner}
            data={advData}
            setData={setAdvData}
            handleOnChange={handleOnChange}
            handleSubmit={handleSubmit}
            validator={validator}
          />
        </div>
      </div>
    </div>
  );
};

export default Advertising;
