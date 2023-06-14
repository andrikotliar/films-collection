import './styles.css';

const FilmListSkeleton = () => {
  return (
    <div className="films-list-skeleton">
      {Array.from({ length: 25 }, (_, idx) => (
        <div className="films-list-skeleton__item" key={idx} />
      ))}
    </div>
  );
};

export default FilmListSkeleton;