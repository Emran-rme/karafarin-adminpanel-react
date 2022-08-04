const PageHeader = (...props) => {
  return (
    <div className="content-page__table">
      <div className="table-content">
        <div className="table-header">
          {props[0].query ? (
            <span>پلاگینها</span>
          ) : (
            <span>{props[0].title} ها</span>
          )}
          {props[0].search && props[0].search}
          {props[0].query && props[0].navigate ? (
            <button
              className="btn btn-warning btn-sm ms-1"
              onClick={props[0].navigate}
            >
              <span className="mdi mdi-arrow-right ms-1" />
              <span>بازگشت به صفحه قبل</span>
            </button>
          ) : (
            <button
              className="btn btn-light btn-sm ms-1"
              onClick={props[0].open}
            >
              <span className="mdi mdi-plus ms-1" />
              <span> {props[0].title} جدید</span>
            </button>
          )}
        </div>
        <div className="table-body table-body-scrolling">
          {props[0].children}
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
