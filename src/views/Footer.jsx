import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  PageInfo,
  ServicesLink,
  Link,
  AboutUs,
  PhoneAndEmail,
  SocialMedia,
  FooterForm,
} from "../components";

import { adminFooterContext } from "../services/context/adminFooterContext";
import {
  initFooterData,
  setFooterData,
} from "../services/redux/actions/footer";
import { footerOptions } from "../utils/helpers/helpers";

const Footer = () => {
  const [componentName, setComponentName] = useState({});
  const [inputData, setInputData] = useState({});

  const dispatch = useDispatch();
  const data = useSelector((state) => state.footer);

  useEffect(() => {
    dispatch(initFooterData());
  }, []);

  const handleShow = (form) => {
    switch (form) {
      case "sevicesLink":
        setComponentName({ component: <ServicesLink />, case: "sevicesLink" });
        break;
      case "link":
        setComponentName({ component: <Link />, case: "link" });
        break;
      case "aboutUs":
        setComponentName({ component: <AboutUs />, case: "aboutUs" });
        break;
      case "phoneAndEmail":
        setComponentName({
          component: <PhoneAndEmail />,
          case: "phoneAndEmail",
        });
        break;
      case "socialMedia":
        setComponentName({ component: <SocialMedia />, case: "socialMedia" });
        break;
      default:
        return;
    }

    if (typeof data.servicesLink === "string") {
      return setInputData({
        ...data,
        servicesLink: JSON.parse(data.servicesLink),
        link: JSON.parse(data.link),
      });
    }
  };

  const addFormInput = (name) => {
    if (name === "ServicesLink") {
      setInputData({
        ...inputData,
        servicesLink: [
          ...inputData.servicesLink,
          { linkName: "", linkHref: "" },
        ],
      });
    } else {
      setInputData({
        ...inputData,
        link: [...inputData.link, { name: "", href: "" }],
      });
    }
  };
  const removeFormInput = (i, name) => {
    if (name === "ServicesLink") {
      const newInputData = { ...inputData };
      newInputData.servicesLink?.splice(i, 1);
      setInputData(newInputData);
    } else {
      const newInputData = { ...inputData };
      newInputData.link?.splice(i, 1);
      setInputData(newInputData);
    }
  };
  const handleOnChange = (e, index = null, name = null) => {
    if (name === "ServicesLink") {
      const newInputData = { ...inputData };
      newInputData.servicesLink[index][e.target.name] = e.target.value;
      setInputData({ ...inputData, servicesLink: newInputData.servicesLink });
    } else if (name === "Link") {
      const newInputData = { ...inputData };
      newInputData.link[index][e.target.name] = e.target.value;
      setInputData({ ...inputData, link: newInputData.link });
    } else {
      setInputData({ ...inputData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setFooterData(JSON.stringify(inputData)));
  };

  return (
    <div className="footer-page">
      <PageInfo title="مدیریت فوتر" />
      <div className="row">
        <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12 d-flex flex-column border-start">
          {footerOptions.map((item) => (
            <button
              key={item.itemId}
              className={`btn btn-sm ${
                item.formName == componentName.case
                  ? "btn-primary"
                  : "btn-outline-primary"
              } my-2 `}
              onClick={() => handleShow(item.formName)}
            >
              {item.title}
            </button>
          ))}
        </div>
        <div className="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12">
          <adminFooterContext.Provider
            value={{
              inputData,
              addFormInput,
              removeFormInput,
              handleOnChange,
            }}
          >
            <FooterForm componentName={componentName} submit={handleSubmit} />
          </adminFooterContext.Provider>
        </div>
      </div>
    </div>
  );
};

export default Footer;
