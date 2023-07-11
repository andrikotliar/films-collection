import './property-content.css';
import { FC } from "react";
import { ExampleValue } from "../ExampleValue";

type PropertyContentProps = {
  property: string;
  description: string;
  posibleValues?: string[];
  valueExample?: string | string[];
  arrayItemsType?: string[];
};

const PropertyContent: FC<PropertyContentProps> = ({
  property,
  description,
  posibleValues,
  valueExample,
  arrayItemsType,
}) => {
  return (
    <div className="property-content">
      <p className="property-content__description">
        <b>Description:</b> {description}
      </p>
      {arrayItemsType && (
        <div className="property-content__possible-values">
          <b className="property-content__possible-values-title">
            Array items type:
          </b>
          <div className="property-content__possible-values-list property-types">
            {arrayItemsType.map((type) => (
              <span className={type} key={type}>
                {type}
              </span>
            ))}
          </div>
        </div>
      )}
      {posibleValues && (
        <div className="property-content__possible-values">
          <b className="property-content__possible-values-title">
            Possible values:
          </b>
          <div className="property-content__possible-values-list">
            {posibleValues.map((value) => (
              <span className="property-content__item" key={value}>
                {value}
              </span>
            ))}
          </div>
        </div>
      )}
      {valueExample && (
        <div className="property-content__examples">
          <b>Examples:</b>
          <div className="property-content__examples-wrapper">
            {Array.isArray(valueExample) ? valueExample.map((value) => (
              <ExampleValue label={property} value={value} key={value} />
            )): (
              <ExampleValue label={property} value={valueExample} />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyContent;