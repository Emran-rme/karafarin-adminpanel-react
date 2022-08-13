import { useContext } from "react";
import { adminFooterContext } from "../../../../services/context/adminFooterContext";

const Link = () => {
  const {
    inputData: data,
    handleOnChange,
    addFormInput,
    removeFormInput,
  } = useContext(adminFooterContext);

  return (
    <>
      <div className="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12">
        <label htmlFor="secondPartTitle">عنوان: </label>
        <input
          type="text"
          className="form-control"
          id="secondPartTitle"
          name="secondPartTitle"
          value={data.secondPartTitle || ""}
          onChange={(e) => handleOnChange(e)}
        />
      </div>
      {data.link?.map((element, i) => (
        <div
          className="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12 border-top mt-4 d-flex align-items-center"
          key={i}
        >
          <div className="flex-fill">
            <div className="mt-4">
              <label htmlFor="name">نام پیوند:</label>
              <input
                type="text"
                className="form-control"
                name="name"
                id="name"
                value={element.name || ""}
                onChange={(e) => handleOnChange(e, i, "Link")}
              />
            </div>
            <div className="mt-2">
              <label htmlFor="href"> پیوند:</label>
              <input
                type="text"
                className="form-control"
                name="href"
                id="href"
                value={element.href || ""}
                onChange={(e) => handleOnChange(e, i, "Link")}
              />
            </div>
          </div>
          <div className="mt-5 me-5">
            {data.link?.length - 1 === i && (
              <span
                className="mdi mdi-plus-box mdi-24px  text-success"
                onClick={() => addFormInput("Link")}
              />
            )}
            {data.link?.length !== 1 && (
              <span
                className="mdi mdi-minus-box mdi-24px text-danger "
                onClick={() => removeFormInput(i, "Link")}
              />
            )}
          </div>
        </div>
      ))}
    </>
  );
};

export default Link;
