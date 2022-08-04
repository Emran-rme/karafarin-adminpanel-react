const ChangePassForm = ({
  password,
  setPassword,
  oldPassword,
  setOldPassword,
  confirm_password,
  setConfirm_password,
  handleSubmit,
  validator,
  inActive,
}) => {
  return (
    <form onSubmit={(event) => handleSubmit(event, "manage-pass")}>
      <div className="d-flex flex-column align-items-center mt-2 mx-0 p-3">
        <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 mb-3">
          <label htmlFor="old-password">گذرواژه قدیمی:</label>
          <input
            type="password"
            className="form-control mt-2"
            id="old-password"
            placeholder="گذرواژه قبلی را وارد فرمایید"
            value={oldPassword}
            onChange={(event) => setOldPassword(event.target.value)}
            disabled={inActive}
          />
          {validator.current.message("old-password", oldPassword, "required")}
        </div>
        <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 mb-3">
          <label htmlFor="new-password">گذرواژه جدید:</label>
          <input
            type="password"
            className="form-control mt-2"
            id="new-password"
            placeholder="گذرواژه جدید را وارد فرمایید"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            disabled={inActive}
          />
          {validator.current.message("new-password", password, "required")}
        </div>
        <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 mb-3">
          <label htmlFor="confirm_password">تکرار گذرواژه:</label>
          <input
            type="password"
            className="form-control mt-2"
            id="confirm_password"
            value={confirm_password}
            onChange={(event) => setConfirm_password(event.target.value)}
            disabled={inActive}
          />
          {validator.current.message(
            "confirm_password",
            confirm_password,
            "required"
          )}
        </div>
        <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 mb-3">
          <button className="btn btn-success w-100" disabled={inActive}>
            <span className="mdi mdi-check ms-1" />
            <span>تغییر پسورد</span>
          </button>
        </div>
      </div>
    </form>
  );
};

export default ChangePassForm;
