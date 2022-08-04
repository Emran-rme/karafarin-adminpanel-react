import { useEffect, useState } from "react";
import { DialogContent, DialogOverlay } from "@reach/dialog";
import { Dropzone, FileItem, FullScreenPreview } from "@dropzone-ui/react";
import config from "../../../services/redux/services/config.json";
import "@reach/dialog/styles.css";

const DropZoneModal = ({ show, close, pageId }) => {
  const [files, setFiles] = useState([]);
  const [imageSrc, setImageSrc] = useState(undefined);

  useEffect(() => {
    return () => {
      setFiles([]);
      setImageSrc(undefined);
    };
  }, [close]);
  const updateFiles = (incommingFiles) => {
    setFiles(incommingFiles);
  };
  const onDelete = (id) => {
    setFiles(files.filter((x) => x.id !== id));
  };
  const handleSee = (imageSource) => {
    setImageSrc(imageSource);
  };
  const handleClean = (files) => {
    // console.log(files);
    // console.log("list cleaned", files);
  };
  return (
    <DialogOverlay isOpen={show}>
      <DialogContent
        className="intro-y"
        style={{ width: "50%" }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div className="DialogHeader">
          <div className="text-end flex-grow-1  me-2 d-flex align-items-center">
            <span>بارگذاری تصاویر گالری </span>
          </div>
          <button onClick={close}>
            <span className="mdi mdi-close-box mdi-24px " />
          </button>
        </div>
        <div className="bg-light p-3">
          <div className="alert alert-primary">
            جهت بارگذاری تصاویر مورد نظر را بکشید و در کادر زیر رها کنید
          </div>
          <Dropzone
            style={{ maxHeight: "350px" }}
            view={"grid"}
            onChange={updateFiles}
            minHeight="195px"
            onClean={handleClean}
            value={files}
            maxFiles={5}
            //header={false}
            footer={false}
            maxFileSize={5120000}
            label="فایل را بکشید و در این مکان رها کنید"
            //label="Suleta tus archivos aquí"
            accept=".png,image/*"
            uploadingMessage={"Uploading..."}
            url={`${config.karafarinApi}/admin/admin/page/module/galleries/${pageId}`}
            //of course this url doens´t work, is only to make upload button visible
            // config={{ headers: { "content-type": "multipart/form-data;" } }}
            //uploadOnDrop
            //clickable={false}
            // fakeUploading
            // disableScroll
          >
            {files.map((file) => (
              <FileItem
                {...file}
                key={file.id}
                onDelete={onDelete}
                onSee={handleSee}
                //localization={"ES-es"}
                resultOnTooltip
                preview
                info
                hd
              />
            ))}
            <FullScreenPreview
              imgSource={imageSrc}
              openImage={imageSrc}
              onClose={(e) => handleSee(undefined)}
            />
          </Dropzone>
        </div>
      </DialogContent>
    </DialogOverlay>
  );
};

export default DropZoneModal;
