import { useContext } from "react";
import { adminSectionsContext } from "../../../../services/context/adminSectionsContext";

const Title = () => {
  const { sectionData, handleOnChange, checkedValidator, searchParams } =
    useContext(adminSectionsContext);
  return (
    <div className="col-md-12 mb-3">
      <label htmlFor="title">عنوان</label>
      <input
        type="text"
        id="title"
        className="form-control"
        value={sectionData.title || ""}
        onChange={(e) => handleOnChange(e)}
      />
      {/* {(searchParams.get("type") === "teams" ||
        searchParams.get("type") === "services") &&
        checkedValidator("title")} */}
    </div>
  );
};

export default Title;
