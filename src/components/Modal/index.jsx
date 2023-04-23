import { createPortal } from "react-dom";
import './styles.css';

const Modal = ({ showModal, children, closeModal }) => {
  if(!showModal) return null;
  
  return createPortal(
    <div className="modal">
      <div className="modal__overlay" onClick={closeModal} />
      <div className="modal__content">{children}</div>
    </div>,
    document.getElementById('modal'),
  );
};

export default Modal;