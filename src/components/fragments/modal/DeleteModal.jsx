import { DialogContent, DialogOverlay } from "@reach/dialog";
import "@reach/dialog/styles.css";

const DeleteModal = ({ show, close, componentInfo, handleDelete }) => {
  return (
    <DialogOverlay isOpen={show} onDismiss={close}>
      <DialogContent
        className="intro-y"
        style={{ width: "40%" }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div className="DialogHeader">
          <div className="text-end flex-grow-1  me-2 d-flex align-items-center">
            <span>حذف {componentInfo.title} </span>
          </div>
        </div>
        <div className="bg-light p-3">
          {componentInfo.info && (
            <div className="alert alert-danger animate__animated animate__flash px-0 d-flex align-items-center">
              <span className="mdi mdi-alert-octagon mdi-36px text-danger ms-1" />
              <small>{componentInfo.info}</small>
            </div>
          )}
          <div className="d-flex flex-column ">
            <span className="mt-3 d-flex">
              <span className="mdi mdi-alert mdi-36px text-warning ms-2" />
              <span className="fw-bold">
                آیا از حذف این {componentInfo.title} مطمئن هستید؟
              </span>
            </span>
            <div className="d-flex mt-5 p-1 justify-content-center">
              <button
                className="btn btn-light shadow btn-sm w-25 mx-1 d-flex align-items-center justify-content-center"
                onClick={() => close("delete")}
              >
                <span className="mdi mdi-keyboard-return ms-2 mdi-18px" />
                <span>خیر</span>
              </button>
              <button
                className="btn btn-danger shadow btn-sm w-25 mx-1 d-flex align-items-center justify-content-center"
                onClick={() => handleDelete(componentInfo.itemId)}
              >
                <span className="mdi mdi-check ms-2 mdi-18px" />
                <span>بله</span>
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </DialogOverlay>
  );
};

export default DeleteModal;
