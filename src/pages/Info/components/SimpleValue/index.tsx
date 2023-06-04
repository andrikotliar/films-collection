import { FC } from "react";

type ValueProps = {
  property: string;
  value: any;
};

const SimpleValue: FC<ValueProps> = ({ property, value }) => {
  return (
    <div className="schema-block__data">
      <span className="schema-block__label">{property}:</span>
      <span className={typeof value}>{JSON.stringify(value)}</span>,
    </div>
  )
}

export default SimpleValue;