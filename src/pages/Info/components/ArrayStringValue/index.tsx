import { FC } from "react";

type ArrayStringValueProps = {
  label: string;
  value: string[];
}

const ArrayStringValue: FC<ArrayStringValueProps> = ({
  label,
  value
}) => {
  return (
    <div className="schema-block__array">
      <div className="schema-block__array-start-line">
        <span className="schema-block__array-label">{label}:</span>
        <span className="schema-block__array-bracket">&#91;</span>
      </div>
      <div className="schema-block__array-values">
        {value.map((str, idx) => (
          <div key={str + idx}>{str},</div>
        ))}
      </div>
      <div><span className="schema-block__array-bracket">&#93;</span>,</div>
    </div>
  );
};

export default ArrayStringValue;