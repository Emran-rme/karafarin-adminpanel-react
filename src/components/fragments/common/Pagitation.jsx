import { translateEnglishNumberToPersian } from "../../../utils/helpers/helpers";

const Pagination = ({ pagesList, handlePageChange }) => {
  return (
    <>
      {pagesList.links?.map((item, index) => (
        <button
          className={`btn ${item.active && "btn-primary btn-paginate"}`}
          disabled={item.url === null || item.active}
          key={index}
          onClick={() => handlePageChange(item.url)}
        >
          {translateEnglishNumberToPersian(item.label)}
        </button>
      ))}
    </>
  );
};

export default Pagination;
