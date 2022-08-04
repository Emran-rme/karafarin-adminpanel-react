import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { InfoBox, LineChart } from "../components";

const MainPage = () => {
  const [infoBox, setInfoBox] = useState([
    {
      color: "blue",
      title: "صفحات",
      name: "آرشیو صفحات",
      href: "./pages",
      icon: "mdi-image-album",
    },
    {
      color: "red",
      title: "دسته بندی",
      name: " آرشیو دسته بندی",
      href: "./categories",
      icon: "mdi-format-list-checks",
    },
    {
      color: "green",
      title: "کاربران",
      name: " کاربران",
      href: "./",
      icon: "mdi-account-multiple",
    },
    {
      color: "yellow",
      title: "تعداد بازدید",
      name: " کاربران",
      href: "./",
      icon: "mdi-eye",
    },
  ]);

  const { categories, pages, visitor, counttotal, countip } = useSelector(
    (state) => state.adminMain
  );
  useEffect(() => {
    setInfoBox([
      { ...infoBox[0], counter: pages },
      { ...infoBox[1], counter: categories },
      { ...infoBox[2], counter: "0" },
      { ...infoBox[3], counter: counttotal, counterTwo: countip },
    ]);
  }, [categories, pages, visitor]);

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 mt-4">
          <div className="row">
            {infoBox.map((item, index) => (
              <InfoBox
                key={index}
                color={item.color}
                counter={item.counter}
                counterTwo={item.counterTwo}
                title={item.title}
                name={item.name}
                href={item.href}
                icon={item.icon}
              />
            ))}
          </div>
        </div>
        <div className="col-12 my-4 border-top"></div>

        <div className="col-10 me-auto ms-auto">
          <LineChart data={visitor} />
        </div>
      </div>
    </div>
  );
};

export default MainPage;
