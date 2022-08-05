import { useContext } from "react";
import { adminSectionsContext } from "../../../../services/context/adminSectionsContext";
import { checkedValidator } from "../../../../utils/helpers/helpers";

const Image = () => {
  const { sectionData, searchParams, handleOnChange, validator } =
    useContext(adminSectionsContext);

  return (
    <div className="col-md-6 mb-3">
      <label htmlFor="image">تصویر</label>
      <input
        type="file"
        id="image"
        name="image"
        className="form-control"
        onChange={(e) => handleOnChange(e)}
      />
      {searchParams.get("type") === "about" &&
        checkedValidator(
          searchParams.get("type"),
          validator,
          "image",
          sectionData.image
        )}
    </div>
  );
};

export default Image;
