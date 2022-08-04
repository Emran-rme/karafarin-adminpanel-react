import { isEmpty } from "lodash";
import { Navigate, Outlet } from "react-router-dom";
import { AdminSideNav } from "../../components";

const Admin = ({ user }) => {
  if (!isEmpty(user)) {
    if (user.is_admin) {
      return (
        <div className="bg-page">
          <div className="container-fluid">
            <div className="d-flex">
              <AdminSideNav />
              <Outlet />
            </div>
          </div>
        </div>
      );
    }
  }
  return <Navigate to="/" replace />;
};

export default Admin;
