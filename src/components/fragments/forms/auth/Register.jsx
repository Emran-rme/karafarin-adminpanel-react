import { useContext } from "react";
import { Link } from "react-router-dom";
import { authContext } from "../../context/authContext";

const Register = () => {
  const {
    loading,
    validator,
    email,
    password,
    confirmPassword,
    setEmail,
    setPassword,
    setConfirmPassword,
    handleSubmit,
  } = useContext(authContext);

  return (
    <form onSubmit={(event) => handleSubmit(event, "register")}>
      <div className="mb-3">
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
      <div className="mb-3">
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
      <div className="mb-3">
        <label className="form-label w-100" htmlFor="confirm_password">
          تکرار گذرواژه
        </label>
        <input
          type="password"
          className="form-control mt-2"
          id="confirm_password"
          name="confirm_password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {validator.current.message(
          "confirm_password",
          confirmPassword,
          `required|in:${password}`
        )}
      </div>
      <div className="d-flex justify-content-end align-items-center">
        <button
          type="submit"
          className={loading ? `btn btn-primary disabled` : `btn btn-primary `}
        >
          <span className="mdi mdi-account-lock mx-1"></span>
          {loading ? <span>لطفا صبر کنید...</span> : <span>ثبت نام</span>}
        </button>
      </div>
      <div className="alert alert-warning mt-3 register-link">
        <span>قبلا در سایت ثبت نام کرده اید ؟</span>{" "}
        <Link to="../login"> وارد شوید</Link>
      </div>
    </form>
  );
};

export default Register;
