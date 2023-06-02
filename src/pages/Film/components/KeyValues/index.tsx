import './styles.css';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { buildLink } from '@/heplers';

type KeyValuesProps = {
  title: string;
  values: string | string[];
  linkParameter?: string;
  singleValueClassName?: string;
}

const KeyValues: FC<KeyValuesProps> = ({
  title,
  values,
  linkParameter,
  singleValueClassName = "key-values-single",
}) => {
  return (
    <div className="key-values">
      <h3 className="key-values__title">
        {title}
      </h3>
      <div className="key-values__list">
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