import './styles.css';
import { FC } from "react";
import ExampleValue from "@/pages/Info/components/ExampleValue";

type PropertyContentProps = {
  property: string;
  description: string;
  posibleValues?: string[];
  valueExample?: string | string[];
};

const PropertyContent: FC<PropertyContentProps> = ({
  property,
  description,
  posibleValues,
  valueExample
}) => {
  return (
    <div className="property-content">
      <p className="property-content__description">
        <b>Description:</b> {description}
      </p>
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