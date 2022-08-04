const NotFound = () => {
  return (
    <div className="not-found">
      <div className="container ">
        <div className="d-flex flex-column ">
          <div className="d-flex justify-content-center">
            <img src="/assets/images/404.svg" />
          </div>
          <h6 className="text-center my-4">
            ممکن است صفحه ای که به دنبال آن میگردید حذف شده باشد و یا آدرس آن را
            به درستی وارد نکرده باشید
          </h6>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
