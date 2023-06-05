import './styles.css';
import { FC } from "react";
import { DataTypes } from "@/pages/Info/types";
import { ExpandIcon } from '@/assets/icons';
import classNames from 'classnames';

type PropertyHeaderProps = {
  title: string;
  types: DataTypes[];
  onClick(): void;
  isExpanded: boolean;
}

const PropertyHeader: FC<PropertyHeaderProps> = ({
  title,
  types,
  onClick,
  isExpanded
}) => {
  return (
    <button className={classNames('property-header', {
      'property-header--expanded': isExpanded
    })} onClick={onClick}>
      <span className="property-header__title">
        {title}
      </span>
      <div className="property-header__types">
        {types.map((type, idx) => (
          <span className={type} key={type + idx}>
            {type}
          </span>
        ))}
      </div>
      <span className="property-header__expander">
        <ExpandIcon />
      </span>
    </button>
  );
};

export default PropertyHeader;