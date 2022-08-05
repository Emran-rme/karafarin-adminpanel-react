import { useContext } from "react";
import { adminSectionsContext } from "../../../../services/context/adminSectionsContext";
import { checkedValidator } from "../../../../utils/helpers/helpers";

const Category = () => {
  const {
    searchParams,
    categoriesList,
    sectionData,
    handleOnChange,
    validator,
  } = useContext(adminSectionsContext);
  return (
    <div className="col-md-6 mb-3">
      <label htmlFor="categoryId" className="my-1">
        نمایش پست های مربوط به دسته بندی:
      </label>
      <select
        name="categoryId"
        id="categoryId"
        className="form-control"
        value={sectionData.categoryId || ""}
        onChange={(event) => handleOnChange(event)}
      >
        <option value="">انتخاب کنید</option>
        {categoriesList.map((cat, index) => (
          <option value={cat.id} key={index}>
            {cat.category_name}
          </option>
        ))}
      </select>

      {searchParams.get("type") === "posts" &&
        checkedValidator(
          searchParams.get("type"),
          validator,
          "selectCat",
          sectionData.categoryId
        )}
    </div>
  );
};

export default Category;
