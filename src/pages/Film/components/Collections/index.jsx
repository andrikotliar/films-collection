import './styles.css';
import { collectionsConfig } from '@/configs';
import Collection from '@/components/Collection';

const Collections = ({ filmCollections }) => {
  return (
    <div className="collections-list">
      {filmCollections.map(collection => (
        <Collection
          poster={collectionsConfig[collection.name]}
          title={collection.name}
          key={collection.name}
        />
      ))}
    </div>
  );
};

export default Collections;