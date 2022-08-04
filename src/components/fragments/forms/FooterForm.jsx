const FooterForm = ({ componentName: name, submit }) => {
  return (
    <form
      onSubmit={(e) => submit(e)}
      className="d-flex flex-column align-items-center"
    >
      <div className="d-flex flex-column align-items-center w-100 footer-box ">
        {name.component ? (
          name.component
        ) : (
          <h5 className="mt-5">از منوی کناری یکی از بخش هارا انتخاب کنید </h5>
        )}
      </div>
      {name.component && (
        <div className="col-12">
          <button type="submit" className="btn btn-success mt-3 float-start">
            ثبت
          </button>
        </div>
      )}
    </form>
  );
};

export default FooterForm;
