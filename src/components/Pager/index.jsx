import { useFilmsContext } from "@/context/filmsContext";
import classNames from "classnames";
import './styles.css';

const Pager = () => {
  const {
    getCurrentPage,
    filmsCount,
    setPage
  } = useFilmsContext();

  const pagesList = (filmsCount) => {
    const pageNumbers = [];
    const pagesCount = filmsCount / 24;

    for(let i = 0; i <= pagesCount; i++) {
      pageNumbers.push(i + 1);
    }

    return pageNumbers;
  }

  return (
    <div className="pager">
      {pagesList(filmsCount).map((pageNumber) => (
        <button
          className={classNames(
            'page-button',
            {
              'page-button--active': pageNumber === getCurrentPage()
            }
          )}
          key={pageNumber}
          onClick={() => setPage(pageNumber)}
        >
          {pageNumber}
        </button>
      ))}
    </div>
  );
};

export default Pager;