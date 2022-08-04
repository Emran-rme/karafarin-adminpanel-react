import { useContext } from "react";
import { adminSectionsContext } from "../../../../services/context/adminSectionsContext";

const CustomerItem = () => {
  const { sectionData, removeFormFields, handleOnChange } =
    useContext(adminSectionsContext);
  return sectionData.customerItem?.map((element, index) => (
    <div className="row d-flex align-items-center" key={index}>
      <div className="col-md-8 mb-3">
        <label htmlFor="name">نام و نام خانوادگی:</label>
        <input
          type="text"
          id="name"
          name="name"
          className="form-control"
          value={element.name || ""}
          onChange={(e) => handleOnChange(index, e, "teams")}
        />
        <label htmlFor="customerIcon">تصویر:</label>
        <input
          type="file"
          id="customerIcon"
          name="customerIcon"
          className="form-control"
          onChange={(e) => handleOnChange(index, e, "teams")}
        />
      </div>
      <div className="col-md-4 my-4 d-flex align-items-center justify-content-between">
        <img
          src={element.customerIcon || "https://via.placeholder.com/195x120"}
          alt={element.name || ""}
          className="w-100 rounded-3"
        />
        {index > 0 && (
          <span
            className="mdi mdi-close-box-outline me-4 text-danger mdi-24px pointer float-end bg-light d-flex align-items-center rounded-pill p-1 "
            onClick={() => removeFormFields(index, "teams")}
          />
        )}
      </div>
      <hr />
    </div>
  ));
};

export default CustomerItem;
