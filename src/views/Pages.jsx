import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { isEmpty } from "lodash";
import config from "../services/redux/services/config.json";
import { adminPageContext } from "../services/context/adminPageContext";
import {
  createNewPage,
  deletePage,
  editPage,
  getAllPages,
} from "../services/redux/actions/pages";
import {
  clearPlugin,
  getPlugin,
  setPlugin,
} from "../services/redux/actions/plugin";
import {
  changeCommentStatusUrl,
  deleteCommentUrl,
  deleteGalleryUrl,
  replyCommentUrl,
} from "../services/redux/services/pluginService";
import { loading } from "../services/redux/actions/Loading";
import {
  errorMessage,
  reactValidator,
  successMessage,
} from "../utils/helpers/helpers";

import {
  CreateAndEditModal,
  DeleteModal,
  PageInfo,
  PagesTable,
  PluginPage,
  DropZoneModal,
  Pagination,
  PageHeader,
} from "../components";

const Pages = () => {
  //page state
  const [modalStatus, setModalStatus] = useState({
    delete: false,
    createAndEdit: false,
    dropzone: false,
  });
  const [currentComponent, setCurrentComponent] = useState({
    width: "70%",
    title: "صفحه",
    info: null,
    componentName: "PAGE_FORM",
  });
  const [pageData, setPageData] = useState({
    method: "POST",
    title: "",
    draftStatus: false,
    category: "",
    keywords: "",
    keywordList: [],
    image: "",
  });
  const [postBody, setPostBody] = useState("");
  //plugin state
  const [commentData, setCommentData] = useState({
    replayText: "",
    activeReply: false,
    id: "",
  });
  const [, forceUpdate] = useState();

  const [searchParams, setSearchParams] = useSearchParams();

  //validator
  const validator = useRef(reactValidator());

  //initialize category, pages and pluginlist
  const categoryList = useSelector((state) => state.categories);
  const pagesList = useSelector((state) => state.pages);
  const plugin = useSelector((state) => state.plugin);
  const pluginItem = useSelector((state) => state.pluginItem);

  //dispatch
  const dispatch = useDispatch();

  //path and location
  const location = useLocation();
  const navigate = useNavigate();
  const pageUrl = location.pathname;
  const queryParams = searchParams.get("page-id") && searchParams.get("type");

  // end request for initialize pageList
  useEffect(() => {
    //plugin list
    if (queryParams) {
      dispatch(
        getPlugin(searchParams.get("page-id"), searchParams.get("type"))
      );
    } else {
      dispatch(clearPlugin());
    }
    // resived all page
    if (isEmpty(pagesList)) {
      dispatch(getAllPages());
    }
  }, [location]);

  //category select options
  const categoryOptions = categoryList.map((cat) => ({
    value: `${cat.id}`,
    label: `${cat.category_name}`,
  }));

  //open adn close for create and Edit modal
  /*
   * parameters:
   * 1- props[0]: create-and-edit or delete mode
   * 2-props[1]: delet item id,
   * 3-props[2]: CREATE or edit mode
   */

  const openModal = (...props) => {
    if (props[0] === "create-and-edit") {
      setModalStatus({ ...modalStatus, createAndEdit: true });
      if (props[2] === "EDIT") {
        setPageData({
          method: "PUT",
          pageId: props[3].id,
          title: props[3].page_title,
          draftStatus: parseInt(props[3].draft_status),
          category: props[3].category_id,
          keywordList: props[3].keywords.split(","),
          image: [config.baseApi + props[3].thumbnail_image_url],
        });
        setPostBody(props[3].page_body);
      }
    } else if (props[0] === "delete") {
      setModalStatus({ ...modalStatus, delete: true });
      setCurrentComponent({ ...currentComponent, itemId: props[1] });
    } else {
      setModalStatus({ ...modalStatus, dropzone: true });
    }
  };
  const closeModal = (name) => {
    if (name === "create-and-edit") {
      setModalStatus({ ...modalStatus, createAndEdit: false });
    } else if (name === "delete") {
      setModalStatus({ ...modalStatus, delete: false });
    } else {
      setModalStatus({ ...modalStatus, dropzone: false });
      dispatch(
        getPlugin(searchParams.get("page-id"), searchParams.get("type"))
      );
    }
  };

  //tag lists
  const handleAddTagToList = (tagItem) => {
    if (!isEmpty(tagItem)) {
      if (!pageData.keywordList.includes(tagItem)) {
        let newTagList = [];
        if (tagItem.includes("،") && tagItem.split(",")[1].trim()) {
          tagItem.split("،").map((tag) => newTagList.push(tag));
          setPageData({
            ...pageData,
            keywordList: [...pageData.keywordList, ...newTagList],
            keywords: "",
          });
        } else {
          setPageData({
            ...pageData,
            keywordList: [...pageData.keywordList, tagItem],
            keywords: "",
          });
        }
      }
    }
  };
  const handleRemoveTagInList = (tagID) => {
    let newTagList = [...pageData.keywordList];
    newTagList.splice(tagID, 1);
    setPageData({ ...pageData, keywordList: [...newTagList] });
  };

  //search
  const filteredPages = pagesList.data?.filter((page) => {
    let filter = searchParams.get("filter");
    if (!filter) return true;
    return page.page_title.startsWith(filter);
  });

  //header options
  const headerOption = {
    open: () => openModal("create-and-edit", null, "CREATE", null),
    title: " صفحه ",
    search: (
      <label className={queryParams ? "d-none" : "search-label"}>
        <input
          type="text"
          className="search-input"
          placeholder="جستجو..."
          value={searchParams.get("filter") || ""}
          onChange={(event) => {
            let filter = event.target.value;
            if (filter) {
              setSearchParams({ filter });
            } else {
              setSearchParams({});
            }
          }}
        />
      </label>
    ),
    query: queryParams,
    navigate: () => navigate(pageUrl, { replace: true }),
  };

  // change form input value
  const handleOnChange = (event) => {
    if (event.target.id === "image") {
      setPageData({
        ...pageData,
        [event.target.name]: [
          URL.createObjectURL(event.target.files[0]),
          event.target.files[0],
        ],
      });
    } else if (event.target.id === "draftStatus") {
      setPageData({
        ...pageData,
        [event.target.name]: event.currentTarget.checked,
      });
    } else {
      console.log([event.target.name], event.target.value);
      setPageData({ ...pageData, [event.target.name]: event.target.value });
    }
  };
  // store and update page
  const handleSubmit = (event, isMethod) => {
    event.preventDefault();
    if (isMethod === "POST") {
      if (validator.current.allValid()) {
        let formData = new FormData();
        formData.append("page-title", pageData.title);
        formData.append("draft-status", pageData.draftStatus ? 1 : 0);
        formData.append("category-id", pageData.category);
        formData.append("keywords", pageData.keywordList);
        formData.append("image-url", pageData.image[1]);
        formData.append("page-body", postBody);
        dispatch(createNewPage(formData, closeModal));
      } else {
        validator.current.showMessages();
        forceUpdate(1);
      }
    } else {
      if (validator.current.allValid()) {
        let formData = new FormData();
        formData.append("_method", "put");
        formData.append("page-title", pageData.title);
        formData.append("draft-status", pageData.draftStatus ? 1 : 0);
        formData.append("category-id", pageData.category);
        formData.append("keywords", pageData.keywordList);
        formData.append("image-url", pageData.image[1]);
        formData.append("page-body", postBody);
        dispatch(editPage(pageData.pageId, formData, closeModal));
      } else {
        validator.current.showMessages();
        forceUpdate(1);
      }
    }
  };
  // delete Page
  const handleDelete = (pageId) => {
    dispatch(deletePage(pageId, closeModal));
  };

  //active and diactive plugin
  const handleActivePlugin = (type, isActive) => {
    const data = {
      module_status: isActive,
    };
    dispatch(setPlugin(searchParams.get("page-id"), type, data));
  };

  //comment change status and reply comment
  const handleSubmitComment = async (event, commentId) => {
    event.preventDefault();
    if (!isEmpty(commentData.replayText)) {
      try {
        dispatch(loading(true));
        const comment = {
          _method: "put",
          data: commentData.replayText,
        };
        const { data, status } = await replyCommentUrl(commentId, comment);
        if (status === 200) {
          successMessage(data.message);
          dispatch(
            getPlugin(searchParams.get("page-id"), searchParams.get("type"))
          );
        }
      } catch (error) {
        errorMessage("خطای ناشناخته ای رخ داده مجددا امتحان فرمایید.", "dark");
      } finally {
        dispatch(loading(false));
      }
    }
  };
  const handleChangeCommentStatus = async (commentId) => {
    try {
      dispatch(loading(true));
      const comment = {
        _method: "put",
      };
      const { data, status } = await changeCommentStatusUrl(commentId, comment);
      if (status === 200) {
        successMessage(data.message);
        dispatch(
          getPlugin(searchParams.get("page-id"), searchParams.get("type"))
        );
      }
    } catch (error) {
      errorMessage("خطای ناشناخته ای رخ داده مجددا امتحان فرمایید.", "dark");
    } finally {
      dispatch(loading(false));
    }
  };
  const handleDeletePluginItem = async (pluginName, id) => {
    if (pluginName === "Comments") {
      try {
        dispatch(loading(true));
        const { data, status } = await deleteCommentUrl(id);
        if (status === 200) {
          successMessage(data.message);
          dispatch(
            getPlugin(searchParams.get("page-id"), searchParams.get("type"))
          );
        }
      } catch (error) {
        errorMessage("خطای ناشناخته ای رخ داده مجددا امتحان فرمایید.", "dark");
      } finally {
        dispatch(loading(false));
      }
    } else {
      try {
        dispatch(loading(true));
        const { data, status } = await deleteGalleryUrl(id);
        if (status === 200) {
          successMessage(data.message);
          dispatch(
            getPlugin(searchParams.get("page-id"), searchParams.get("type"))
          );
        }
      } catch (error) {
        errorMessage("خطای ناشناخته ای رخ داده مجددا امتحان فرمایید.", "dark");
      } finally {
        dispatch(loading(false));
      }
    }
  };

  const handlePageChange = (pageNum) => {
    dispatch(getAllPages(pageNum));
  };

  let showComponent = (
    <PagesTable
      pages={filteredPages}
      searchParams={searchParams}
      location={location}
      open={openModal}
      category={categoryOptions}
    />
  );
  if (queryParams) {
    showComponent = <PluginPage plugin={plugin} />;
  }

  return (
    <div className="post-page">
      <PageInfo title="مدیریت صفحات " />
      <adminPageContext.Provider
        value={{
          categoryOptions,
          pageData,
          postBody,
          setPageData,
          setPostBody,
          handleOnChange,
          validator,
          handleAddTagToList,
          handleRemoveTagInList,
          handleSubmit,
          plugin,
          pluginItem,
          handleActivePlugin,
          commentData,
          setCommentData,
          handleSubmitComment,
          handleChangeCommentStatus,
          handleDeletePluginItem,
          openModal,
        }}
      >
        <PageHeader {...headerOption}>
          <div className="table-body position-relative">{showComponent}</div>
          {!queryParams ? (
            <div
              className={
                pagesList.total > 4
                  ? "table-footer paginate"
                  : "table-footer paginate-hide py-4"
              }
            >
              <Pagination
                pagesList={pagesList}
                handlePageChange={handlePageChange}
              />
            </div>
          ) : null}
        </PageHeader>
        <CreateAndEditModal
          show={modalStatus.createAndEdit}
          close={closeModal}
          componentInfo={currentComponent}
        />
        <DeleteModal
          show={modalStatus.delete}
          close={closeModal}
          componentInfo={currentComponent}
          handleDelete={handleDelete}
        />
        <DropZoneModal
          show={modalStatus.dropzone}
          close={closeModal}
          pageId={searchParams.get("page-id")}
        />
      </adminPageContext.Provider>
    </div>
  );
};

export default Pages;
