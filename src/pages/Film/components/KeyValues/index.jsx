import { buildLink } from '@/heplers';
import { Link } from 'react-router-dom';
import './styles.css';

const KeyValues = ({
  title,
  values,
  linkParameter,
  singleValueClassName = "key-values-single",
}) => {
  return (
    <div className="key-values">
      <h3 className="key-values-title">
        {title}
      </h3>
      <div className="key-values-list">
        {Array.isArray(values) ? values.map((value) => (
          <p className={singleValueClassName} key={value}>
            {linkParameter ? (
              <Link to={buildLink(linkParameter, value)}>
                {value}
              </Link>
            ) : (
              <span>{value}</span>
            )}
          </p>
        )) : (
          <p className={singleValueClassName}>{values}</p>
        )}
      </div>
    </div>
  );
};

export default KeyValues;