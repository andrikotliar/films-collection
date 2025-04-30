import { FC } from 'react';
import styles from './SearchResultPeopleList.module.css';
import { Person } from '@/types';
import { Image } from '@/ui/Image/Image';
import { images } from '@/assets/images';

type SearchResultPeopleListProps = {
  data: Person[];
  onCreate?: VoidFunction;
  onAdd: (person: Person) => void;
};

export const SearchResultPeopleList: FC<SearchResultPeopleListProps> = ({
  data,
  onCreate,
  onAdd,
}) => {
  const isCreateHandlerPresent = typeof onCreate === 'function';

  if (!data.length) {
    return (
      <div className={styles.noResultsWrapper}>
        <span>No search results.</span>
        {isCreateHandlerPresent && (
          <button onClick={onCreate} className={styles.createButton}>
            Create
          </button>
        )}
      </div>
    );
  }

  return (
    <div className={styles.listWrapper}>
      <div className={styles.list}>
        {data.map((person) => (
          <button
            key={person.id}
            className={styles.person}
            onClick={() => onAdd(person)}
          >
            <div className={styles.image}>
              <Image
                src={person.image}
                errorImageSrc={images.actorNotFound}
                isExternal
              />
            </div>
            <div className={styles.name}>{person.name}</div>
          </button>
        ))}
      </div>
      {isCreateHandlerPresent && (
        <button onClick={onCreate} className={styles.createButton}>
          Create
        </button>
      )}
    </div>
  );
};
