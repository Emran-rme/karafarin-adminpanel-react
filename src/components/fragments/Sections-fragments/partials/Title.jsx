import { useContext } from "react";
import { adminSectionsContext } from "../../../../services/context/adminSectionsContext";
import { checkedValidator } from "../../../../utils/helpers/helpers";

const Title = () => {
  const { sectionData, handleOnChange, validator, searchParams } =
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
      {(searchParams.get("type") === "teams" ||
        searchParams.get("type") === "services") &&
        checkedValidator(
          searchParams.get("type"),
          validator,
          "title",
          sectionData.title
        )}
    </div>
  );
};

export default Title;
