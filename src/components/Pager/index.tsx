import './styles.css';
import { useFilmsContext } from "@/context/filmsContext";
import classNames from "classnames";
import { filmsSettings } from "@/constants";

const Pager = () => {
  const {
    getCurrentPage,
    filmsCount,
    setPage
  } = useFilmsContext();

  if(filmsCount <= filmsSettings.perPage) {
    return null;
  }

  const pagesList = (filmsCount: number) => {
    const pageNumbers = [];
    const pagesCount = filmsCount / filmsSettings.perPage;

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