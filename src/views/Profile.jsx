import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SimpleReactValidator from "simple-react-validator";
import { changePass, setUserInfo } from "../services/redux/actions/user";
import { PageInfo, AccountForm, ChangePassForm } from "../components";

const Profile = () => {
  const [chosen, setChosen] = useState(null);
  const [inActive, setInActive] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLatsName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [confirm_password, setConfirm_password] = useState("");
  const [, forceUpdate] = useState();

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const validator = useRef(
    new SimpleReactValidator({
      messages: {
        required: "پر کردن این فیلد الزامی می باشد",
      },
      element: (message) => <div className="error-icon" />,
    })
  );

  const handleInActive = () => setInActive(true);

  const handleSubmit = (event, chosenComponent) => {
    event.preventDefault();
    if (chosenComponent === "manage-acc") {
      if (validator.current.allValid()) {
        const user = {
          _method: "put",
          firstName,
          lastName,
          password,
        };
        dispatch(setUserInfo(user));
        setPassword("");
      } else {
        validator.current.showMessages();
        forceUpdate(1);
      }
    } else if (chosenComponent === "manage-pass") {
      if (validator.current.allValid()) {
        const userPassword = {
          _method: "put",
          password,
          oldPassword,
          password_confirmation: confirm_password,
        };
        dispatch(changePass(userPassword, handleInActive));
        setPassword("");
        setOldPassword("");
        setConfirm_password("");
      } else {
        validator.current.showMessages();
        forceUpdate(1);
      }
    }
  };

  let component = null;
  switch (chosen) {
    case "manage-acc":
      component = (
        <AccountForm
          user={user}
          firstName={firstName}
          setFirstName={setFirstName}
          lastName={lastName}
          setLatsName={setLatsName}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          handleSubmit={handleSubmit}
          validator={validator}
        />
      );
      break;
    case "manage-pass":
      component = (
        <ChangePassForm
          password={password}
          setPassword={setPassword}
          oldPassword={oldPassword}
          setOldPassword={setOldPassword}
          confirm_password={confirm_password}
          setConfirm_password={setConfirm_password}
          handleSubmit={handleSubmit}
          validator={validator}
          inActive={inActive}
        />
      );
      break;
    default:
      component = null;
      break;
  }

  return (
    <div className="admin-profile-page">
      <PageInfo title="حساب کاربری" />

      <div className="row mt-2">
        <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12">
          <div
            className={`account-item-box ${
              chosen === "manage-acc" && "active"
            } `}
            onClick={() => setChosen("manage-acc")}
          >
            <span>مدیریت حساب کاربری</span>
          </div>
        </div>
        <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12">
          <div
            className={`account-item-box ${
              chosen === "session-acc" && "active"
            } `}
            onClick={() => setChosen("session-acc")}
          >
            <span>مدیریت نشست ها</span>
          </div>
        </div>
        <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12">
          <div
            className={`account-item-box ${
              chosen === "manage-pass" && "active"
            } `}
            onClick={() => setChosen("manage-pass")}
          >
            <span>تغییر گذرواژه</span>
          </div>
        </div>
        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12  mt-4">
          <div className="border-top">{component}</div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
