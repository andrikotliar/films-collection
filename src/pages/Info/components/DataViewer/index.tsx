import './styles.css';
import { FC } from "react";
import DetailsProperty from "@/pages/Info/components/DetailsProperty";
import { DataExplanation } from "@/pages/Info/types";

const DataViewer: FC<{ data: DataExplanation[] }> = ({
  data
}) => {
  return (
    <div className="data-viewer">
      <div className="data-viewer__legend">
        <p><span className="required">*</span> — property is required</p>
        <p><span className="required-partialy">*</span> — this property is required in some cases, read description</p>
      </div>
      <div className="data-viewer__wrapper">
        {data.map((item) => (
          <DetailsProperty details={item} key={item.property} />
        ))}
      </div>
    </div>
  );
};

export default DataViewer;