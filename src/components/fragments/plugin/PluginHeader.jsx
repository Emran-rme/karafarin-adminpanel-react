const PluginHeader = ({
  status,
  pluginName,
  pluginTitle,
  onChangeStatus,
  handleActivePlugin,
}) => {
  return (
    <div className={`alert ${status ? "alert-primary" : "alert-danger"} p-2`}>
      <div className="form-check form-switch">
        <label htmlFor="commentStatus" className="form-check-label">
          <span>
            پلاگین {pluginTitle}{" "}
            {status ? <strong>فعال </strong> : <strong>غیر فعال </strong>}
            است
          </span>
        </label>
        <input
          type="checkbox"
          name=""
          id="commentStatus"
          className="form-check-input "
          checked={status}
          value={status}
          onChange={(e) => {
            onChangeStatus(e.currentTarget.checked);
            handleActivePlugin(pluginName, !status);
          }}
        />
      </div>
    </div>
  );
};

export default PluginHeader;
