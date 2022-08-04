import { useContext } from "react";
import { adminSectionsContext } from "../../../services/context/adminSectionsContext";
import {
  sectionItems,
  translateSectinType,
} from "../../../utils/helpers/helpers";

const SectionForm = () => {
  const { validator, handleOnChange, sectionData, handleSubmit } =
    useContext(adminSectionsContext);

  return (
    <form onSubmit={(event) => handleSubmit(event)}>
      <div className="row p-4 mt-2">
        <div className=" col-xl-8 col-lg-8 col-md-8 col-sm-12 p-4 me-auto ms-auto">
          <label htmlFor="sectionType" className="my-1">
            دسته والد:
          </label>
          <select
            name="sectionType"
            id="sectionType"
            className="form-control"
            onChange={(event) => handleOnChange(event)}
            value={sectionData.sectionType || ""}
          >
            {sectionItems.map((section, index) => (
              <option value={section} key={index}>
                {translateSectinType(section)}
              </option>
            ))}
          </select>
          {/* {validator.current.message(
            "sectionName",
            categoryData.parentCat,
            "required"
          )} */}
        </div>
        <div className="row">
          <div className=" col-xl-5 col-lg-5 col-md-5 col-sm-12 p-4 me-auto">
            <button className="btn btn-success btn-sm  w-100 " type="submit">
              <span className="mdi mdi mdi-checkbox-marked-outline ms-1" />
              <span> افزودن بخش</span>
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default SectionForm;
