import './styles.css';
import classNames from "classnames";

const IconButton = ({
  active,
  onClick,
  title,
  children
}) => {
  return (
    <button
      className={classNames('icon-button', {
        'icon-button--active': active
      })}
      onClick={onClick}
      title={title}
    >
      {children}
    </button>
  );
};

export default IconButton;