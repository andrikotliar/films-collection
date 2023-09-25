import './filter-checkbox.css';
import { FC } from "react";
import { Checkmark } from "@/assets/icons";
import { useFormContext } from "react-hook-form";

type FilterCheckboxProps = {
  type: 'checkbox' | 'radio';
  option: string | number;
  property: string;
}

const FilterCheckbox: FC<FilterCheckboxProps> = ({
  type="checkbox",
  option,
  property
}) => {
  const { register } = useFormContext();

  return (
    <label className="filter-checkbox">
      <input
        type={type}
        className="filter-checkbox__input"
        value={option}
        {...register(property)}
        name={property}
      />
      <div className="filter-checkbox__icon">
        <Checkmark />
      </div>
      <div className="filter-checkbox__label">
        {option}
      </div>
    </label>
  );
};

export { FilterCheckbox };