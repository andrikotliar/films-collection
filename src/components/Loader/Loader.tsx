import './loader.css';
import { LoaderIcon } from "@/assets/icons";

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="loader">
        <LoaderIcon color="#006db7" />
      </div>
    </div>
  );
};

export { Loader };