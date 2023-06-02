import { FC } from "react";

const Checkbox: FC<{
  className: string;
  title: string;
  value: string;
}> = ({ className, title, value }) => {
  return (
    <label className="admin__checkbox-wrapper">
      <input type="checkbox" className={className} value={value} />
      <span>{title}</span>
    </label>
  );
};

export default Checkbox;