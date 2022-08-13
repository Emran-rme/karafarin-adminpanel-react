import { isEmpty } from "lodash";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Link,
  Outlet,
  useSearchParams,
  useLocation,
  useNavigate,
  Navigate,
} from "react-router-dom";

import SimpleReactValidator from "simple-react-validator";
import { userLogin, userRegister } from "../../services/redux/actions/user";
import { authContext } from "../../services/context/authContext";

const Auth = ({ user }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [, forceUpdate] = useState();

  const loading = useSelector((state) => state.loading);

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const validator = useRef(
    new SimpleReactValidator({
      messages: {
        required: "پر کردن این فیلد الزامی می باشد",
        min: "گذرواژه کمتر از 6 کاراکتر نباید باشد ",
        email: "پست الکترونیکی نوشته شده صحیح نمی باشد",
        in: "گذرواژه ها یکسان نمی باشد",
      },
      element: (message) => (
        <>
          <div className="error-icon" />
          <div className="error-message animate__animated animate__shakeX">
            {message}
          </div>
        </>
      ),
    })
  );

  const handleSubmit = (event, componentName) => {
    event.preventDefault();

    switch (componentName) {
      case "login":
        const loginUserData = {
          email,
          password,
        };

        if (validator.current.allValid()) {
          dispatch(userLogin(loginUserData, searchParams, navigate));
        } else {
          validator.current.showMessages();
          forceUpdate(1);
        }
        break;
      case "register":
        const registerUserData = {
          email,
          password,
          password_confirmation: confirmPassword,
        };

        if (validator.current.allValid()) {
          dispatch(userRegister(registerUserData, searchParams, navigate));
        } else {
          validator.current.showMessages();
          forceUpdate(1);
        }
        break;
    }
  };

  if (!isEmpty(user)) {
    if (user.is_admin) {
      return <Navigate to="/admin-panel/main-site" replace />;
    }
  }

  return (
    <div className="bg-page Auth">
      <div className="Left-design"></div>
      <div className="auth-box">
        <div className="container d-flex justify-content-center">
          <div className="auth-box__content">
            <div className="auth-box__content--right">
              <authContext.Provider
                value={{
                  loading,
                  location,
                  validator,
                  email,
                  password,
                  confirmPassword,
                  setEmail,
                  setPassword,
                  setConfirmPassword,
                  handleSubmit,
                }}
              >
                <Outlet />
              </authContext.Provider>
            </div>
            <div className="auth-box__content--left ">
              <Link to="/">
                <img src="/assets/images/logo.png" alt="logo" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
