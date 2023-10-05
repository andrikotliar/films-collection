import { ExpandIcon } from "@/assets/icons";
import "./season-selector.css";
import { ChangeEvent, FC } from 'react';
import classNames from "classnames";

type SeasonSelectorProps = {
  options: { title?: string }[];
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
};

const SeasonSelector: FC<SeasonSelectorProps> = ({
  options,
  onChange,
}) => {
  return (
    <div className={classNames('season-selector-wrapper')}>
      <select
        onChange={onChange}
        className="season-selector"
      >
        {options.map((option, index) => (
          <option value={index} key={index}>
            {option.title}
          </option>
        ))}
      </select>
      <ExpandIcon color="#006db7" className="season-selector-arrow" />
    </div>
  );
};

export { SeasonSelector };