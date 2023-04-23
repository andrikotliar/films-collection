import { Checkmark } from "@/assets/icons";
import { useFormContext } from "react-hook-form";
import './styles.css';

const FilterCheckbox = ({ type="checkbox", option, property }) => {
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

export default FilterCheckbox;