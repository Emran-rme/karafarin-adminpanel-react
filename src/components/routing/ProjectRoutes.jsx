import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  AuthLayouts,
  Login,
  AdminLayout,
  MainLayout,
  MainPage,
  AdminSlider,
  Categories,
  Advertising,
  Profile,
  Pages,
  Sections,
  Footer,
  NotFound,
} from "../../components";

const ProjectRoutes = () => {
  const user = useSelector((state) => state.user);

  return (
    <Routes>
      <Route path="/" element={<AuthLayouts user={user} />}>
        <Route index element={<Login />} />
        <Route path="login" element={<Login />} />
        {/* <Route path="register" element={<Register />} /> */}
      </Route>
      <Route path="admin-panel" element={<AdminLayout user={user} />}>
        <Route path="main-site" element={<MainLayout />}>
          <Route index element={<MainPage />} />
          <Route path="slider" element={<AdminSlider />} />
          <Route path="categories" element={<Categories />} />
          <Route path="pages" element={<Pages />} />
          <Route path="advertising" element={<Advertising />} />
          <Route path="profile" element={<Profile />} />
          <Route path="sections" element={<Sections />} />
          <Route path="footer" element={<Footer />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default ProjectRoutes;
