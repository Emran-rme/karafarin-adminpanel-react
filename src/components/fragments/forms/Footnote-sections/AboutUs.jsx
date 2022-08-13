import { useContext } from "react";
import { adminFooterContext } from "../../../../services/context/adminFooterContext";

const AboutUs = () => {
  const { inputData: data, handleOnChange } = useContext(adminFooterContext);
  return (
    <>
      <div className="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12">
        <label htmlFor="thirdPartTitle">عنوان: </label>
        <input
          type="text"
          className="form-control"
          id="thirdPartTitle"
          name="thirdPartTitle"
          value={data.thirdPartTitle || ""}
          onChange={(e) => handleOnChange(e)}
        />
      </div>
      <div className="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12 border-top mt-4 ">
        <label htmlFor="body" className="mt-2">
          توضیحات:
        </label>
        <textarea
          name="body"
          id="body"
          cols="30"
          rows="10"
          className="form-control"
          value={data.body || ""}
          onChange={(e) => handleOnChange(e)}
        ></textarea>
      </div>
    </>
  );
};

export default AboutUs;
