import classNames from "classnames";
import { Link } from "react-router-dom";

const IconLink = ({ active, link, children, title }) => {
  return (
    <Link to={link} title={title} className={classNames('icon-button', {
      'icon-button--active': active
    })}>
      {children}
    </Link>
  );
};

export default IconLink;