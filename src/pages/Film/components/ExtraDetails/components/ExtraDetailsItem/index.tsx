import './styles.css';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { buildLink } from '@/heplers';

type ExtraDetailsItemProps = {
  title: string;
  values: string[];
  linkParameter: string;
}

const ExtraDetailsItem: FC<ExtraDetailsItemProps> = ({
  title,
  values,
  linkParameter,
}) => {
  return (
    <div className="extra-details-item">
      <h3 className="extra-details-item__title">
        {title}
      </h3>
      <div className="extra-details-item__list">
        {values.map((value) => (
          <Link to={buildLink(linkParameter, value)} key={value}>
            {value}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ExtraDetailsItem;