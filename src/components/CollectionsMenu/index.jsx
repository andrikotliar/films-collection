import { collectionsConfig } from '@/configs';
import './styles.css';
import Collection from '../Collection';

const CollectionsMenu = ({ isOpen }) => {
  if(!isOpen) return;

  return (
    <div className="collections-menu">
      <div className="collections-menu__container container">
        <div className="collections-list custom-scroll custom-scroll-visible">
          {Object.keys(collectionsConfig).map((collection) => (
            <Collection
              key={collection}
              title={collection}
              poster={collectionsConfig[collection]}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CollectionsMenu;