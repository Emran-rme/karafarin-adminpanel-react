import { DialogContent, DialogOverlay } from "@reach/dialog";
import "@reach/dialog/styles.css";
import { isEmpty } from "lodash";
import { translateSectinType } from "../../../utils/helpers/helpers";
import { Content } from "../../../components";
import { useEffect } from "react";

const SectionModal = ({
  setSectionData,
  show,
  close,
  data,
  componentName,
  add,
  submit,
}) => {
  // useEffect(() => {
  //   return () => {
  //     setSectionData({
  //       fields: "",
  //       description: "",
  //       sectionType: "",
  //       servicesItem: [{ link: "", linkName: "", serviceIcon: "" }],
  //       customerItem: [{ name: "", customerIcon: "" }],
  //     });
  //   };
  // }, []);
  return (
    <DialogOverlay isOpen={show} onDismiss={close}>
      <DialogContent
        className="intro-y"
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div className="DialogHeader">
          <div className="text-end flex-grow-1  me-2 d-flex align-items-center">
            <span>{translateSectinType(componentName)}</span>
          </div>
          <button onClick={close}>
            <span className="mdi mdi-close-box mdi-24px " />
          </button>
        </div>

        <div className="bg-light p-3">
          <form className="row" onSubmit={(e) => submit(e)}>
            {!isEmpty(data) &&
              data.map((item, index) => <Content key={index} item={item} />)}
            <div className="mt-2 d-flex align-items-center justify-content-between">
              {(componentName === "teams" || componentName === "services") && (
                <div
                  className="d-flex align-items-center btn btn-sm "
                  onClick={() => add(componentName)}
                >
                  <span className="mdi mdi-plus pointer d-flex align-items-center text-success mdi-24px " />
                  <span>افزودن آیتم</span>
                </div>
              )}
              <button className="btn btn-primary btn-sm w-25">ثبت</button>
            </div>
          </form>
        </div>
      </DialogContent>
    </DialogOverlay>
  );
};

export default SectionModal;
