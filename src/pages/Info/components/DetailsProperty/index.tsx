import './styles.css';
import { FC, useState } from "react";
import PropertyContent from "@/pages/Info/components/PropertyContent";
import PropertyHeader from "@/pages/Info/components/PropertyHeader";
import { DataExplanation } from "@/pages/Info/types";
import classNames from 'classnames';

type DetailsPropertyProps = {
  details: DataExplanation;
};

const DetailsProperty: FC<DetailsPropertyProps> = ({ details }) => {
  const [openedDetails, setOpenedDetails] = useState(false);
  return (
    <div className="details-property">
      <PropertyHeader
        title={details.property}
        types={details.type}
        onClick={() => setOpenedDetails(!openedDetails)}
        isExpanded={openedDetails}
      />
      <div className={classNames('details-property__body', {
        'details-property__body--expanded': openedDetails
      })}>
        <PropertyContent
          property={details.property}
          description={details.description}
          posibleValues={details.possibleValues}
          valueExample={details.valueExample}
        />
        {details.properties && (
          <div className="details-property__nested">
            {details.properties.map((item) => (
              <DetailsProperty details={item} key={item.property} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailsProperty;