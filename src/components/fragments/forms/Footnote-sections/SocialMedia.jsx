import { useContext } from "react";
import { adminFooterContext } from "../../../../services/context/adminFooterContext";

const SocialMedia = () => {
  const { inputData: data, handleOnChange } = useContext(adminFooterContext);

  return (
    <div className="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12 border-top mt-4 d-flex align-items-center">
      <div className="flex-fill">
        <div className="mt-4">
          <label className="input-label facebook">
            <input
              type="text"
              className="form-control"
              name="facebook"
              id="facebook"
              value={data.facebook || ""}
              onChange={(e) => handleOnChange(e)}
            />
          </label>
          <label className="input-label instagram">
            <input
              type="text"
              className="form-control"
              name="instagram"
              id="instagram"
              value={data.instagram || ""}
              onChange={(e) => handleOnChange(e)}
            />
          </label>
          <label className="input-label whatsapp">
            <input
              type="text"
              className="form-control"
              name="whatsapp"
              id="whatsapp"
              value={data.whatsapp || ""}
              onChange={(e) => handleOnChange(e)}
            />
          </label>
          <label className="input-label telegram">
            <input
              type="text"
              className="form-control"
              name="telegram"
              id="telegram"
              value={data.telegram || ""}
              onChange={(e) => handleOnChange(e)}
            />
          </label>
          <label className="input-label youtube">
            <input
              type="text"
              className="form-control"
              name="youtube"
              id="youtube"
              value={data.youtube || ""}
              onChange={(e) => handleOnChange(e)}
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default SocialMedia;
