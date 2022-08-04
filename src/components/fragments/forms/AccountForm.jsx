import { isEmpty } from "lodash";
import { useEffect } from "react";

const AccountForm = ({
  user,
  firstName,
  setFirstName,
  lastName,
  setLatsName,
  email,
  setEmail,
  password,
  setPassword,
  handleSubmit,
  validator,
}) => {
  useEffect(() => {
    setEmail(user.email);
    if (!isEmpty(user.name)) {
      setFirstName(user.name.split("-")[0]);
      setLatsName(user.name.split("-")[1]);
    }
  }, [user]);
  return (
    <form onSubmit={(event) => handleSubmit(event, "manage-acc")}>
      <div className="row m-0">
        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mt-2 ">
          <div className="alert alert-warning">
            جهت ویرایش اطلاعات پس از تغییر اطلاعات گذرواژه خود را وارد نموده و
            ثبت را بزنید
          </div>
        </div>
        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 d-flex flex-column mt-1 mx-0 p-3">
          <div className="mb-3">
            <label htmlFor="first-name">نام:</label>
            <input
              type="text"
              className="form-control mt-2"
              id="first-name"
              name="firstName"
              placeholder="نام را وارد کنید"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            {validator.current.message("firstName", firstName, "required")}
          </div>
          <div className="mb-3">
            <label htmlFor="last-name">نام خانوادگی:</label>
            <input
              type="text"
              className="form-control mt-2"
              id="last-name"
              name="lastName"
              placeholder="نام خانوادگی را وارد کنید"
              value={lastName}
              onChange={(e) => setLatsName(e.target.value)}
            />
            {validator.current.message("lastName", lastName, "required")}
          </div>
          <div className="mb-3">
            <label htmlFor="email">پست الکترونیکی(نام کاربری):</label>
            <input
              type="email"
              className="form-control mt-2"
              id="email"
              placeholder="پست الکترونیکی را وارد کنید"
              value={email}
              disabled
            />
          </div>
        </div>
        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 d-flex flex-column mt-2 mx-0 p-3 border-end border-info">
          <div className="mb-3">
            <label htmlFor="password">گذرواژه :</label>
            <input
              type="password"
              className="form-control mt-2"
              id="password"
              name="password"
              autoComplete="off"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {validator.current.message("password", password, "required")}
          </div>
          <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 mb-3 me-auto mt-auto">
            <button className="btn btn-success w-100">
              <span className="mdi mdi-check ms-1" />
              <span>ثبت</span>
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default AccountForm;
