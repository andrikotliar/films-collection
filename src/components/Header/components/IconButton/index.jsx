import './styles.css';
import classNames from "classnames";

const IconButton = ({
  active,
  onClick,
  title,
  className,
  children
}) => {
  return (
    <button
      className={classNames('icon-button', className, {
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