import { useContext } from "react";
import { adminFooterContext } from "../../../../services/context/adminFooterContext";

const ServicesLink = () => {
  const {
    inputData: data,
    handleOnChange,
    addFormInput,
    removeFormInput,
  } = useContext(adminFooterContext);

  return (
    <>
      <div className="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12">
        <label htmlFor="firstPartTitle">عنوان: </label>
        <input
          type="text"
          className="form-control"
          name="firstPartTitle"
          id="firstPartTitle"
          value={data.firstPartTitle || ""}
          onChange={(e) => handleOnChange(e)}
        />
      </div>
      {data.servicesLink?.map((element, i) => (
        <div
          className="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12 border-top mt-4 d-flex align-items-center"
          key={i}
        >
          <div className="flex-fill">
            <div className="mt-4">
              <label htmlFor="linkName">نام پیوند:</label>
              <input
                type="text"
                className="form-control"
                name="linkName"
                id="linkName"
                value={element.linkName || ""}
                onChange={(e) => handleOnChange(e, i, "ServicesLink")}
              />
            </div>
            <div className="mt-2">
              <label htmlFor="linkHref"> پیوند:</label>
              <input
                type="text"
                className="form-control"
                name="linkHref"
                id="linkHref"
                value={element.linkHref || ""}
                onChange={(e) => handleOnChange(e, i, "ServicesLink")}
              />
            </div>
          </div>
          <div className="mt-5 me-5">
            {data.servicesLink?.length - 1 === i && (
              <span
                className="mdi mdi-plus-box mdi-24px  text-success"
                onClick={() => addFormInput("ServicesLink")}
              />
            )}
            {data.servicesLink?.length !== 1 && (
              <span
                className="mdi mdi-minus-box mdi-24px text-danger "
                onClick={() => removeFormInput(i, "ServicesLink")}
              />
            )}
          </div>
        </div>
      ))}
    </>
  );
};

export default ServicesLink;
