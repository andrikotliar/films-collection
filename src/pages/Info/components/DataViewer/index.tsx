import './styles.css';
import { FC } from "react";
import DetailsProperty from "@/pages/Info/components/DetailsProperty";
import { DataExplanation } from "@/pages/Info/types";

const DataViewer: FC<{ data: DataExplanation[] }> = ({
  data
}) => {
  return (
    <div className="data-viewer">
      {data.map((item) => (
        <DetailsProperty details={item} key={item.property} />
      ))}
    </div>
  );
};

export default DataViewer;