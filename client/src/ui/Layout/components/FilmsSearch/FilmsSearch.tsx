import { SearchMenuContent } from '../SearchMenuContent/SearchMenuContent';
import { searchFilmsQuery } from '@/queries';
import { Search } from '../../../Search/Search';

export const FilmsSearch = () => {
  return (
    <Search
      query={searchFilmsQuery}
      theme="dark"
      placeholder="Search by title..."
    >
      {({ data, onFinishInteraction }) => (
        <SearchMenuContent
          films={data ?? []}
          onFilmOpen={onFinishInteraction}
        />
      )}
    </Search>
  );
};
