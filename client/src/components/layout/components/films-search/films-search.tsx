import { SearchMenuContent } from '../search-menu-content/search-menu-content';
import { searchFilmsQuery } from '@/queries';
import { Search } from '../../../search/search';

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
