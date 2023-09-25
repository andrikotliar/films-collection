import './icon-link.css';
import { FC, ReactNode } from 'react';
import { Link } from 'react-router-dom';

type IconLinkProps = {
  path: string;
  icon: ReactNode;
};

const IconLink: FC<IconLinkProps> = ({
  path,
  icon,
}) => {
  return (
    <Link
      to={path}
      className="icon-link"
    >
      {icon}
    </Link>
  );
};

export { IconLink };