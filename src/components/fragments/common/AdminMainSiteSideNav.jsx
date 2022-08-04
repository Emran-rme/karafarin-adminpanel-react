import { NavLink } from "react-router-dom";
import { adminMenuItem } from "../../../utils/helpers/helpers";
const AdminMainSiteSideNav = () => {
  return (
    <div className="col-lg-3 col-xl-3 col-md-3 col-sm-3 intro-x ">
      <div className="content-right-menu ">
        <ul>
          {adminMenuItem.map((item) => (
            <li key={item.id}>
              <NavLink
                to={item.link}
                className={({ isActive }) =>
                  isActive ? "active-menu intro-x" : "intro-x"
                }
              >
                <span className={`mdi ${item.icon} ms-1`} />
                <span>{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminMainSiteSideNav;
