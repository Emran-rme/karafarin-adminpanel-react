import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { AdminMainSiteSideNav } from "..";
import { initAllData } from "../../services/redux/actions/adminMain";
import { allCategories } from "../../services/redux/actions/categories";

const MainLayout = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initAllData());
    dispatch(allCategories());
  }, []);
  return (
    <div className="content ">
      <div className="content-body">
        <div className="row m-0">
          <AdminMainSiteSideNav />
          <div className="col-xl-9 col-lg-9 col-md-9 col-sm-12 ">
            <div className="content-body__left-side">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
