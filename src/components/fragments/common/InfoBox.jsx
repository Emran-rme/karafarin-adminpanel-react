import { Link } from "react-router-dom";
import { translateEnglishNumberToPersian } from "../../../utils/helpers/helpers";

const InfoBox = ({
  color,
  title,
  counter,
  counterTwo = null,
  name,
  href,
  icon,
}) => {
  return (
    <div className="col-3 p-2 ">
      <div className="main-page__box">
        <span className={`right-icon ${color}`} />
        <div className="d-flex flex-column justify-content-between align-items-center">
          <span className={`mdi ${icon} mdi-36px ${color}`} />
          <div className="d-flex flex-column align-items-center">
            <b> {title} :</b>
            {counterTwo ? (
              <div>
                <div className="d-flex align-items-center my-2 justify-content-between">
                  <span className="dataset-circle dataset-blue  ms-1"></span>
                  <span> کل:</span>
                  <span className="me-3 ">
                    {translateEnglishNumberToPersian(counter)}
                  </span>
                </div>
                <div className="d-flex align-items-center justify-content-between">
                  <span className="dataset-circle dataset-red ms-1"></span>
                  <span> یکتا:</span>
                  <span className="me-3 ">
                    {translateEnglishNumberToPersian(counterTwo)}
                  </span>
                </div>
              </div>
            ) : (
              <>
                <span className="font-style">
                  {counter && translateEnglishNumberToPersian(counter)}
                </span>
                <div className="border-top text-center">
                  <Link to={href}>
                    <span>{name}</span>
                    <span className="mdi mdi-chevron-double-left" />
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoBox;
