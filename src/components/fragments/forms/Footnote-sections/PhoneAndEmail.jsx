import { useContext } from "react";
import { adminFooterContext } from "../../../../services/context/adminFooterContext";

const PhoneAndEmail = () => {
  const { inputData: data, handleOnChange } = useContext(adminFooterContext);

  return (
    <div className="col-8 border-top mt-4 ">
      <label htmlFor="tel" className="mt-4">
        تلفن:
      </label>
      <input
        type="tel"
        name="tel"
        id="tel"
        dir="ltr"
        value={data.tel}
        onChange={(e) => handleOnChange(e)}
        className="form-control"
        placeholder="021***"
      />
      <label htmlFor="email" className="mt-1">
        پست الکترونیکی:
      </label>
      <input
        type="email"
        name="email"
        id="email"
        dir="ltr"
        value={data.email}
        onChange={(e) => handleOnChange(e)}
        className="form-control"
        placeholder="example@companyName.com"
      />
    </div>
  );
};

export default PhoneAndEmail;
