import { useContext, useEffect, useState } from "react";
import { adminPageContext } from "../../../services/context/adminPageContext";
import { isEmpty } from "lodash";
import { translateEnglishNumberToPersian } from "../../../utils/helpers/helpers";
import { PluginHeader } from "../../../components";

const Comment = () => {
  const {
    plugin,
    pluginItem,
    handleActivePlugin,
    commentData,
    setCommentData,

    handleSubmitComment,
    handleChangeCommentStatus,
    handleDeletePluginItem,
  } = useContext(adminPageContext);

  const [commentStatus, setCommentStatus] = useState(false);
  const [showCommentContent, setShowCommentContent] = useState({
    isActive: false,
    id: null,
  });
  useEffect(() => {
    setCommentStatus(plugin.module_status);
    return () => {
      setCommentStatus(false);
      setCommentData({ replayText: "", activeReply: false, id: "" });
      setShowCommentContent({
        isActive: false,
        id: null,
      });
    };
  }, [plugin]);

  return (
    <div className="p-2">
      <PluginHeader
        status={commentStatus}
        pluginTitle="نظردهی"
        pluginName="Comments"
        onChangeStatus={setCommentStatus}
        handleActivePlugin={handleActivePlugin}
      />
      <div className="py-3 px-4 comment-scrolling">
        {commentStatus ? (
          !isEmpty(pluginItem) ? (
            pluginItem.map((comment, index) => (
              <div key={comment.id} className="comment-box">
                <div
                  className={`comment-box__top ${
                    showCommentContent.isActive &&
                    comment.id === showCommentContent.id &&
                    "comment-box__top--border"
                  }`}
                >
                  <span className="comment-box__number">
                    {translateEnglishNumberToPersian(index + 1)}
                  </span>
                  <span className="comment-box__title">
                    {comment.comment_title}
                  </span>
                  <span>
                    {translateEnglishNumberToPersian(
                      new Date(comment.created_at).toLocaleDateString("fa-IR")
                    )}
                  </span>
                  {comment.comment_status ? (
                    <span className="comment-icon confirmed">
                      <span className="mdi mdi-comment-check-outline ms-2" />
                      <span> تایید شده</span>
                    </span>
                  ) : (
                    <span
                      className="comment-icon"
                      onClick={() => handleChangeCommentStatus(comment.id)}
                    >
                      <span className="mdi mdi-comment-alert ms-2" />
                      <span>در انتظار تایید</span>
                    </span>
                  )}
                  <span
                    className="mdi mdi-trash-can-outline mdi-18px btn py-0 px-2 btn-outline-danger btn-sm"
                    onClick={() =>
                      handleDeletePluginItem("comment", comment.id)
                    }
                  />

                  <button
                    className="btn btn-sm border-end"
                    onClick={() =>
                      setShowCommentContent({
                        isActive: !showCommentContent.isActive,
                        id: comment.id,
                      })
                    }
                  >
                    <span className="mdi mdi-chevron-left mdi-24px" />
                  </button>
                </div>
                <div
                  className={`comment-box__content -intro-y ${
                    showCommentContent.isActive &&
                    comment.id === showCommentContent.id &&
                    "showCommentContent"
                  }`}
                >
                  <div>
                    <div>
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <span>
                          کاربر{" "}
                          {translateEnglishNumberToPersian(comment.user_ip)} :
                        </span>
                        <button
                          className={
                            comment.reply
                              ? "d-none"
                              : "border d-flex border-info px-2 py-0 rounded text-primary align-items-center"
                          }
                          disabled={comment.reply}
                          onClick={() =>
                            setCommentData({
                              ...commentData,
                              activeReply: !commentData.activeReply,
                              id: comment.id,
                            })
                          }
                        >
                          <span>پاسخ</span>
                          <span className="mdi mdi-reply mdi-24px" />
                        </button>
                      </div>
                      <span className="me-3 ">{comment.comment_body}</span>
                      {!isEmpty(comment.reply) ? (
                        <div className="p-3 mt-3">
                          <span className="alert alert-light d-block  ">
                            <span className="d-block border-bottom">
                              پاسخ شما :
                            </span>
                            <span className="d-block me-2 mt-3">
                              {" "}
                              {comment.reply}
                            </span>
                          </span>
                        </div>
                      ) : (
                        commentData.activeReply &&
                        comment.id === commentData.id && (
                          <form
                            className="px-4"
                            onSubmit={(event) =>
                              handleSubmitComment(event, comment.id)
                            }
                          >
                            <textarea
                              className="form-control my-3"
                              rows="4"
                              value={commentData.replayText || ""}
                              onChange={(event) =>
                                setCommentData({
                                  ...commentData,
                                  replayText: event.target.value,
                                })
                              }
                            />
                            <button className="btn btn-success btn-sm px-4">
                              <span className="mdi mdi-check ms-2" />
                              <span>ارسال</span>
                            </button>
                          </form>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <h4 className="fw-bold fs-5 text-center">
              نظری برای این پست ثبت نشده است
            </h4>
          )
        ) : (
          <h4 className="fw-bold fs-5 text-center">
            پلاگین نظر غیر فعال می باشد
          </h4>
        )}
      </div>
    </div>
  );
};

export default Comment;
