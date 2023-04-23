import './styles.css'

const Poster = ({ poster, title }) => {
  return (
    <div className="film__poster">
      <img src={`/posters/${poster}.webp`} alt={title} />
    </div>
  );
};

export default Poster;