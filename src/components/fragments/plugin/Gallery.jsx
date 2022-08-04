import { isEmpty } from "lodash";
import { useContext, useEffect, useState } from "react";
import { adminPageContext } from "../../../services/context/adminPageContext";
import config from "../../../services/redux/services/config.json";
import { PluginHeader, PluginGalleryTable } from "../../../components";

const Gallery = () => {
  const { handleActivePlugin, pluginItem, plugin, openModal } =
    useContext(adminPageContext);

  const [galleryImageShow, setGalleryImageShow] = useState(null);
  const [galleryStatus, setGalleryStatus] = useState(false);

  useEffect(() => {
    setGalleryStatus(plugin.module_status);
    return () => {
      setGalleryStatus(false);
      setGalleryImageShow(null);
    };
  }, [plugin]);
  return (
    <div className="p-2">
      <PluginHeader
        status={galleryStatus}
        pluginTitle="گالری تصاویر"
        pluginName="Galleries"
        onChangeStatus={setGalleryStatus}
        handleActivePlugin={handleActivePlugin}
      />
      {galleryStatus ? (
        <div className="row m-0 ">
          <div className="col-xl-7 col-lg-7 col-md-7 col-sm-12 mb-3 comment-scrolling pb-4">
            <PluginGalleryTable
              pluginItem={pluginItem}
              setGalleryImageShow={setGalleryImageShow}
            />
          </div>
          <div className="col-xl-5 col-lg-5 col-md-5 col-sm-12 mb-3">
            <div className="d-flex flex-column mt-2">
              <div className="d-flex justify-content-end flex-grow-1">
                <button
                  className="btn btn-outline-primary btn-sm "
                  onClick={openModal}
                >
                  <span className="mdi mdi-upload" />
                  <span>بارگذاری تصویر</span>
                </button>
              </div>
              <div className="show-gallery-image">
                {!isEmpty(galleryImageShow) ? (
                  <img src={config.baseApi + galleryImageShow} alt="تصاویر" />
                ) : null}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <h4 className="fw-bold fs-5 text-center">
          پلاگین گالری غیر فعال می باشد
        </h4>
      )}
    </div>
  );
};

export default Gallery;
