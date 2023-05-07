import { useEffect } from "react";
import { createPortal } from "react-dom";
import classNames from "classnames";
import './styles.css';

const Modal = ({ showModal, children, closeModal, contentClassName }) => {
  const closeModalWithEsc = (event) => {
    if(event.key === 'Escape') {
      closeModal();
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', closeModalWithEsc);

    return () => {
      document.removeEventListener('keydown', closeModalWithEsc);
    }
  }, []);

  if(!showModal) return null;
  
  return createPortal(
    <div className="modal">
      <div className="modal__overlay" onClick={closeModal} />
      <div className={classNames("modal__content", contentClassName)}>{children}</div>
    </div>,
    document.getElementById('modal'),
  );
};

export default Modal;