import { isEmpty, startCase } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearUser } from "../../../services/redux/actions/user";

const AdminSideNav = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <nav className="side-nav">
      <Link
        to="/"
        className="intro-x d-flex align-items-center pt-5 justify-content-center"
      >
        <img src="/assets/images/logo.png" alt="" />
      </Link>
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
      <ul>
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
