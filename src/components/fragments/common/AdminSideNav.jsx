import { isEmpty } from "lodash";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { clearUser } from "../../../services/redux/actions/user";
import AdminMainSiteSideNav from "./AdminMainSiteSideNav";

const AdminSideNav = () => {
  const [active, setActive] = useState(false);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    return () => setActive(false);
  }, [location.pathname]);
  return (
    <nav className="side-nav">
      <div className="d-flex justify-content-between align-items-center pt-3">
        {active ? (
          <span
            className="mdi mdi-close mdi-36px d-none text-light"
            onClick={() => setActive((prevState) => !prevState)}
          />
        ) : (
          <span
            className="mdi mdi-menu mdi-36px d-none text-light"
            onClick={() => setActive((prevState) => !prevState)}
          />
        )}
        <Link to="/" className="intro-x d-flex justify-content-center">
          <img src="/assets/images/logo.png" alt="logo" />
        </Link>
      </div>
      <div className={`mobile-menu ${active ? "show" : "hide"} d-none`}>
        <div className="d-flex justify-content-between align-items-center w-100 my-3">
          <div className=" text-center fw-bold ">
            <span>
              {isEmpty(user.name) ? user.email : user.name.split("-").join(" ")}{" "}
            </span>
            <span className="me-1"> خوش آمدید</span>
          </div>
          <button
            className="btn btn-danger d-flex justify-content-center align-items-center"
            type="button"
            onClick={() => dispatch(clearUser(navigate))}
          >
            <span className="mdi mdi-power me-1 mdi-18px" />
            <span> خروج</span>
          </button>
        </div>
        <ul>
          <li>
            {/* <a href="index.html"> */}
            <div> مدیریت سایت </div>
            <AdminMainSiteSideNav
              path="./main-site/"
              changeStatus={setActive}
            />
            {/* </a> */}
          </li>
          <li>
            {/* <a href="index.html"> */}
            <div> مدیریت فروشگاه </div>
            {/* </a> */}
          </li>
          <li>
            {/* <a href="index.html"> */}
            <div> مدیریت باشگاه مشتریان </div>
            {/* </a> */}
          </li>
        </ul>
      </div>
      <div className="side-nav__devider my-2 intro-x">
        <div className="side-nav__user-info">
          <div>
            <span>
              {" "}
              {isEmpty(user.name)
                ? user.email
                : user.name.split("-").join(" ")}{" "}
            </span>
            <span className="me-1"> خوش آمدید</span>
          </div>
          <div>
            <div className="side-nav__user-info--avatar" />
          </div>
          <div>
            <div className="side-nav__user-info--last-login">
              <span> آخرین ورود:</span>
              <span> 1399/1/2</span>
            </div>
            <div className="side-nav__user-info--setting">
              <button
                className="d-flex align-items-center"
                type="button"
                onClick={() => dispatch(clearUser(navigate))}
              >
                <span className="mdi mdi-power me-1 mdi-18px" />
                <span> خروج</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <ul className="nav-right">
        <li>
          <a href="index.html" className="side-menu side-menu--active">
            <div className="side-menu__icon">
              {" "}
              <i className="mx-1 mdi mdi-view-dashboard"></i>{" "}
            </div>
            <div className="side-menu__title"> مدیریت سایت </div>
          </a>
        </li>
        <li>
          <a href="index.html" className="side-menu ">
            <div className="side-menu__icon">
              {" "}
              <i className="mx-1 mdi mdi-shopping"></i>{" "}
            </div>
            <div className="side-menu__title"> مدیریت فروشگاه </div>
          </a>
        </li>
        <li>
          <a href="index.html" className="side-menu ">
            <div className="side-menu__icon">
              {" "}
              <i className="mx-1 mdi mdi-cards-club"></i>{" "}
            </div>
            <div className="side-menu__title"> مدیریت باشگاه مشتریان </div>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default AdminSideNav;
