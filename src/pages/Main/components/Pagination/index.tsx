import './styles.css';
import { useFilmsContext } from "@/context/FilmsContext";
import { Button } from '@/components';
import { getPagination } from '@/pages/Main/components/Pagination/helpers';

const pagesDevider = '...';

const Pagination = () => {
  const {
    getCurrentPage,
    filmsCount,
    setPage
  } = useFilmsContext();

  const currentPage = getCurrentPage();

  return (
    <div className="pagination">
      {getPagination(currentPage, filmsCount).map((page, idx) => (
        <Button
          onClick={() => setPage(page)}
          key={page}
          design={page === currentPage ? 'primary' : 'empty'}
          isActive={page === currentPage}
        >
          {page}
        </Button>
      ))}
    </div>
  );
};

export default Pagination;