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
  isRequired: boolean;
  isRequiredPartially?: boolean;
};

const PropertyHeader: FC<PropertyHeaderProps> = ({
  title,
  types,
  onClick,
  isExpanded,
  isRequired,
  isRequiredPartially
}) => {
  return (
    <button className={classNames('property-header', {
      'property-header--expanded': isExpanded
    })} onClick={onClick}>
      <span className="property-header__title">
        <span>{title}</span>
        {isRequired && (
          <span className="required">*</span>
        )}
        {isRequiredPartially && (
          <span className="required-partialy">*</span>
        )}
      </span>
      <div className="property-header__right">
        <div className="property-header__types property-types">
          {types.map((type, idx) => (
            <span className={type} key={type + idx}>
              {type}
            </span>
          ))}
        </div>
        <span className="property-header__expander">
          <ExpandIcon />
        </span>
      </div>
    </button>
  );
};

export default PropertyHeader;