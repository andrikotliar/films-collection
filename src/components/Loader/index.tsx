import { LoaderIcon } from "@/assets/icons";
import './styles.css';

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="loader">
        <LoaderIcon />
      </div>
    </div>
  );
};

export default Loader;