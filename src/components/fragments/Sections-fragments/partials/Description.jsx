import { useContext } from "react";
import { adminSectionsContext } from "../../../../services/context/adminSectionsContext";

const Description = () => {
  const { sectionData, handleOnChange, checkedValidator, searchParams } =
    useContext(adminSectionsContext);

  return (
    <div className="col-md-12 mb-3">
      <label htmlFor="description">توضیحات : </label>
      <textarea
        id="description"
        name="description"
        className="form-control"
        rows="3"
        value={sectionData.description || ""}
        onChange={(e) => handleOnChange(e)}
      ></textarea>
      {/* {(searchParams.get("type") === "about" ||
        searchParams.get("type") === "services") &&
        checkedValidator("description")} */}
    </div>
  );
};

export default Description;
