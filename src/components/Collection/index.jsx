import './styles.css';
import { Link } from 'react-router-dom';
import { buildLink } from '@/heplers';

const Collection = ({ poster, title }) => {
  const buildCollectionPoster = (poster) => {
    const collectionPoster = `/posters/${poster}.webp`;
    return collectionPoster;
  }

  return (
    <Link to={buildLink('collections', title)} className="collection">
      <div className="collection__poster-container">
        <div className="collection__poster">
          <img src={buildCollectionPoster(poster)} alt="Collection poster" />
        </div>
      </div>
      <h3 className="collection__title">
        {title}
      </h3>
    </Link>
  );
};

export default Collection;