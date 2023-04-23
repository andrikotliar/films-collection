import { Modal } from '@/components';
import { CloseIcon } from '@/assets/icons';
import './styles.css';

const TrailerModal = ({ showTrailer, closeTrailerModal, trailer }) => {
  return (
    <Modal showModal={showTrailer} closeModal={closeTrailerModal}>
      <div className="trailer-container">
        <iframe
          src={`https://www.youtube.com/embed/${trailer}?rel=0&showinfo=0&autoplay=1`}
          allowFullScreen
          allow="autoplay"
          className="trailer-video"
        />
        <button className="trailer-close" onClick={closeTrailerModal}>
          <CloseIcon />
        </button>
      </div>
    </Modal>
  );
};

export default TrailerModal;