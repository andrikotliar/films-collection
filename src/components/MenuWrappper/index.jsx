import './styles.css';
import classNames from 'classnames';

const MenuWrapper = ({
  isOpen,
  isSubMenu,
  children
}) => {
  if(!isOpen) return;

  return (
    <div className={classNames('menu', {
      'menu--second-level': isSubMenu,
    })}>
      <div className="container">
        {children}
      </div>
    </div>
  );
};

export default MenuWrapper;