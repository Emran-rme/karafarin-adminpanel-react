import { useSelector } from "react-redux";

const Loading = () => {
  const loading = useSelector((state) => state.loading);
  return (
    loading && (
      <div className="loading-page">
        <div className="loading-box">
          <div className="loader">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    )
  );
};

export default Loading;
