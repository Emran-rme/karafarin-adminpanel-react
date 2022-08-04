import { range } from "lodash";
import { useContext, useEffect, useState } from "react";
import { adminPageContext } from "../../../services/context/adminPageContext";
import { translateEnglishNumberToPersian } from "../../../utils/helpers/helpers";
import { PluginHeader } from "../../../components";

const Score = () => {
  const { plugin, pluginItem, handleActivePlugin } =
    useContext(adminPageContext);
  const [scoreStatus, setScoreStatus] = useState(false);

  useEffect(() => {
    setScoreStatus(plugin.module_status);
    return () => setScoreStatus(false);
  }, [plugin]);
  return (
    <div className="p-2">
      <PluginHeader
        status={scoreStatus}
        pluginTitle="امتیاز دهی ستاره ای"
        pluginName="Score"
        onChangeStatus={setScoreStatus}
        handleActivePlugin={handleActivePlugin}
      />
      {scoreStatus ? (
        <div className="d-flex justify-content-between align-items-center mt-4">
          <div>
            <span>امتیاز این صفحه : </span>
            <span className="fw-bold fs-5">
              {pluginItem.avg !== 0
                ? translateEnglishNumberToPersian(
                    parseFloat(pluginItem.avg).toFixed(2)
                  )
                : translateEnglishNumberToPersian(3)}{" "}
              از ۵
            </span>
          </div>
          <div dir="ltr">
            {pluginItem.avg !== 0 ? (
              range(0, 5).map((item, i) => (
                <span
                  key={i}
                  className={`mdi ${
                    pluginItem.avg > item
                      ? "mdi-star -intro-x"
                      : pluginItem.avg > item
                      ? "mdi-star-half-full -intro-x"
                      : "mdi-star-outline -intro-x"
                  } mdi-36px text-warning`}
                />
              ))
            ) : (
              <>
                <span className="mdi mdi-star -intro-x mdi-36px text-warning" />
                <span className="mdi mdi-star -intro-x mdi-36px text-warning" />
                <span className="mdi mdi-star -intro-x mdi-36px text-warning" />
                <span className="mdi mdi-star-outline -intro-x mdi-36px text-warning" />
                <span className="mdi mdi-star-outline -intro-x mdi-36px text-warning" />
              </>
            )}
          </div>
        </div>
      ) : (
        <h4 className="fw-bold fs-5 text-center">
          پلاگین امتیاز غیر فعال می باشد
        </h4>
      )}
    </div>
  );
};

export default Score;
