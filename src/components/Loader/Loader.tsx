import classes from './Loader.module.css';
import { LoaderIcon } from "@/assets/icons";

const Loader = () => {
  return (
    <div className={classes.wrapper}>
      <LoaderIcon color="#006db7" className={classes.loader} />
    </div>
  );
};

export { Loader };