import { LoaderIcon } from "@/assets/icons";
import './styles.css';
import { FC } from "react";
import classNames from "classnames";

const Loader: FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={classNames(className, 'loader-container')}>
      <div className="loader">
        <LoaderIcon color="#006db7" />
      </div>
    </div>
  );
};

export default Loader;