import { DialogContent, DialogOverlay } from "@reach/dialog";
import { componentChooser } from "../../../utils/helpers/helpers";
import "@reach/dialog/styles.css";

const CreateAndEditModal = ({ show, close, componentInfo }) => {
  return (
    <DialogOverlay isOpen={show} onDismiss={() => close("create-and-edit")}>
      <DialogContent
        className="intro-y"
        style={{ width: componentInfo.width }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div className="DialogHeader">
          <div className="text-end flex-grow-1  me-2 d-flex align-items-center">
            <span>{componentInfo.title}</span>
          </div>
          <button onClick={() => close("create-and-edit")}>
            <span className="mdi mdi-close-box mdi-24px " />
          </button>
        </div>

        <div className="bg-light p-3">{componentChooser(componentInfo)}</div>
      </DialogContent>
    </DialogOverlay>
  );
};

export default CreateAndEditModal;
