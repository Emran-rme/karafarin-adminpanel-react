import { useContext } from "react";
import { adminSectionsContext } from "../../../../services/context/adminSectionsContext";

const ServiceItem = () => {
  const { sectionData, removeFormFields, handleOnChange } =
    useContext(adminSectionsContext);

  return sectionData.servicesItem?.map((element, index) => (
    <div className="row" key={index}>
      <div className="col-md-8 mb-3">
        <label htmlFor="link">پیوند:</label>
        <input
          type="text"
          id="link"
          name="link"
          className="form-control"
          value={element.link || ""}
          onChange={(e) => handleOnChange(index, e, "services")}
        />
        <label htmlFor="linkName">عنوان پیوند:</label>
        <input
          type="text"
          id="linkName"
          name="linkName"
          className="form-control"
          value={element.linkName || ""}
          onChange={(e) => handleOnChange(index, e, "services")}
        />
        <label htmlFor="serviceIcon">تصویر:</label>
        <input
          type="file"
          id="serviceIcon"
          name="serviceIcon"
          className="form-control"
          onChange={(e) => handleOnChange(index, e, "services")}
        />
      </div>
      <div className="col-md-4 my-4 d-flex align-items-center justify-content-between">
        <img
          src={element.serviceIcon || "https://via.placeholder.com/195x120"}
          alt={element.link || ""}
          className="w-100 rounded-3"
        />{" "}
        <span
          className="mdi mdi-close-box-outline me-4 text-danger mdi-24px pointer float-end bg-light d-flex align-items-center rounded-pill p-1"
          onClick={() => removeFormFields(index, "services")}
        />
      </div>

      <hr />
    </div>
  ));
};

export default ServiceItem;
