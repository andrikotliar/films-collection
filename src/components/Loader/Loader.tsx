import './loader.css';
import { LoaderIcon } from "@/assets/icons";

const Loader = () => {
  return (
    <div className="loader-container">
      <LoaderIcon color="#006db7" className="loader" />
    </div>
  );
};

export { Loader };