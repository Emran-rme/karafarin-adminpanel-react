import { useContext } from "react";
import { adminSectionsContext } from "../../../../services/context/adminSectionsContext";

const Category = () => {
  const {
    searchParams,
    checkedValidator,
    categoriesList,
    sectionData,
    handleOnChange,
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
        {categoriesList.map((cat, index) => (
          <option value={cat.id} key={index}>
            {cat.category_name}
          </option>
        ))}
      </select>

      {/* {searchParams.get("type") === "posts" && checkedValidator("selectCat")} */}
    </div>
  );
};

export default Category;
