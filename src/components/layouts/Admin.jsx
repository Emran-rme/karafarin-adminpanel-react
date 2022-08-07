import { isEmpty } from "lodash";
import { Navigate, Outlet } from "react-router-dom";
import { AdminSideNav } from "../../components";

const Admin = ({ user }) => {
  if (!isEmpty(user)) {
    if (user.is_admin) {
      return (
        <div className="bg-page">
          <div className="container-fluid">
            
            <div className="row m-0 p-0">
              <div className="col-xl-2 col-lg-2 col-md-3 col-sm-12 col-xs-12 position-relative">
                <AdminSideNav />
              </div>
              <div className="col-xl-10 col-lg-10 col-md-9 col-sm-12 col-xs-12 pe-0 ">
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
  return <Navigate to="/" replace />;
};

export default Admin;
