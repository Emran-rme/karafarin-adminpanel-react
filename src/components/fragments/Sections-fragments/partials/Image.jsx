import { useContext } from "react";
import { adminSectionsContext } from "../../../../services/context/adminSectionsContext";

const Image = () => {
  const { checkedValidator, searchParams, handleOnChange } =
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
      {/* {searchParams.get("type") === "about" && checkedValidator("image")} */}
    </div>
  );
};

export default Image;
