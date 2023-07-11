import './example-value.css';
import { FC } from "react";

type ExampleValueProps = {
  label: string;
  value: string;
}

const ExampleValue: FC<ExampleValueProps> = ({
  label,
  value,
}) => {
  return (
    <div className="property-example">
      <div className="property-example__label">
        <span>{label}</span>:
      </div>
      <div className="property-example__value">
        {value}
      </div>
    </div>
  );
};

export default ExampleValue;