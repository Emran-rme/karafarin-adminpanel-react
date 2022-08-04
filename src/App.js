import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { clearUser, getUserInfo } from "./services/redux/actions/user";
import { Loading, Routes } from "./components";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const expired_at = localStorage.getItem("expired_at");
    if (token) {
      const dateNow = Date.now() / 1000;
      if (expired_at < dateNow) {
        dispatch(clearUser());
      } else {
        // if (!isEmpty(location.state)) {
        // }
        dispatch(getUserInfo());
      }
    }
  }, []);

  return (
    <>
      <Routes />
      <ToastContainer />
      <Loading />
    </>
  );
}

export default App;
