import { useContext } from "react";
import { Link } from "react-router-dom";
import { authContext } from "../../../../services/context/authContext";

const Login = () => {
  const {
    location,
    validator,
    email,
    password,
    setEmail,
    setPassword,
    handleSubmit,
  } = useContext(authContext);

  return (
    <form
      onSubmit={(event) => handleSubmit(event, "login")}
      className="row m-0 p-0"
    >
      <div className="mb-3 col-xl-12 col-lg-12 col-md-6 col-sm-12 col-xs-12 ">
        <label className="form-label w-100" htmlFor="email">
          آدرس پست الکترونیکی
        </label>
        <input
          type="email"
          className="form-control mt-2"
          id="email"
          name="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            validator.current.showMessageFor("email");
          }}
        />
        {validator.current.message("email", email, "required|email")}
      </div>
      <div className="mb-3 col-xl-12 col-lg-12 col-md-6 col-sm-12 col-xs-12 ">
        <label className="form-label w-100" htmlFor="password">
          گذرواژه
        </label>
        <input
          type="password"
          className="form-control mt-2"
          id="password"
          name="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            validator.current.showMessageFor("password");
          }}
        />
        {validator.current.message("password", password, "required|min:6")}
      </div>
      <div className="row p-0 m-0">
        <div className="col-12 forget-password my-3">
          <Link to="../forget-password">رمز عبور خود را فراموش کرده اید؟</Link>
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-primary">
            <span className="mdi mdi-account-lock mx-1"></span>
            <span>ورود</span>
          </button>
        </div>
      </div>
      {/* <div className="d-flex justify-content-between align-items-center forget-password"></div> */}

      {/* <div className="alert alert-warning mt-3 register-link">
        <span>کاربر جدید هستید ؟</span>{" "}
        <Link to={`../register${location.search}`}>ثبت نام در سایت</Link>
      </div> */}
    </form>
  );
};

export default Login;
