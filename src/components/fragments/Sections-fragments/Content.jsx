import Category from "./partials/Category";
import Description from "./partials/Description";
import Image from "./partials/Image";
import Title from "./partials/Title";
import ServiceItem from "./partials/ServiceItem";
import CustomerItem from "./partials/CustomerItem";

const Components = {
  CustomerItem,
  ServiceItem,
  Category,
  Description,
  Image,
  Title,
};

const Content = ({ item }) => {
  const DynamicallyComponent = Components[item];

  return <DynamicallyComponent />;
};

export default Content;
